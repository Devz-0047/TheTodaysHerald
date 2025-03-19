import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Article } from "../utils/types/types";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
function GeneralNews() {
    const {genre} = useParams<{genre:string}>(); //to get genre from URL
    const { data, isLoading } = useQuery({
        queryKey: ["news", genre],  // Ensure genre change triggers refetch
        queryFn: async () => {
          if (!genre) return [];  // Prevent API call if genre is undefined
          const url =
            genre === "India"
              ? `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=in&lang=en`
              : `https://gnews.io/api/v4/top-headlines?category=${genre}&token=${API_KEY}&lang=en`;
      
          const response = await axios.get<{ articles: Article[] }>(url);
          return response.data.articles;
        },
        enabled: !!genre,  // Only fetch when genre is available
        staleTime: 10 * 60 * 1000, // Cache results for 10 minutes
      });
      
      
    return (
        <div className="mt-4">
            <h2 className="my-1 font-serif text-3xl font-bold text-center sm:text-4xl md:text-[42px] ">{genre?.toUpperCase()}</h2>
    {isLoading ?  (<div className="pr-2 mx-auto border border-r-black sm:w-[958px] ">
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

export default GeneralNews
// import { useInfiniteQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Article } from "../utils/types/types";
// import { useParams } from "react-router-dom";

// const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
// const PAGE_SIZE = 10; // Number of articles per page

// function GeneralNews() {
//   const { genre } = useParams<{ genre: string }>(); // Get genre from URL

//   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ["news", genre],
//       queryFn: async ({ pageParam = 1 }) => {
//         if (!genre) return { articles: [], nextPage: null };

//         const url =
//           genre === "India"
//             ? `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=in&lang=en&page=${pageParam}&max=${PAGE_SIZE}`
//             : `https://gnews.io/api/v4/top-headlines?category=${genre}&token=${API_KEY}&lang=en&page=${pageParam}&max=${PAGE_SIZE}`;

//         const response = await axios.get<{ articles: Article[] }>(url);

//         return {
//           articles: response.data.articles,
//           nextPage: response.data.articles.length === PAGE_SIZE ? pageParam + 1 : null,
//         };
//       },
//       initialPageParam: 1,
//       getNextPageParam: (lastPage) => lastPage.nextPage, // ✅ Track next page correctly
//       enabled: !!genre,
//       staleTime: 10 * 60 * 1000,
//     });

//   return (
//     <div className="mt-4">
//       <h2 className="my-1 font-serif text-3xl font-bold text-center sm:text-4xl md:text-5xl">
//         {genre?.toUpperCase()}
//       </h2>

//       {/* Loading State */}
//       {isLoading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : (
//         <div className="pr-2 mx-auto border border-r-black">
//           {/* Render Articles */}
//           {data?.pages.flatMap((page) =>
//             page.articles.map((article, index) =>
//               article.title !== "[Removed]" ? (
//                 <div
//                   key={`${index}-${article.title}`} // ✅ Ensure unique keys
//                   className="grid grid-cols-1 sm:grid-cols-2 pb-1 mb-1 border border-b-black gap-x-4 sm:w-[958px] cursor-pointer hover:bg-[#e9ecef] transition-all overflow-x-hidden"
//                   onClick={() => window.open(article.url, "_blank")}
//                 >
//                   <div className="ml-2">
//                     <h2 className="mt-2 font-serif text-2xl font-semibold text-black break-words text-wrap">
//                       {article.title}
//                     </h2>
//                     <p className="mt-4 font-serif text-base text-gray-800 text-wrap">
//                       {article.description}
//                     </p>
//                     <p className="hidden mt-3 font-serif text-base text-gray-700 sm:inline-block">
//                       By <span className="font-semibold">{article.source.name || "Unknown"}</span>
//                     </p>
//                   </div>
//                   {article.image && (
//                     <>
//                       <img
//                         src={article.image}
//                         className="w-[300px] h-[200px] sm:w-[300px] lg:w-[500px] sm:h-[353px] self-center mt-3 sm:mt-0 lg:justify-self-end"
//                         alt={article.title}
//                       />
//                       <p className="pl-2 mt-3 font-serif text-base text-gray-700 sm:hidden">
//                         By <span className="font-semibold">{article.source.name || "Unknown"}</span>
//                       </p>
//                     </>
//                   )}
//                 </div>
//               ) : null
//             )
//           )}
//         </div>
//       )}

//       {/* Load More Button */}
//       {hasNextPage && (
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => fetchNextPage()}
//             className="px-4 py-2 text-white bg-blue-500 rounded-md"
//             disabled={isFetchingNextPage}
//           >
//             {isFetchingNextPage ? "Loading more..." : "Load More"}
//           </button>
//         </div>
//       )}

//       {/* Loading Indicator for Pagination */}
//       {isFetchingNextPage && (
//         <p className="mt-4 text-center text-gray-500">Loading more articles...</p>
//       )}
//     </div>
//   );
// }

// export default GeneralNews;
// import { useInfiniteQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Article } from "../utils/types/types";
// import { useParams } from "react-router-dom";

// const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
// const PAGE_SIZE = 10; // Number of articles per page

// function GeneralNews() {
//   const { genre } = useParams<{ genre: string }>(); // Get genre from URL

//   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ["news", genre],
//       queryFn: async ({ pageParam = 1 }) => {
//         if (!genre) return { articles: [], nextPage: null };

//         const url =
//           genre === "India"
//             ? `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&country=in&lang=en&page=${pageParam}&max=${PAGE_SIZE}`
//             : `https://gnews.io/api/v4/top-headlines?category=${genre}&token=${API_KEY}&lang=en&page=${pageParam}&max=${PAGE_SIZE}`;

//         const response = await axios.get<{ articles: Article[] }>(url);

//         return {
//           articles: response.data.articles,
//           nextPage: response.data.articles.length === PAGE_SIZE ? pageParam + 1 : null,
//         };
//       },
//       initialPageParam: 1,
//       getNextPageParam: (lastPage) => lastPage.nextPage, // ✅ Correctly tracks next page
//       enabled: !!genre,
//       staleTime: 10 * 60 * 1000,
//     });

//   return (
//     <div className="mt-4">
//       <h2 className="my-1 font-serif text-3xl font-bold text-center sm:text-4xl md:text-5xl">
//         {genre?.toUpperCase()}
//       </h2>

//       {/* Loading State */}
//       {isLoading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : (
//         <div className="pr-2 mx-auto border border-r-black">
//           {/* Render Articles */}
//           {data?.pages.flatMap((page) =>
//             page.articles.map((article, index) =>
//               article.title !== "[Removed]" ? (
//                 <div
//                   key={`${index}-${article.title}`} // ✅ Ensure unique keys
//                   className="grid grid-cols-1 sm:grid-cols-2 pb-1 mb-1 border border-b-black gap-x-4 sm:w-[958px] cursor-pointer hover:bg-[#e9ecef] transition-all overflow-x-hidden"
//                   onClick={() => window.open(article.url, "_blank")}
//                 >
//                   <div className="ml-2">
//                     <h2 className="mt-2 font-serif text-2xl font-semibold text-black break-words text-wrap">
//                       {article.title}
//                     </h2>
//                     <p className="mt-4 font-serif text-base text-gray-800 text-wrap">
//                       {article.description}
//                     </p>
//                     <p className="hidden mt-3 font-serif text-base text-gray-700 sm:inline-block">
//                       By <span className="font-semibold">{article.source.name || "Unknown"}</span>
//                     </p>
//                   </div>
//                   {article.image && (
//                     <>
//                       <img
//                         src={article.image}
//                         className="w-[300px] h-[200px] sm:w-[300px] lg:w-[500px] sm:h-[353px] self-center mt-3 sm:mt-0 lg:justify-self-end"
//                         alt={article.title}
//                       />
//                       <p className="pl-2 mt-3 font-serif text-base text-gray-700 sm:hidden">
//                         By <span className="font-semibold">{article.source.name || "Unknown"}</span>
//                       </p>
//                     </>
//                   )}
//                 </div>
//               ) : null
//             )
//           )}
//         </div>
//       )}

//       {/* Load More Button */}
//       {hasNextPage && (
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => fetchNextPage()}
//             className="px-4 py-2 text-white bg-blue-500 rounded-md"
//             disabled={isFetchingNextPage}
//           >
//             {isFetchingNextPage ? "Loading more..." : "Load More"}
//           </button>
//         </div>
//       )}

//       {/* Loading Indicator for Pagination */}
//       {isFetchingNextPage && (
//         <p className="mt-4 text-center text-gray-500">Loading more articles...</p>
//       )}
//     </div>
//   );
// }

// export default GeneralNews;

