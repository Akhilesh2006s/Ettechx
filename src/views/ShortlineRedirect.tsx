import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw9e0JOppuIZyPIbFUgnxQ4NeGds9eFZTNuFUM4_gBBjpB63vDACGWb5Miu44RBRYKy/exec";
const GOOGLE_FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd4L3ZeWfcfbuFqVoCVCrWVKxIuqoityznp1GA_Ku8ySS_gVA/viewform?usp=pp_url&entry.111111=";

const ShortlineRedirect = () => {
  const { team } = useParams<{ team?: string }>();

  useEffect(() => {
    const resolvedTeam = team?.trim() || "unknown";
    const encodedTeam = encodeURIComponent(resolvedTeam);

    fetch(`${SCRIPT_URL}?team=${encodedTeam}`).catch((error) => {
      console.error("Tracking failed:", error);
    });

    const timeout = window.setTimeout(() => {
      window.location.href = `${GOOGLE_FORM_BASE_URL}${encodedTeam}`;
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [team]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>Redirecting...</p>
    </div>
  );
};

export default ShortlineRedirect;
