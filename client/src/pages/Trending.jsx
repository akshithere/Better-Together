import { NavigationMenu } from "@components/ui/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const trendingItems = Array.from({ length: 10 }, (_, i) => ({
  _id: `trending-${i}`,
  title: `Trending Topic ${i + 1}`,
  description: "A highly discussed topic making waves in the community.",
  date: "March 15, 2025",
  views: Math.floor(Math.random() * 5000) + 1000,
}));

const TrendingCard = ({ item }) => {
  return (
    <Card className="w-full max-w-sm bg-orange-200 border border-orange-300 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-orange-400">{item.title}</CardTitle>
        <CardDescription>{item.date} - {item.views} views</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{item.description}</p>
      </CardContent>
      <CardFooter>
        <button className="w-full py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all">
          Read More
        </button>
      </CardFooter>
    </Card>
  );
};

const Trending = () => {
  return (
    <>
      <NavigationMenu />
      <div className="p-6 bg-orange-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-orange-500 text-center mb-6">Trending Now</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {trendingItems.map((item) => (
            <TrendingCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
