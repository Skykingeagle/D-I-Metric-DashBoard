import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Overview from "scenes/overview";
import Employees from "scenes/employees";
import Region from "scenes/region";
import Position from "scenes/position";
import Sources from "scenes/sources";
import Satisfaction from "scenes/satisfaction";
import Performance from "scenes/performance";
import PayRate from "scenes/payrate";
import RatePred from "scenes/rate";
import MalePred from "scenes/male";
import FemalePred from "scenes/female";
import Login from "scenes/login";
import Signup from "scenes/signup";
import RecruitmentForm from "scenes/form";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isUser = useSelector((state) => state.global.user);
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<Layout />}>
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              <Route path="/dashboard" element={isUser ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/overview" element={isUser ? <Overview /> : <Navigate to="/" />} />
              <Route path="/employees" element={isUser ? <Employees /> : <Navigate to="/" />} />
              <Route path="/form" element={isUser ? <RecruitmentForm /> : <Navigate to="/" />} />
              <Route path="/region" element={isUser ? <Region /> : <Navigate to="/" />} />
              <Route path="/position" element={isUser ? <Position /> : <Navigate to="/" />} />
              <Route path="/performance" element={isUser ? <Performance /> : <Navigate to="/" />} />
              <Route path="/sources" element={isUser ? <Sources /> : <Navigate to="/" />} />
              <Route path="/satisfaction" element={isUser ? <Satisfaction /> : <Navigate to="/" />} />
              <Route path="/payrate" element={isUser ? <PayRate /> : <Navigate to="/" />} />
              <Route path="/rate" element={isUser ? <RatePred /> : <Navigate to="/" />} />
              <Route path="/male" element={isUser ? <MalePred /> : <Navigate to="/" /> } />
              <Route path="/female" element={isUser ? <FemalePred /> : <Navigate to="/" />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
