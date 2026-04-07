import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "We have been a part of ET TECH X since 2023 and have been participating since then. The 2025 edition of ET TECH X which was held at Hyderabad, was a fabulous show. The event was exceptionally well-organized and truly impactful. From the seamless coordination to the engaging sessions, every detail reflected professionalism and thoughtful planning. The speakers were insightful, the content was relevant, and the overall experience exceeded expectations. It was a great opportunity to learn, connect, and gain valuable perspectives. I would highly recommend this event to anyone looking for meaningful engagement and high-quality execution.",
    name: "Siddharth Bros",
    title: "Exhibitor",
    type: "Exhibitor",
    gradient: "from-teal/20 to-teal/5",
    accentColor: "bg-teal",
    borderColor: "border-teal/30",
  },
  {
    id: 2,
    quote: "I would like to pen down our heartfelt thanks to you and the entire ET Tech X team. This was our maiden event where we set up a stall—especially outside our home city, Bangalore. We had received mixed reviews about events in general, but we decided to experience it ourselves. I must acknowledge that we received excellent support at every stage—from choosing the right stall to networking opportunities, prime talk time, branding support, and, of course, quality leads. Most importantly, the event opened doors to an entirely new market for our recent launches, which was truly encouraging. Please do let me know once the layout for the next season is out. We would be keen to block our stall in advance. I have no hesitation in recommending ET Tech X for the next season and look forward to being part of it again.",
    name: "Ridhhii Gupta",
    title: "Founder, Utsaah",
    type: "Exhibitor",
    gradient: "from-coral/20 to-coral/5",
    accentColor: "bg-coral",
    borderColor: "border-coral/30",
  },
  {
    id: 3,
    quote: "STEMx has consistently participated in the Ettechx Summit by setting up an engaging stall every year, creating a strong platform to connect with new school owners and principals from across the education ecosystem. Each edition allows us to showcase innovative Robotics, AI, and STEM solutions while understanding the evolving needs of schools. Ettechx has become a valuable meeting ground for educators, innovators, and decision-makers, enabling meaningful conversations around future-ready education.",
    name: "Narasimha Naidu",
    title: "Founder, StemX",
    type: "Exhibitor",
    gradient: "from-electric/20 to-electric/5",
    accentColor: "bg-electric",
    borderColor: "border-electric/30",
  },
  {
    id: 4,
    quote: "The ET Tech X event was a well-organised and enriching program that brought together many professionals from the field. The day was packed with meaningful knowledge sharing, learning opportunities, insightful sessions, networking, inspiring awards, and well-curated educative stalls. The round table conference, in particular, was a valuable experience with highly enthusiastic ECCE aspirants. I thoroughly enjoyed being part of the event. Thank you for the opportunity, and I look forward to participating in more such impactful programs in the future.",
    name: "Dr. Sowmya ASL",
    title: "Educational Consultant and Teacher Trainer",
    type: "Speaker",
    gradient: "from-gold/20 to-gold/5",
    accentColor: "bg-gold",
    borderColor: "border-gold/30",
  },
  {
    id: 5,
    quote: "I participated in the ET TECH summit at Hyderabad, 2025, as a member of the round table discussion on Foundational stage education. We had a very invigorating discussion with many persons with very different backgrounds contributing to the discussion. A very satisfying report could be submitted. The eminent personalities who participated had very important submissions to make about foundational stage education. Wide range of sessions on storytelling techniques, importance of mental health, physical activities were presented. The exhibition with excellent, innovative teaching-learning material were very educative too. Overall, it was a very good experience. Wish them future success in their endeavours. Thank you for the invitation.",
    name: "Dr. K. Mayuri",
    title: "Former Professor and Emeritus Scientist, PJTSAU",
    type: "Speaker",
    gradient: "from-secondary/20 to-secondary/5",
    accentColor: "bg-secondary",
    borderColor: "border-secondary/30",
  },
  {
    id: 6,
    quote: "My Pan Indian experience in education industry rates this event as one that is meticulously but painstakingly planned to the minutest detail and unblemishingly but immaculately executed one to the supreme satisfaction of the stakeholders thus fulfilling the objectives of the exercise. The organizers, themselves being grassroot educationists, saw all segments in schooling are well represented and focused on developing solutions through meaningful deliberations to the industry problems. Participants from all corners of the country made it a national conclave. The flow of the sub activities of the main event was seamlessly integrated with deft handling by experienced coordinators. It, surely, was a participation one would always feel that 'the time spent productively'.",
    name: "Dr. Muralikrishna",
    title: "Executive Secretary, Chinmaya Vidyalayas Hyderabad",
    type: "Speaker",
    gradient: "from-primary/20 to-primary/5",
    accentColor: "bg-primary",
    borderColor: "border-primary/30",
  },
  {
    id: 7,
    quote: "Thank you Brainfeed for the fantastic ETTECHX2025. I thoroughly enjoyed being a part of all the brainstorming and stimulating conversations around education and beyond. The choice of speakers and the topics were integrating. I must commend Sri Brahmam for his tenacity and consistency. This event is slowly but surely growing into one of the most sought after events in the country covering the entire education sector. Congratulations to the team once again.",
    name: "Chandrashekhar D P",
    title: "CEO, JGI Schools",
    type: "Attendee",
    gradient: "from-accent/20 to-accent/5",
    accentColor: "bg-accent",
    borderColor: "border-accent/30",
  },
  {
    id: 8,
    quote: "Attending the 6th edition of ET TECH X 2025 at HITEX, Hyderabad was a truly enriching and inspiring experience. The conference offered a vibrant confluence of ideas, innovations, and conversations around the future of education and learning ecosystems. From insightful interactions every aspect of the event reflected a shared commitment to building learner-centric, future-ready systems. The keynote sessions, invited speeches, and panel discussions went beyond technology, focusing on learner engagement, teacher empowerment, inclusion, and the growing importance of emotional and psychological well-being in learning ecosystems. Listening to diverse voices from grassroots practitioners, educators to ed-tech leaders, made the conversations deeply grounded and meaningful. Appreciation to the ET TECH X team for curating a platform that enabled meaningful dialogue and forward-looking conversations in education.",
    name: "Dr. Chinu Aggrawal",
    title: "Director: Feeling Minds, President: ISMHAA",
    type: "Speaker",
    gradient: "from-teal/20 to-teal/5",
    accentColor: "bg-teal",
    borderColor: "border-teal/30",
  },
];

const TestimonialsSection = () => {
  // We create a cloned first and last slide so transitions can loop seamlessly
  const extendedTestimonials = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  const [activeIndex, setActiveIndex] = useState(1); // start from first real slide
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Minimum distance in pixels to trigger a swipe

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => Math.min(prev + 1, extendedTestimonials.length - 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // After each transition, if we're on a cloned slide, jump instantly to the real one
  const handleTransitionEnd = () => {
    // If we've moved to the first cloned slide (index 0), jump to the real last slide
    if (activeIndex === 0) {
      setIsTransitioning(false);
      setActiveIndex(testimonials.length);
      return;
    }

    // If we've moved to the last cloned slide (index extendedTestimonials.length - 1),
    // jump back to the real first slide
    if (activeIndex === extendedTestimonials.length - 1) {
      setIsTransitioning(false);
      setActiveIndex(1);
      return;
    }

    setIsTransitioning(false);
  };

  // Auto-play loop for testimonials
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => {
        // Avoid stacking updates while a transition is already in progress.
        if (isTransitioning) return prev;
        setIsTransitioning(true);
        return Math.min(prev + 1, extendedTestimonials.length - 1);
      });
    }, 8000); // change slide every 8 seconds

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isTransitioning, extendedTestimonials.length]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-muted/40 to-background" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-coral/10 text-coral rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 sm:mb-4 px-2">
            Voices from Our{" "}
            <span className="text-coral">Community</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Hear from educators, innovators, and leaders who have experienced the transformative power of Et Tech X
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div 
            className="overflow-visible touch-pan-y py-4 sm:py-6"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((testimonial, idx) => (
            <motion.div
              key={`${testimonial.id}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
              viewport={{ once: true }}
                  className="w-full shrink-0 px-3 sm:px-4 md:px-6"
                >
                  <div
                    className={`relative bg-gradient-to-br ${testimonial.gradient} rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border ${testimonial.borderColor} hover:shadow-lg transition-all duration-300 group flex flex-col overflow-visible`}
            >
              {/* Quote Icon */}
                    <div className={`absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 ${testimonial.accentColor} rounded-full flex items-center justify-center shadow-lg z-10`}>
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              {/* Type Badge */}
                    <div className="flex justify-end mb-4 sm:mb-5 pt-2">
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 ${testimonial.accentColor}/20 text-foreground text-[10px] sm:text-xs font-semibold rounded-full border ${testimonial.borderColor}`}>
                  {testimonial.type}
                </span>
              </div>

              {/* Quote */}
                    <blockquote className="text-foreground/90 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 italic flex-1">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-auto pt-4 border-t border-border/30">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${testimonial.accentColor} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0`}>
                        {testimonial.name.split(' ').map((n) => n[0]).join('')}
                </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>

              {/* Decorative Element */}
                    <div className={`absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 ${testimonial.accentColor}/5 rounded-tl-full pointer-events-none`} />
                  </div>
            </motion.div>
          ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={handlePrev}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm sm:text-base"
              aria-label="Previous testimonial"
            >
              Prev
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setActiveIndex(index + 1); // +1 because of leading clone
                  }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                    ((activeIndex - 1 + testimonials.length) % testimonials.length) === index
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm sm:text-base"
              aria-label="Next testimonial"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
