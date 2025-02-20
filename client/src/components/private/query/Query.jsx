

// Query.jsx
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@redux/slice/userSlice";
import { Input } from "@components/ui/input";
import { handleSearch } from "@service/BetterApi";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Query = ({ isFooterVisible }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState({ summary: "", data: [] });

  const handleSubmit = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const response = await handleSearch(searchQuery);
      const formattedResponse = {
        summary: response?.summary || "No relevant information found.",
        data: Array.isArray(response?.data) ? response.data : [],
      };
      setResponseData(formattedResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseData({ summary: "Sorry, something went wrong. Try again!", data: [] });
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full max-w-7xl flex-1 overflow-y-auto px-4 py-16 space-y-6 mx-auto">
        {responseData.summary && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {responseData.data.length > 0 ? (
                responseData.data.map((ngo, index) => (
                  <Card 
                    key={index} 
                    className="w-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {ngo.title || "Unknown NGO"}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm line-clamp-2">
                        {ngo.description || "No description available."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 text-base leading-relaxed">
                        {ngo.content || "No details available."}
                      </p>
                    </CardContent>
                    <CardFooter>
                      {ngo.link ? (
                        <a 
                          href={ngo.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-orange-500 hover:text-orange-600 font-medium text-sm hover:underline transition-colors"
                        >
                          {ngo.footer || "Visit Website"}
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No link available</span>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center text-lg">
                  No NGO data found.
                </p>
              )}
            </div>

            <Card className="w-full shadow-lg shadow-orange-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base leading-relaxed">
                  {responseData.summary}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {!responseData.summary && (
          <div className="flex flex-1 justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-500 text-center">
              How can I help you today?
            </h1>
          </div>
        )}
      </div>

      <div
        className={`w-full max-w-2xl px-4 py-3 fixed bottom-4 left-0 right-0 mx-auto z-20 
          bg-white shadow-lg rounded-lg flex items-center space-x-2 transition-all duration-300
          ${isFooterVisible ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <Input
          type="text"
          placeholder="Ask something..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md "
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md 
            shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Find"}
        </button>
      </div>
    </div>
  );
};

export default Query;