import { useEffect } from "react";
import ReactGA from "react-ga4";

function SessionTracker() {
  useEffect(() => {
    const startTime = Date.now();

    const sendSessionDuration = () => {
      const duration = (Date.now() - startTime) / 1000; // Convert ms to seconds
      ReactGA.event({
        category: "User",
        action: "Session Duration",
        value: Math.round(duration),
      });
    };

    window.addEventListener("beforeunload", sendSessionDuration);
    return () => window.removeEventListener("beforeunload", sendSessionDuration);
  }, []);

  return null;
}

export default SessionTracker;
