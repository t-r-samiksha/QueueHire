import LoginPage from "./pages/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import SignUp from "./pages/signup.jsx";
import NotFound from "./pages/notfound.jsx";
import PrivateRoute from "./privateroute.jsx";
import MainLayout from "./components/mainlayout.jsx";
import Job from "./pages/job.jsx";
import CalendarFull from "./pages/calander.jsx";
import Candidates from "./pages/candidates.jsx";
import Settings from "./pages/settings.jsx";
import { Navigate } from "react-router-dom";
import Calendar from "./pages/calander.jsx";
import UserDashboard from "./pages/userdashboard.jsx";
import CandidateProgress from "./pages/settings.jsx";
import Profile from "./pages/profile.jsx";
import Forget from "./pages/forget.jsx";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const user = useSelector((state) => state.user);
  console.log(user, "in app amdin");

  if (!user || !(user?.role)) return <Navigate to="/" replace />;

  if (user.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}

function UserRoute({ children }) {
  const user = useSelector((state) => state.user);
  console.log(user, "in app user");

  if (!user || !(user?.role)) return <Navigate to="/" replace />;

  if (user.role !== "candidate") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>

          
          <Route path="/admin">
            <Route
              element={
                <AdminRoute>
                  <MainLayout />
                </AdminRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="candidates" element={<Candidates />} />
              <Route path="jobs" element={<Job />} />
              <Route path="settings" element={<Settings />} />
              <Route path="calander" element={<Calendar />} />
              <Route path="candidate-det/:id" element={<CandidateProgress />} />
            </Route>
          </Route>

          <Route path="/user">
            <Route
              element={
                <UserRoute>
                  <MainLayout />
                </UserRoute>
              }
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="progress/:id" element={<CandidateProgress />} />
              <Route path="profile/:id" element={<Profile />} />
              
            </Route>
          </Route>

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forget" element={<Forget />}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
