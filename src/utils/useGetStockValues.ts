import { useQuery } from "@tanstack/react-query";

const AV_KEY = import.meta.env.VITE_ALPHA_VANTAGE as string;

function useGetStockValues() {
  const { data, isLoading } = useQuery({
    queryKey: ["stockValues"],
    queryFn: async () => {
      const symbols = ["QQQ", "SPY"]; // Example symbols, can be dynamic

      // Fetch data for all symbols
      const fetchPromises = symbols.map(async (symbol) => {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_KEY}`
        );

        if (!res.ok) {
          throw new Error(`Error fetching data for ${symbol}`);
        }

        const json = await res.json();
        const globalQuote = json["Global Quote"];

        return {
          symbol: globalQuote["01. symbol"],
          price: globalQuote["05. price"],
          changePercent: globalQuote["10. change percent"],
        };
      });

      // Wait for all fetches to complete
      const results = await Promise.all(fetchPromises);

      // Transform array into an object keyed by symbol
      return results.reduce((acc, item) => {
        acc[item.symbol] = {
          price: item.price,
          changePercent: item.changePercent,
        };
        return acc;
      }, {} as Record<string, { price: string; changePercent: string }>);
    },
  });

  return { stockValues: data, isLoading };
}

export default useGetStockValues;
