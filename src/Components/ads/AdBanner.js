import {useEffect} from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{display: "block"}}
      data-ad-client="ca-pub-9536788870595275"
      data-ad-slot="9022003493"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
