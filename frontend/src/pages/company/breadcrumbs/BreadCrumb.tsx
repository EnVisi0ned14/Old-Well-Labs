import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useNavigate } from "react-router-dom";

interface BreadCrumbProps {
  companyName: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ companyName }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    navigate("/");
  };

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Companies
        </Link>
        <Link
          underline="none"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {companyName}
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb;
