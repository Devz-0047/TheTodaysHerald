import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "../utils/types/types";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

function GeneralSidebar() {
    const {genre} = useParams<{genre:string}>(); 
    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(" ");
        return words.length > wordLimit 
          ? words.slice(0, wordLimit).join(" ") + "..." 
          : text;
      };
      
     const { data,isLoading} = useQuery({
        queryKey: [genre],
        queryFn: async () => {
          const response = await axios.get<{ articles: Article[] }>(
            `https://gnews.io/api/v4/top-headlines?category=${genre}&token=${API_KEY}&lang=en&country=in&max=5`

          );
          return response.data.articles; 
        },
        staleTime: 10 * 60 * 1000, // Cache results for 10 minutes to save API requests
      });
      
      return (<div className="mt-14">
      
        {isLoading? (<div className="pr-2 mx-auto border border-r-black sm:w-[958px] hidden xl:inline-block">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-1 sm:grid-cols-2 pb-1 mb-1 border border-b-black gap-x-4 cursor-pointer hover:bg-[#e9ecef] transition-all animate-pulse"
      >
        <div className="mt-4 ml-2">
          
          <div className="w-full h-4 mt-8 rounded bg-slate-300"></div>
          <div className="w-full h-4 mt-2 rounded bg-slate-300"></div>
          <div className="w-full h-4 mt-2 rounded bg-slate-300"></div>
          <div className="w-2/3 h-4 mt-2 rounded bg-slate-300"></div>
         
        </div>
        <div className=" w-[140px] h-[150px] my-2 bg-slate-300 mr-4"></div>
      </div>
    ))}
  </div>)  :(<div className="hidden xl:inline-block">
            <h3 className="mb-2 font-serif text-xl font-semibold text-center underline decoration-2 ">Trending in India</h3>
          {data?.map((article: Article, index: number) =>
            article.title !== "[Removed]" ? (
              <div
                key={index}
                className="grid grid-cols-2 pb-1 mb-1 border border-b-black gap-x-2 w-[300px] min-h-[180px] max-h-[200px] cursor-pointer hover:bg-[#e9ecef] transition-all justify-center"
                onClick={() => window.open(article.url, "_blank")}
              >
                <div className="ml-1">
                  <h2 className="pl-1 my-2 font-serif text-lg font-semibold text-black">
                  {truncateText(article.title, 8)}
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
        </div>)}
        </div>
      );
}

export default GeneralSidebar