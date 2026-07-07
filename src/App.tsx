import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import ProjectsPage from "./pages/workspace/ProjectsPage";
import CareerPage from "./pages/workspace/CareerPage";
import ContactPage from "./pages/workspace/ContactPage";
import AmbientBackground from "./components/AmbientBackground";

function App() {
  return (
    <>
      <AmbientBackground />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work" element={<WorkspaceLayout />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
