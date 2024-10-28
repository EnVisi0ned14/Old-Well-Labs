import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/home/HomePage";
import CompanyPage from "./pages/company/CompanyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout page={<HomePage />} />} />
        <Route
          path="/stocks/:companyId"
          element={<Layout page={<CompanyPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
