import ReactGA from "react-ga4";

const MID = import.meta.env.VITE_GA_MID as string;

export const initGA = () => {
  if (MID) {
    ReactGA.initialize(MID);
    ReactGA.send("pageview");
  } else {
    console.warn("Google Analytics MID is missing");
  }
};
