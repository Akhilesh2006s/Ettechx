import { useEffect } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw9e0JOppuIZyPIbFUgnxQ4NeGds9eFZTNuFUM4_gBBjpB63vDACGWb5Miu44RBRYKy/exec";
const NOMINATIONS_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd4L3ZeWfcfbuFqVoCVCrWVKxIuqoityznp1GA_Ku8ySS_gVA/viewform?usp=header";

const Nominations2026Redirect = () => {
  useEffect(() => {
    const team = "nominations2026";
    fetch(`${SCRIPT_URL}?team=${encodeURIComponent(team)}`).catch((error) => {
      console.error("Tracking failed:", error);
    });

    const timeout = window.setTimeout(() => {
      window.location.href = NOMINATIONS_FORM_URL;
    }, 300);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>Redirecting...</p>
    </div>
  );
};

export default Nominations2026Redirect;
