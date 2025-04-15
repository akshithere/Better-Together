import Cookies from "js-cookie";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { Landing } from "../components/private/index.js";
import { Footer } from "../components/shared";
import { toggleUserLogin, updateUserData } from "../redux/slice/userSlice.js";
import { successCallback } from "../service/BetterApi.js";
import { showErrorToast, showSuccessToast } from "../utils/Toasts.js";
import { NavigationMenu } from "@components/ui/Navbar.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const handleToken = async () => {
    const authData = await successCallback();

    if (authData?.status === 200) {
      showSuccessToast(authData?.data?.message);
      dispatch(updateUserData(authData.data.user));
      dispatch(toggleUserLogin());
    } else {
      showErrorToast(authData?.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Cookies.get("OAuthLoginInitiated")) {
      handleToken();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Better-Together</title>
        <meta
          name="description"
          content="Welcome to the homepage of Better-Together. Find the right NGO's for your needs"
        />
      </Helmet>

      <div className="bg-orange-50">
        <NavigationMenu />

        <Landing />

        <Footer />
      </div>
    </>
  );
};

export default Home;
