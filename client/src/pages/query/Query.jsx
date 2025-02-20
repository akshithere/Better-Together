// QueryPage.jsx
import { useEffect, useState, useRef } from "react";
import Query from "@components/private/query/Query.jsx";
import { NavigationMenu } from "@components/ui/Navbar.jsx";
import { Helmet } from "react-helmet-async";
import { Footer } from "@components/shared";

const QueryPage = () => {
  const [isFooterInView, setIsFooterInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const checkFooterVisibility = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsFooterInView(rect.top < windowHeight && rect.bottom > 0);
      }
    };

    // Initial check
    checkFooterVisibility();
    setIsLoaded(true);

    // Add scroll listener
    window.addEventListener('scroll', checkFooterVisibility);
    window.addEventListener('resize', checkFooterVisibility);

    return () => {
      window.removeEventListener('scroll', checkFooterVisibility);
      window.removeEventListener('resize', checkFooterVisibility);
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

      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavigationMenu />
        {isLoaded && <Query isFooterInView={isFooterInView} />}
        <div
          ref={footerRef}
          className="mt-auto relative z-10"
        >
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryPage;

