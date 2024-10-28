import { CircularProgress, Stack, Typography } from "@mui/material";
import CompanyCard from "./card/CompanyCard";
import useCompanies from "../../hooks/useCompanies";

const HomePage = () => {
  const { data: companies, isLoading, isError } = useCompanies();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <></>;
  }

  return (
    <Stack
      height={"100%"}
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
      gap={5}
    >
      <Typography variant="h2">Stocks</Typography>
      {companies!.map((company) => {
        return <CompanyCard key={company.id} company={company} />;
      })}
    </Stack>
  );
};

export default HomePage;
