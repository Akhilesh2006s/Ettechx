import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Et Tech X transformed how we approach educational technology. The connections made here led to partnerships that changed our institution.",
    name: "Dr. Priya Sharma",
    title: "Director of Innovation, IIT Delhi",
    type: "Speaker",
    gradient: "from-electric/20 to-electric/5",
    accentColor: "bg-electric",
    borderColor: "border-electric/30",
  },
  {
    id: 2,
    quote: "An incredible gathering of minds! The workshops were hands-on and immediately applicable. I left with actionable strategies for my classroom.",
    name: "Rajesh Kumar",
    title: "Senior Educator, DPS International",
    type: "Attendee",
    gradient: "from-coral/20 to-coral/5",
    accentColor: "bg-coral",
    borderColor: "border-coral/30",
  },
  {
    id: 3,
    quote: "The expo showcased cutting-edge solutions I hadn't seen anywhere else. Et Tech X is where the future of education becomes reality.",
    name: "Ananya Desai",
    title: "EdTech Entrepreneur",
    type: "Exhibitor",
    gradient: "from-teal/20 to-teal/5",
    accentColor: "bg-teal",
    borderColor: "border-teal/30",
  },
  {
    id: 4,
    quote: "Winning the Et Tech X Award validated our team's hard work and opened doors to investors and partners across India.",
    name: "Vikram Patel",
    title: "CEO, LearnSmart AI",
    type: "Award Winner",
    gradient: "from-gold/20 to-gold/5",
    accentColor: "bg-gold",
    borderColor: "border-gold/30",
  },
  {
    id: 5,
    quote: "The networking opportunities at Et Tech X are unparalleled. I connected with thought leaders who became mentors and collaborators.",
    name: "Dr. Meera Krishnan",
    title: "Professor, BITS Pilani",
    type: "Speaker",
    gradient: "from-electric/20 to-electric/5",
    accentColor: "bg-electric",
    borderColor: "border-electric/30",
  },
  {
    id: 6,
    quote: "Every session was packed with insights. The quality of speakers and content at Et Tech X sets a new standard for education conferences.",
    name: "Arjun Mehta",
    title: "Learning Designer, Byju's",
    type: "Attendee",
    gradient: "from-coral/20 to-coral/5",
    accentColor: "bg-coral",
    borderColor: "border-coral/30",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Voices from Our{" "}
            <span className="text-coral">Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from educators, innovators, and leaders who have experienced the transformative power of Et Tech X
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-gradient-to-br ${testimonial.gradient} rounded-2xl p-6 border ${testimonial.borderColor} hover:shadow-lg transition-all duration-300 group`}
            >
              {/* Quote Icon */}
              <div className={`absolute -top-3 -left-3 w-10 h-10 ${testimonial.accentColor} rounded-full flex items-center justify-center shadow-lg`}>
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Type Badge */}
              <div className="flex justify-end mb-4">
                <span className={`px-3 py-1 ${testimonial.accentColor}/20 text-foreground text-xs font-semibold rounded-full border ${testimonial.borderColor}`}>
                  {testimonial.type}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 text-base leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${testimonial.accentColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 right-0 w-24 h-24 ${testimonial.accentColor}/5 rounded-tl-full`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
