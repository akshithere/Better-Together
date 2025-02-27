import { Button } from "@components/shared";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-6 py-12">

      {/* Hero Section */}
      <div className="text-center max-w-3xl mt-16">
        <h1 className="!text-6xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight font-primary">
          We find <span className="text-orange-600">NGOs</span> and <span className="text-orange-600">charities</span> for your needs.
        </h1>
        <p className="text-gray-700 mt-4 text-lg md:text-xl font-medium">
          Connecting you with the right organizations to make a difference.
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="mt-10">
        <Button
          asChild
          className="bg-orange-500 text-white text-lg font-semibold rounded-xl px-8 py-3 shadow-lg 
                     transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-600 hover:shadow-xl"
        >
          <Link className="text-white" to="/query">
            Find an NGO
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Landing;
