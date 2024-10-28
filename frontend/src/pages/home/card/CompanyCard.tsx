import { Card, CardContent, Typography, Box } from "@mui/material";
import { Company } from "../../../types";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const navigate = useNavigate();

  return (
    <Card
      key={company.id}
      sx={{
        minWidth: 500,
        borderRadius: "16px",
        cursor: "pointer", // Change cursor to pointer
        transition: "transform 0.3s, box-shadow 0.3s", // Add transition for hover effect
        "&:hover": {
          transform: "scale(1.05)", // Slightly scale up on hover
          boxShadow: 4, // Increase shadow on hover
        },
      }}
      onClick={() => navigate(`/stocks/${company.id}`)} // Make card clickable
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {company.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {company.sector_level_one.name} | {company.sector_level_two.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
