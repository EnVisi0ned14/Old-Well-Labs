// hooks/useCompanyStocks.ts
import { useQuery } from "react-query";
import { Company } from "../types";
import CompanyService from "../services/company-service";

const useCompanies = () => {
  return useQuery<Company[]>(
    ["companies"],
    () => CompanyService.fetchCompanies().then((response) => response.data),
    {
      onError: (error) => {
        console.error("Error fetching companies: " + error);
      },
    }
  );
};
export default useCompanies;
