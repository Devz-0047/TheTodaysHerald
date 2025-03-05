import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "../utils/types/types";
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

function Sidebar() {
    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(" ");
        return words.length > wordLimit 
          ? words.slice(0, wordLimit).join(" ") + "..." 
          : text;
      };
      
     const { data} = useQuery({
        queryKey: ["topTech"],
        queryFn: async () => {
          const response = await axios.get<{ articles: Article[] }>(
            `https://gnews.io/api/v4/top-headlines?category=technology&token=${API_KEY}&lang=en&max=5`
          );
          return response.data.articles; 
        },
        staleTime: 10 * 60 * 1000, // Cache results for 10 minutes to save API requests
      });
      return (
        <div className="hidden xl:inline-block">
            <h3 className="mb-1 font-serif text-xl font-semibold text-center underline decoration-2 ">Trending in Tech</h3>
          {data?.map((article: Article, index: number) =>
            article.title !== "[Removed]" ? (
              <div
                key={index}
                className="grid grid-cols-2 pb-1 mb-1 border border-b-black gap-x-2 w-[300px] min-h-[200px] max-h-[250px] cursor-pointer hover:bg-[#e9ecef] transition-all justify-center"
                onClick={() => window.open(article.url, "_blank")}
              >
                <div className="ml-1">
                  <h2 className="pl-1 mt-2 font-serif text-lg font-semibold text-black">
                  {truncateText(article.title, 10)}
                  </h2>
                 
                 
                </div>
                <div>
                {article.image && (
                  <img
                    src={article.image}
                    className="w-[175px] h-[175px] rounded-sm"
                    alt={article.title}
                  />
                )}
                </div>
              </div>
            ) : null
          )}
          <div>
            
          </div>
        </div>
      );
}

export default Sidebar