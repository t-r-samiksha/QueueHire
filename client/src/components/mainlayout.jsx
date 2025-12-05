
import Sidebar from "../components/sidebar";

import TopBar from "../components/topbar.jsx";

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PageMeta = {
  dashboard: { title: "Dashboard", subtitle: "Automated Resume Screening" },
  candidates: { title: "Candidates", subtitle: "Manage applicants, scores and statuses" },
  jobs: { title: "Job Listings", subtitle: "Open and closed job postings" },
  settings: { title: "Settings", subtitle: "Customize your account" },
  calander: { title: "Schedule", subtitle: "Scheduled interviews & availability" },
  'candidate-det': {title: 'Progress', subtitle:"Track your flow"},
  progress: { title: "Progress",subtitle: "Track hiring stages & applicant flow" },
  profile: { title: "Profile", subtitle: "Manage your personal details & preferences" },
};

function MainLayout() {

const { pathname } = useLocation();
  const key = pathname.split("/")[2];

  console.log('fbuaifnhalf',key)

   const { title, subtitle } = PageMeta[key] || {
    title: "Dashboard",
    subtitle: "",
  };

  return (
    <div className="fulldash" style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div>
        <TopBar title={title} subtitle={subtitle} />
        <div>
            <Outlet />
        </div>
      </div>
    </div>
  );
}
export default MainLayout;
