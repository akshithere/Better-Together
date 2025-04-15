import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { NavigationMenu } from "@components/ui/Navbar";
import ComponentHelmet from "@utils/ComponentHelmet";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const events = Array.from({ length: 20 }, (_, i) => ({
  _id: `event-${i}`,
  name: `Event ${i + 1}`,
  date: "March 15, 2025",
  location: "Delhi NCR",
  description: "An exciting event focusing on social impact and community engagement."
}));

const EventCard = ({ event }) => {
  return (
    <Card className="w-full max-w-sm bg-orange-200 border border-orange-300 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-orange-400">{event.name}</CardTitle>
        <CardDescription>{event.date} - {event.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter>
        <button className="w-full py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all">
          View Details
        </button>
      </CardFooter>
    </Card>
  );
};

const Events = () => {
  return (
    <>
      <ComponentHelmet type="Events" />
      <NavigationMenu />

      <div className="p-6 bg-orange-50 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search for events..."
            className="p-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <button className="flex items-center gap-2 text-orange-400 hover:text-orange-600 mt-2 md:mt-0">
            Filters <CiFilter size={20} />
          </button>
        </div>

        <button className="flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all">
          <FaPlus size={16} /> Create An Event
        </button>

        <div className="flex flex-wrap gap-6 justify-center mt-6">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
