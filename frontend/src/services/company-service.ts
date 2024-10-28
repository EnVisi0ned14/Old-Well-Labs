import api from "./api";

const CompanyService = {
  fetchCompanies: () => {
    return api.get(`companies/`);
  },
};

export default CompanyService;
