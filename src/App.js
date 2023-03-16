import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "./screens/layout/Layout";
import Home from "./screens/home/Home";
import Login from "./screens/auth/login/Login";
import Challenge from "./screens/challenge/Challenge";
import Exam from "./screens/exam/Exam";
import NoPage from "./screens/404/404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="exam" element={<Exam />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);