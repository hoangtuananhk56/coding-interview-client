import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "./screens/layout/Layout";
import Candidate from "./screens/candidate/Candidate";
import Login from "./screens/auth/login/Login";
import Register from "./screens/auth/register/Register";
import Challenge from "./screens/challenge/Challenge";
import SQL from "./screens/challenge/challengeSql/Sql";
import Algorithm from "./screens/challenge/challengeAlgorithm/Algorithm";
import Knowledge from "./screens/challenge/challengeKnowledge/Knowledge";
import Testing from "./screens/testing/Testing";
import Exam from "./screens/testing/exam/Exam";
import NoPage from "./screens/404/404";
import Thank from "./screens/candidatetesting/thank/Thank";
import Welcome from "./screens/candidatetesting/welcome/Welcome";
import Challengelist from "./screens/candidatetesting/challengelist/Challengelist";
import CandidateTesting from "./screens/candidatetesting/testing/CandidateTesting";
import CandidateTesing from "./screens/candidatetesting/Candidatetesting";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="auth/login" element={<Login />} />
          {/* <Route index element={<Login />} /> */}
          <Route path="auth/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
          <Route path="thank" element={<Thank />} />
          <Route path="welcome" element={<Welcome />} />
          {/* </Route> */}
        <Route path="/" element={<MyLayout />}>
          <Route index element={<Candidate />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="challenge/sql" element={<SQL />} />
          <Route path="challenge/algorithm" element={<Algorithm />} />
          <Route path="challenge/knowledge" element={<Knowledge />} />
          <Route path="test" element={<Testing />} />
          <Route path="test/exam" element={<Exam />} />
        </Route> 
        <Route path="/candidates" element={<CandidateTesing />}>
          <Route path="challengelist" element={<Challengelist />} />
          <Route path="challengelist/:id" element={<CandidateTesting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);