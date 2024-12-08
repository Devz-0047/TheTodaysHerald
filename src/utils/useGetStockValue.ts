import { useQuery } from "@tanstack/react-query";

const AV_KEY: string = import.meta.env.VITE_ALPHA_VANTAGE as string;
function useGetStockValue() {
  const {
    data: stockValue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stockValues"],
    queryFn: async () => {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=QQQ&apikey=${AV_KEY}`
      );
      if (!res.ok) {
        throw new Error("Network reponse not found");
      }
      return res.json();
    },
  });

  return { stockValue, isLoading, isError };
}

export default useGetStockValue;
