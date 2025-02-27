import { CiFilter } from "react-icons/ci";
import { PiCaretLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { NavigationMenu } from "@components/ui/Navbar";
import ComponentHelmet from "../../utils/ComponentHelmet";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Footer } from "@components/shared";

const clubs = Array.from({ length: 20 }, (_, i) => ({
  _id: `club-${i}`,
  name: `NGO ${i + 1}`,
  description: "A non-profit organization focusing on social welfare.",
}));

const ClubCard = ({ club }) => {
  return (
    <Card className="w-full max-w-sm bg-orange-200 border border-orange-300 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-orange-400">{club.name}</CardTitle>
        <CardDescription>{club.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">Supporting communities with various initiatives.</p>
      </CardContent>
      <CardFooter>
        <button className="w-full py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all">
          Learn More
        </button>
      </CardFooter>
    </Card>
  );
};

const Clubs = () => {
  const navigate = useNavigate();

  return (
    <>
      <ComponentHelmet type="Clubs" />
      <NavigationMenu />

      <div className="p-6 bg-orange-50 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search for NGOs..."
            className="p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <button className="flex items-center gap-2 text-orange-400 hover:text-orange-600 mt-2 md:mt-0">
            Filters <CiFilter size={20} />
          </button>
        </div>

        <button
          className="flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all"
          onClick={() => navigate("/dashboard")}
        >
          Your Dashboard <PiCaretLeftBold size={20} />
        </button>

        <div className="flex flex-wrap gap-6 justify-center mt-6">
          {clubs.map((club) => (
            <ClubCard club={club} key={club._id} />
          ))}
        </div>
      </div>
      
      <Footer />
      
    </>
  );
};

export default Clubs;
