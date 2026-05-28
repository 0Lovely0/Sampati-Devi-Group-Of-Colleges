import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import DepartmentLayout from "../layouts/DepartmentLayout"; // Naya layout import kiya

// Pages
import Home from "../pages/main/Home";
import About from "../pages/main/About";
import EventsPage from "../pages/main/EventsPage";
import ContactPage from "../pages/main/ContactPage";
import Login from "../pages/auth/Login";
import DeptHome from "../pages/dept/Nursing/Home";
import NursingAbout from "../pages/dept/Nursing/About";
import NursingFaculty from  "../pages/dept/Nursing/Faculty";
import NursingSyllabus from  "../pages/dept/Nursing/Syllabus";
import NursingNews from  "../pages/dept/Nursing/NewsPage";
import NursingEvents from  "../pages/dept/Nursing/EventsPage";
import NursingNotice from  "../pages/dept/Nursing/NoticePage";
import AdmissionEnquiry from "../pages/dept/Nursing/AdmissionEnquiry";
import NursingGallery from "../pages/dept/Nursing/GalleryPage";
import NursingVideo from "../pages/dept/Nursing/VideoPage";
import NursingFacultyPage from "../pages/dept/Nursing/FacultyContactPage";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageBanners from "../pages/admin/ManageBanners";
import ManageNews from "../pages/admin/ManageNews";
import ManageNotice from "../pages/admin/ManageNotice";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageVideo from "../pages/admin/ManageVideo";


export const router = createBrowserRouter([
  // 1. Public Routes (Website)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "events", element: <EventsPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },

  // 2. Department Dynamic Routes (Naya Section)
  {
    path: "/dept/:deptId",
    element: <DepartmentLayout />,
    children: [
      { index: true, element: <DeptHome /> },
      { path:"admissionenquiry", element: <AdmissionEnquiry/> },
      { path:"nursingAbout", element: <NursingAbout/> },
      { path:"nursingFaculty", element: <NursingFaculty/> },
      { path:"syllabus", element: <NursingSyllabus/> },
      { path:"news", element: <NursingNews/> },
     { path: "eventDetails", element: <NursingEvents/> },
     { path: "noticeDetails", element: <NursingNotice/> },
     { path: "noticeGallery", element: <NursingGallery/> },
     { path: "nursingVideo", element: <NursingVideo/> },
     { path: "nursingContact", element: <NursingFacultyPage/> },
      
    ],
  },

  // 3. Login Route (Independent)
  {
    path: "/login",
    element: <Login />,
  },

  // 4. Admin Routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "banner", element: <ManageBanners /> },
      { path: "news", element: <ManageNews /> },
      { path: "notice", element: <ManageNotice /> },
      { path: "events", element: <ManageEvents /> },
      { path: "gallery", element: <ManageGallery /> },
      { path: "video", element: <ManageVideo /> },
    ],
  },
]);