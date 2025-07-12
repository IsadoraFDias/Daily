import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
