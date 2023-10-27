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
import ExamEditing from "./screens/testing/exam/ExamEditing";
import NoPage from "./screens/404/404";
import Thank from "./screens/candidatetesting/thank/Thank";
import Welcome from "./screens/candidatetesting/welcome/Welcome";
import Challengelist from "./screens/candidatetesting/challengelist/Challengelist";
import CandidateTesting from "./screens/candidatetesting/testing/CandidateTesting";
import InterviewTesting from "./screens/candidatetesting/InterviewTesting";
import ExamItem from "./screens/challenge/examitem/ExamItem";
import ExamCreation from "./screens/challenge/examcreation/ExamCreation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
        <Route path="thank" element={<Thank />} />
        <Route path="welcome/:id" element={<Welcome />} />
        <Route path="/" element={<MyLayout />}>
          <Route index element={<Candidate />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="challenge/sql" element={<SQL />} />
          <Route path="challenge/algorithm" element={<Algorithm />} />
          <Route path="challenge/knowledge" element={<Knowledge />} />
          <Route path="challenge/exam/:id" element={<ExamItem />} />
          <Route path="challenge/examcreate/:type" element={<ExamCreation />} />
          <Route path="test" element={<Testing />} />
          <Route path="test/exam" element={<Exam />} />
          <Route path="test/exam/:id" element={<ExamEditing />} />
        </Route>
        <Route path="/candidates/:challengeid" element={<InterviewTesting />}>
          <Route path="/candidates/:challengeid" element={<Challengelist />} />
          <Route
            path="/candidates/:challengeid/:id"
            element={<CandidateTesting />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
