import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CvOutputPage from "./pages/CvOutputPage";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./protectRoute";
import Resume from "./pages/ResumeTem";
import RefundPolicy from "./pages/RefundPolicy";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermCond";
import CancellationPolicy from "./pages/CancellationPol";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="new-cv/:id" element={<Resume />}></Route>
        <Route path="/refund-policy" element={<RefundPolicy />}></Route>
        <Route path="/about-us" element={<About />}></Route>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />}></Route>
        <Route path="/cancellation-policy" element={<CancellationPolicy />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
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
