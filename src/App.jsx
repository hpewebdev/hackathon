import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
// Route Component Start here
import LoginPage from "./screens/Homepage";
import Registration from "./screens/Registration";
import Verification from "./screens/verification";
import Contact from "./screens/Contact";
import Result from "./screens/Result";
import ParticipantList from "./screens/ParticipantList";
import AdminDashboard from "./admin/adminDashboard";
import ProjectEntries from "./admin/projectIdeas";
import Project from "./screens/Project";
import React from "react";
import PageNotFound from "./screens/pageNotFound";
import Guideline from "./screens/Guideline";
import ProtectedRoute from "./screens/utils/ProtectedRoute";
// Route Compenent Ends here

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route
              path="/Verification"
              element={
                <Suspense fallback={<>Navigating</>}>
                  <ProtectedRoute element={<Verification />} />
                </Suspense>
              }
            ></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route path="/participants" element={<ParticipantList />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route
              path="/contact"
              element={<ProtectedRoute element={<Contact />} />}
            />
            <Route
              path="/project"
              element={<ProtectedRoute element={<Project />} />}
            ></Route>
            <Route
              path="/AdminDashboard"
              element={<ProtectedRoute element={<AdminDashboard />} />}
            ></Route>
            <Route path="/Guideline" element={<Guideline />}></Route>
            <Route
              path="/ProjectEntries"
              element={<ProtectedRoute element={<ProjectEntries />} />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
