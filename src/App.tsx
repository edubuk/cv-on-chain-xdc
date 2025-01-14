import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CvOutputPage from "./pages/CvOutputPage";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./protectRoute";
import Resume from "./pages/ResumeTem";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new-cv/:id" element={<Resume />}></Route>
          <Route element={<PrivateRoute />}>
          <Route path="/create-cv" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="cv/:id" element={<CvOutputPage />} />
        </Route>
      </Routes>
      </>
  );
}

export default App;
