import api from "./api";

const StockService = {
  fetchStocks: async (
    companyId: number | undefined = undefined,
    page: number | undefined = undefined,
    perPage: number | undefined = undefined
  ) => {
    const params = new URLSearchParams({
      ...(companyId && { company_id: companyId.toString() }),
      ...(page && { page: page.toString() }),
      ...(perPage && { per_page: perPage.toString() }),
    });

    return api.get(`stocks/?${params.toString()}`);
  },
  calculateCumulativeReturn(
    company_id: number,
    start_date: string,
    end_date: string
  ) {
    const params = new URLSearchParams([
      ["company_id", company_id.toString()],
      ["start_date", start_date],
      ["end_date", end_date],
    ]);

    return api.get(`stocks/cumulative-returns/?${params.toString()}`);
  },
};

export default StockService;
