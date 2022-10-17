import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components";
import { FrontPage } from "./pages";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<FrontPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
