import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "../utils/types/types";
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
function News() {
    const { data,isLoading } = useQuery({
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
        <div>
    {isLoading ?  (<div className="pr-2 mx-auto border border-r-black sm:w-[958px]">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-1 sm:grid-cols-2 pb-1 mb-1 border border-b-black gap-x-4 cursor-pointer hover:bg-[#e9ecef] transition-all animate-pulse"
      >
        <div className="mt-4 ml-2">
          <div className="w-3/4 h-6 rounded bg-slate-300"></div>
          <div className="w-3/4 h-6 mt-2 rounded bg-slate-300"></div>
          <div className="w-full h-4 mt-8 rounded bg-slate-300"></div>
          <div className="w-full h-4 mt-2 rounded bg-slate-300"></div>
          <div className="w-full h-4 mt-2 rounded bg-slate-300"></div>
          <div className="w-2/3 h-4 mt-2 rounded bg-slate-300"></div>
          <div className="w-1/3 h-4 mt-10 rounded bg-slate-300"></div>
        </div>
        <div className="w-[300px] h-[200px] sm:w-[300px] lg:w-[450px] sm:h-[353px] bg-slate-300"></div>
      </div>
    ))}
  </div>)  : (<div className="pr-2 mx-auto border border-r-black">
      {data?.map((article: Article, index: number) =>
        article.title !== "[Removed]" ? (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 pb-1 mb-1 border border-b-black gap-x-4 sm:w-[958px] cursor-pointer hover:bg-[#e9ecef] transition-all overflow-x-hidden "
            onClick={() => window.open(article.url, "_blank")}
          >
            <div className="ml-2 ">
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
                className="w-[300px] h-[200px] sm:w-[300px] lg:w-[500px] sm:h-[353px]  self-center mt-3 sm:mt-0 lg:justify-self-end"
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
      </div>)}
            
        </div>
    )
}

export default News