import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components";
import { FrontPage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<FrontPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
