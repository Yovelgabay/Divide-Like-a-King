import {useEffect} from "react";

export default function AdBanner({position = "left"}) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  const isMobile = position === "mobile";
  const isSide = position === "left" || position === "right";

  // Just for checking
  const previewFrame = "";

  return (
    <div
      className={`
        ${
          isSide
            ? "hidden lg:flex flex-col items-center fixed top-40 w-[140px] z-40"
            : ""
        }
        ${position === "left" ? "left-0" : ""}
        ${position === "right" ? "right-0" : ""}
        ${isMobile ? "block lg:hidden w-full my-4" : ""}
        ${previewFrame}
      `}
    >
      <ins
        className="adsbygoogle"
        style={{display: "block"}}
        data-ad-client="ca-pub-9536788870595275"
        data-ad-slot="9022003493"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
