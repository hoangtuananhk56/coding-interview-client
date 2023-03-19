import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "./screens/layout/Layout";
import Home from "./screens/home/Home";
import Login from "./screens/auth/login/Login";
import Register from "./screens/auth/register/Register";
import Challenge from "./screens/challenge/Challenge";
import SQL from "./screens/challenge/challengeSql/Sql";
import Algorithm from "./screens/challenge/challengeAlgorithm/Algorithm";
import Knowledge from "./screens/challenge/challengeKnowledge/Knowledge";
import Testing from "./screens/testing/Testing";
import NoPage from "./screens/404/404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="auth/login" element={<Login />} />
          {/* <Route index element={<Login />} /> */}
          <Route path="auth/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
          {/* </Route> */}
        <Route path="/" element={<MyLayout />}>
          <Route index element={<Home />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="challenge/sql" element={<SQL />} />
          <Route path="challenge/algorithm" element={<Algorithm />} />
          <Route path="challenge/knowledge" element={<Knowledge />} />
          <Route path="test" element={<Testing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);