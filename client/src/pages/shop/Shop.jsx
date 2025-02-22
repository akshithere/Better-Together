import { NavigationMenu } from "@components/ui/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const shopItems = Array.from({ length: 10 }, (_, i) => ({
  _id: `shop-${i}`,
  name: `Essential Item ${i + 1}`,
  description: "A much-needed item for those in need.",
  price: (Math.random() * 50 + 10).toFixed(2),
}));

const ShopCard = ({ item }) => {
  return (
    <Card className="w-full max-w-sm bg-orange-200 border border-orange-300 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-orange-400">{item.name}</CardTitle>
        <CardDescription>${item.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{item.description}</p>
      </CardContent>
      <CardFooter>
        <button className="w-full py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all">
          Buy Now
        </button>
      </CardFooter>
    </Card>
  );
};

const Shop = () => {
  return (
    <>
      <NavigationMenu />
      <div className="p-6 bg-orange-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-orange-500 text-center mb-6">Help by Purchasing</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {shopItems.map((item) => (
            <ShopCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
