type FaviconState = "normal" | "blog" | "404" | "working" | "relaxing";

export const getFavicon = (state: FaviconState): string => {
  switch (state) {
    case "blog":
      return "/assets/reading.ico";
    case "404":
      return "/assets/not-found.ico";
    case "working":
      return "/assets/working.ico";
    case "relaxing":
      return "/assets/relaxing.ico";
    case "normal":
    default:
      return "/assets/normal.ico";
  }
};