import { useEffect, useState, useRef } from "react";
import Query from "@components/private/query/Query.jsx";
import { NavigationMenu } from "@components/ui/Navbar.jsx";
import { Helmet } from "react-helmet-async";
import { Footer } from "@components/shared";

const QueryPage = () => {
  const [isFooterInView, setIsFooterInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideFooter, setHideFooter] = useState(false); // New state to hide footer
  const footerRef = useRef(null);

  useEffect(() => {
    const checkFooterVisibility = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight && rect.bottom > 0 && rect.top >= 0;
        setIsFooterInView(isVisible);
        console.log("Footer in view:", isVisible, "Top:", rect.top, "Bottom:", rect.bottom, "Window Height:", windowHeight);
      }
    };

    const timer = setTimeout(() => {
      checkFooterVisibility();
      setIsLoaded(true);
    }, 100);

    window.addEventListener("scroll", checkFooterVisibility);
    window.addEventListener("resize", checkFooterVisibility);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkFooterVisibility);
      window.removeEventListener("resize", checkFooterVisibility);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Better-Together | Query</title>
        <meta
          name="description"
          content="Welcome to the homepage of Better-Together. Find the right NGO's for your needs"
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavigationMenu />
        <main className="flex-1">
          {isLoaded && <Query isFooterInView={isFooterInView} setHideFooter={setHideFooter} />}
        </main>
        {!hideFooter && (
          <div ref={footerRef} className="relative z-10 bg-white">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default QueryPage;