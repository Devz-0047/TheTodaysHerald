import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "../utils/types/types";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

function BreakingNews() {
  const { data } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: async () => {
      const response = await axios.get<{ articles: Article[] }>(
        `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=us&max=10`
      );
      return response.data.articles; 
    },
    staleTime: 10 * 60 * 1000, // Cache results for 10 minutes
  });

  return (
    <div>
      {data?.map((article: Article, index: number) =>
        article.title !== "[Removed]" ? (
          <div
            key={index}
            className="grid grid-cols-3 pb-2 mb-2 border border-b-black gap-x-4 w-[958px] cursor-pointer hover:bg-[#e9ecef]"
            onClick={() => window.open(article.url, "_blank")}
          >
            <div className="col-span-1 ml-2">
              <h2 className="mt-2 font-serif text-2xl font-semibold text-black">
                {article.title}
              </h2>
              <p className="mt-4 font-serif text-base text-gray-800">
                {article.description}
              </p>
              <p className="mt-3 font-serif text-sm text-gray-700">
                By {article.author || "Unknown"}
              </p>
            </div>
            {article.image && (
              <img
                src={article.image}
                className="w-full h-[353px] col-span-2"
                alt={article.title}
              />
            )}
          </div>
        ) : null
      )}
    </div>
  );
}

export default BreakingNews;
