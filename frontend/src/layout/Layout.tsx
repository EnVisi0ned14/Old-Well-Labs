import { Stack } from "@mui/material";
import { ReactElement } from "react";

interface LayoutProps {
  page: ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ page }) => {
  return (
    <Stack bgcolor={"#F1F1F1"} height={"100%"}>
      {page}
    </Stack>
  );
};

export default Layout;
