import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Home from "../components/HomeComponents/Home";
import Footer from "../components/Footer";
import SignUp from "../components/SignUpLoginComponents/SignUp";
import Login from "../components/SignUpLoginComponents/Login";
import NotesParentComponent from "../components/NotesComponent/NotesParentComponent";

const AppRoutes = () => {
  // Get user state from Redux
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Header />

      <Routes>
        {/* Routes accessible by everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/notes" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/notes" /> : <SignUp />} />
        
        {/* Protected Routes */}
        {/* These routes can only be accessed if the user is logged in */}
        <Route path="/notes" element={user ? <NotesParentComponent /> : <Navigate to="/login" />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRoutes;
