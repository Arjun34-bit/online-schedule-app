import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import AdminLogin from "./Pages/AdminLogin";
import CoursePage from "./Pages/CoursePage";
import InstructorPage from "./Pages/InstructorPage";
import InstructorLogin from "./Pages/InstructorLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLogin />} exact />
        <Route path="/dashboard/:id" element={<AdminPage />} />
        <Route exact path="/course/:id" element={<CoursePage />} />
        <Route path="/instructor" element={<InstructorLogin />} />
        <Route path="/instructorpage/:id" element={<InstructorPage />} />
      </Routes>
    </div>
  );
}

export default App;
