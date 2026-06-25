import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text:
        "👋 Hi there! Welcome to EduExpoGlobal! I'm your AI assistant.\n\n" +
        "You can ask me about:\n" +
        "• Exhibiting at EduExpoGlobal\n" +
        "• Visiting the expo as a visitor\n" +
        "• Attending as a delegate",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open after 3 seconds
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  // Auto-close after 8 seconds if no interaction
  useEffect(() => {
    if (isOpen && !hasInteracted) {
      const closeTimer = setTimeout(() => {
        setIsOpen(false);
      }, 8000);

      return () => clearTimeout(closeTimer);
    }
  }, [isOpen, hasInteracted]);

  // Simple rule-based responder for common EduExpoGlobal questions
  const getBotReply = (userInput: string): string => {
    const text = userInput.toLowerCase();

    const isGreeting = /\b(hi|hello|hey|namaste)\b/.test(text);
    const isExhibitor =
      text.includes("exhibit") ||
      text.includes("exhibitor") ||
      text.includes("stall") ||
      text.includes("booth") ||
      text.includes("sponsor");
    const isVisitor =
      text.includes("visitor") ||
      text.includes("visit") ||
      text.includes("ticket") ||
      text.includes("entry") ||
      text.includes("pass");
    const isDelegate =
      text.includes("delegate") ||
      text.includes("conference") ||
      text.includes("sessions") ||
      text.includes("summit");

    if (isExhibitor) {
      return (
        "Thank you for your interest in exhibiting at EduExpoGlobal! 🎉\n\n" +
        "We offer a variety of exhibition packages, including booth space and branding opportunities across the expo.\n\n" +
        "For detailed information on stall sizes, pricing, and sponsorship options, please contact:\n" +
        "• Sachin Gupta – Exhibition Coordinator\n" +
        "• Phone / WhatsApp: +91 8008845432\n\n" +
        "We’d love to have you showcase your solutions at EduExpoGlobal!"
      );
    }

    if (isVisitor) {
      return (
        "We’re thrilled that you’d like to visit EduExpoGlobal! 🙌\n\n" +
        "At EduExpoGlobal, you can explore the latest in educational technology, meet leading solution providers, and network with school leaders and industry professionals.\n\n" +
        "For visitor details, including registration, timings, and entry guidelines, please contact our Visitor Support Team at:\n" +
        "• Phone / WhatsApp: +91 9871676622\n\n" +
        "We look forward to welcoming you to the expo!"
      );
    }

    if (isDelegate) {
      return (
        "Great to hear you’re interested in attending EduExpoGlobal as a delegate! 🎓\n\n" +
        "Delegates get access to expert sessions, panel discussions, and special networking opportunities with education leaders.\n\n" +
        "For delegate registration and package details, please contact:\n" +
        "• Mr. Sachin Gupta – Delegate Coordinator\n" +
        "• Phone / WhatsApp: +91 8008845432\n\n" +
        "We look forward to your valuable participation!"
      );
    }

    if (isGreeting) {
      return (
        "👋 Hi! I can help with:\n\n" +
        "• Exhibitor inquiries (stalls, booths, sponsorships)\n" +
        "• Visitor information (entry, timings, registration)\n" +
        "• Delegate details (conference passes & sessions)\n\n" +
        "Just type whether you want to *exhibit*, *visit*, or join as a *delegate*."
      );
    }

    // Fallback: show quick contact numbers
    return (
      "Thanks for your message! Here are the quickest ways to reach the right team:\n\n" +
      "• Exhibitors & Delegates – Sachin Gupta: +91 8008845432\n" +
      "• Visitors & General Queries – Visitor Support: +91 9871676622\n\n" +
      "You can tell me whether your question is about *exhibiting*, *visiting*, or *delegates* and I’ll share the right details."
    );
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setHasInteracted(true);

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Small delay for nicer UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      const reply = getBotReply(userInput);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: reply,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Sorry, something went wrong. Please contact us by phone or WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.3 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-primary shadow-glow-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification Dot */}
      {!hasInteracted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 3, duration: 0.3 }}
          className="fixed bottom-[3.5rem] right-4 sm:bottom-[4.5rem] sm:right-6 z-50 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-secondary animate-pulse"
        />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={handleInteraction}
              className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[350px] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-border bg-card"
            >
            {/* Header */}
            <div className="bg-gradient-primary p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary-foreground">
                    EduExpoGlobal Assistant
                  </h3>
                  <p className="text-xs text-primary-foreground/80">
                    Powered by AI
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[280px] sm:h-[300px] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.isBot
                        ? "bg-muted text-foreground rounded-tl-sm"
                        : "bg-gradient-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text || (message.isBot && isLoading ? "..." : "")}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.text === "" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 border-t border-border bg-card"
            >
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary text-sm sm:text-base"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-primary hover:opacity-90 shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
