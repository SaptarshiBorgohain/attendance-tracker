

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import PasswordReset from "./pages/PasswordReset";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <NavBar />
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
          </Routes>
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default App;
