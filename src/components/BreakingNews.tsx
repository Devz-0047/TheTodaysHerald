import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "../utils/types/types";
import Sidebar from "./Sidebar";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
// Hindi https://gnews.io/api/v4/top-headlines?lang=hi&country=in&token=API
// French https://gnews.io/api/v4/top-headlines?lang=fr&country=in&token=API
// Spanish https://gnews.io/api/v4/top-headlines?lang=es&country=es&token=API
// https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=us&max=5

function BreakingNews() {
  const { data } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: async () => {
      const response = await axios.get<{ articles: Article[] }>(
        `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=in&max=10`
      );
      return response.data.articles; 
    },
    staleTime: 10 * 60 * 1000, // Cache results for 10 minutes to save API requests
  });
 

  return (
    <div className="flex justify-between pt-1 overflow-x-hidden border border-t-black">
      <div className="pr-2 mx-auto border border-r-black">
      {data?.map((article: Article, index: number) =>
        article.title !== "[Removed]" ? (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-3 pb-1 mb-1 border border-b-black gap-x-4 sm:w-[958px] cursor-pointer hover:bg-[#e9ecef] transition-all overflow-x-hidden"
            onClick={() => window.open(article.url, "_blank")}
          >
            <div className="ml-2 sm:col-span-1">
              <h2 className="mt-2 font-serif text-2xl font-semibold text-black break-words text-wrap">
                {article.title}
              </h2>
              <p className="mt-4 font-serif text-base text-gray-800 text-wrap ">
                {article.description}
              </p>
              <p className="hidden mt-3 font-serif text-base text-gray-700 sm:inline-block">
                By <span className="font-semibold">
                  {article.source.name || "Unknown"}
                  </span>
              </p>
            </div>
            {article.image && (
              <>
              <img
                src={article.image}
                className="w-[300px] h-[200px] sm:w-[525px] lg:w-full sm:h-[353px] sm:col-span-2 self-center mt-3 sm:mt-0"
                alt={article.title}
                />
                <p className="pl-2 mt-3 font-serif text-base text-gray-700 sm:hidden">
                By <span className="font-semibold">
                  {article.source.name || "Unknown"}
                  </span>
              </p>
                </>
              
            )}
          </div>
        ) : null
      )}
      </div>
      <div>
      <Sidebar/>
      </div>
      
    </div>
  );
}

export default BreakingNews;
