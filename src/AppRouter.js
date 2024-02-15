import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import AboutUs from "./pages/AboutUs/AboutUs";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyProfile from "./pages/MyProfile/MyProfile";
import DashboardModerator from "./pages/DashboardModerator/DashboardModerator";
import ContactUs from "./pages/ContactUs/ContactUs";
import ViewUserProjects from "./pages/ViewUserProjects/ViewUserProjects";
import ModeratorPendingPage from "./pages/DashboardModerator/ModeratorPendingPage";
import AdminUserList from "./pages/AdminPage/AdminUserList";
import ViewProject from "./pages/ViewProject/ViewProject";
import ModeratorPendingComments from "./pages/DashboardModerator/ModeratorPendingComments";
import AdminDeleteProjectAndCommentPage from "./pages/AdminPage/AdminDeleteProjectAndCommentPage";
const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/dashboardmoderator" element={<DashboardModerator />} />
          <Route
            path="/pendingcommentsmoderator"
            element={<ModeratorPendingComments />}
          />
          <Route
            path="/admindeleteprojectcommentpage"
            element={<AdminDeleteProjectAndCommentPage />}
          />
          <Route
            path="/moderatorpendingpage"
            element={<ModeratorPendingPage />}
          />
          <Route path="/adminuserlist" element={<AdminUserList />} />
          <Route path="/viewuserprojects" element={<ViewUserProjects />} />
          <Route path="/viewproject" element={<ViewProject />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
