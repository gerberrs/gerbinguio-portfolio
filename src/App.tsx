import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Landing from "./pages/Landing";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import AmbientBackground from "./components/AmbientBackground";

// Workspace pages are split out so Swiper/EmailJS stay off the landing bundle
const ProjectsPage = lazy(() => import("./pages/workspace/ProjectsPage"));
const CareerPage = lazy(() => import("./pages/workspace/CareerPage"));
const ContactPage = lazy(() => import("./pages/workspace/ContactPage"));

function App() {
  return (
    // reducedMotion="user": Framer Motion skips transform/layout animations
    // for visitors with prefers-reduced-motion (the CSS block in index.css
    // only covers CSS animations, not JS-driven ones).
    <MotionConfig reducedMotion="user">
      <AmbientBackground />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work" element={<WorkspaceLayout />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<Suspense fallback={null}><ProjectsPage /></Suspense>} />
          <Route path="career" element={<Suspense fallback={null}><CareerPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={null}><ContactPage /></Suspense>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MotionConfig>
  );
}

export default App;
