import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PopupAd = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup only once per user (using localStorage)
    const hasSeenPopup =
      typeof window !== "undefined" &&
      window.localStorage.getItem("eduexpoglobal_popup_v2_shown") === "true";

    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        window.localStorage.setItem("eduexpoglobal_popup_v2_shown", "true");
      } catch {
        // ignore storage errors
      }
    }, 500); // Small delay for better UX

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("eduexpoglobal_popup_v2_shown", "true");
      }
    } catch {
      // ignore storage errors
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Popup Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-transparent rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                aria-label="Close popup"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative w-full">
                <img
                  src="/Edu%20Expo%20Global%20PoP-Up.jpeg"
                  alt="EDU EXPO GLOBAL 2026 Event Poster"
                  className="block w-full h-auto object-contain max-h-[90vh]"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    console.error("Failed to load popup image");
                    handleClose();
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupAd;
