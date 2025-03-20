import { useEffect } from "react";
import ReactGA from "react-ga4";

function ScrollTracker() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        ReactGA.event({
          category: "User",
          action: "Scrolled to Bottom",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

export default ScrollTracker;
