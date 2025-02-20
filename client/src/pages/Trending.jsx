import { ComingSoon } from "../components/shared";
import { NavigationMenu } from "@components/ui/Navbar";


const Trending = () => {
  return (
    <>
      <NavigationMenu />
      <div className="shop_parent">
        <div className="shop_comingSoon">
          <ComingSoon launchitem={`Trending section`} />
        </div>
      </div>
    </>
  );
};

export default Trending;
