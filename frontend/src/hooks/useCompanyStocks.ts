// hooks/useCompanyStocks.ts
import { useQuery } from "react-query";
import { Stock } from "../types";
import StockService from "../services/stock-service";

const useCompanyStocks = (companyId: number) => {
  return useQuery<Stock[]>(
    ["companyStocks", companyId],
    () => StockService.fetchStocks(companyId).then((response) => response.data),
    {
      keepPreviousData: true,
      onError: (error) => {
        console.error("Error fetching stocks for company:", error);
      },
    }
  );
};

export default useCompanyStocks;
