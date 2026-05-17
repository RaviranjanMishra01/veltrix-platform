
import { Routes, Route } from "react-router-dom";
import LoginFrom from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/pages/Home";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={ <Home />}
      />
      <Route
        path="/login"
        element={<LoginFrom />}
      />
      <Route
        path="/register"
        element={<RegisterForm />}
      />
    </Routes>
  );
}
export default App;