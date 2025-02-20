import React from "react";
import { ComingSoon } from "../../components/shared";
import { NavigationMenu } from "@components/ui/Navbar";


const Shop = () => {
  return (
    <>
      <NavigationMenu />
      <div className="shop_parent">
        <div className="shop_comingSoon">
          <ComingSoon launchitem={`shop's page.`} />
        </div>
      </div>
    </>
  );
};

export default Shop;
