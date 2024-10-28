import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import StockService from "../../services/stock-service";
import { Stock } from "../../types";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import TimeSeries from "./charts/TimeSeries";
import BreadCrumb from "./breadcrumbs/BreadCrumb";
import CumulativeCalculator from "./calculator/CumulativeCalculator";
import useCompanyStocks from "../../hooks/useCompanyStocks";

const CompanyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();

  const {
    data: stocks,
    isLoading,
    isError,
  } = useCompanyStocks(parseInt(companyId!));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return undefined;
  }

  const COMPANY_NAME = stocks![0].company.name;
  const COMPANY_ID = stocks![0].company.id;

  return (
    <Stack gap={2} p={5}>
      <BreadCrumb companyName={COMPANY_NAME} />
      <Stack component={Paper} sx={{ padding: "16px 32px 16px 0px" }}>
        <Typography pl={4} fontWeight="bold">
          Statistics
        </Typography>
        <TimeSeries stocks={stocks!} />
      </Stack>
      <Stack gap={2} component={Paper} sx={{ padding: "16px 32px 16px 0px" }}>
        <Typography pl={4} fontWeight="bold">
          Calculator
        </Typography>
        <CumulativeCalculator company_id={COMPANY_ID} />
      </Stack>
    </Stack>
  );
};

export default CompanyPage;
