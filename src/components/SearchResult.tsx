
import { Article } from "../utils/types/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

function SearchResult() {
  const searchvalue = useSelector((state: RootState) => state.search.value);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, isLoading } = useQuery({
    queryKey: [query, searchvalue],  // Ensure query change triggers refetch
    queryFn: async () => {
      if (!query) return [];
      if (!API_KEY) {
        console.error("VITE_GNEWS_API_KEY is missing!");
        return [];
      }
      const url =
        `https://gnews.io/api/v4/search?q=${query}&token=${API_KEY}&lang=en&max=10`
      const response = await axios.get<{ articles: Article[] }>(url);
      return response.data.articles;
    },
    enabled: !!query,  // Only fetch when query is available
    staleTime: 10 * 60 * 1000,
  });




  return (
    <div className="mt-4">

      <h2 className="my-1 ml-2 font-serif text-lg font-semibold sm:text-xl md:text-2xl">Showing results for <span className="font-serif text-3xl font-bold">
        {query}
      </span>
      </h2>


      {isLoading ? (<div className="pr-2 border border-r-black sm:w-[958px] ">
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
      </div>) : (<div className="pr-0 mx-auto border border-r-black">
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

export default SearchResult