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

const Query = ({ isFooterInView, setHideFooter }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState({ summary: "", data: [] });
  const [hasSearched, setHasSearched] = useState(false); // Track if search has occurred

  const predefinedQuestions = [
    "Which NGOs help with education in my Delhi NCR?",
    "How can I volunteer for environmental causes?",
    "What are the top NGOs for healthcare support in Mumabi, India?",
    "Find NGOs that assist with disaster relief."
  ];

  const handleSubmit = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setHasSearched(true); // Mark that a search has happened
    setHideFooter(true); // Hide the footer

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
  }, [searchQuery, setHideFooter]);

  const handlePredefinedClick = (question) => {
    setSearchQuery(question);
    handleSubmit();
  };

  return (
    <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex-1 overflow-y-auto py-12 space-y-8 mx-auto">
        {responseData.summary && hasSearched ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {responseData.data.length > 0 ? (
                responseData.data.map((ngo, index) => (
                  <Card
                    key={index}
                    className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-semibold text-gray-900">
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
                          className="text-orange-600 hover:text-orange-700 font-medium text-sm hover:underline transition-colors"
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

            <Card className="w-full shadow-md border border-gray-200 rounded-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-semibold text-gray-900">
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
        ) : (
          <div className="flex flex-1 flex-col justify-center items-center space-y-6">
            {/* Search Bar in Center Initially */}
            <div className="w-full max-w-3xl flex items-center space-x-3 bg-white shadow-xl rounded-lg p-4">
              <Input
                type="text"
                placeholder="Ask something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-orange-200  transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-60 flex items-center"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Find"}
              </button>
            </div>

            {/* Predefined Questions */}
            <div className="text-center space-y-2">
              <p className="text-gray-600 text-lg font-medium">Try these questions:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedClick(question)}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium bg-orange-50 px-4 py-2 rounded-full hover:bg-orange-100 transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar at Bottom After Search */}
      {hasSearched && (
        <div
          className={`w-full max-w-3xl px-4 sm:px-6 fixed bottom-6 left-0 right-0 mx-auto z-50 
            bg-white shadow-xl rounded-lg flex items-center space-x-3 transition-all duration-300`}
        >
          <Input
            type="text"
            placeholder="Ask something..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-60 flex items-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Find"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Query;