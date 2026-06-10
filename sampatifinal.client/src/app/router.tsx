import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import DepartmentLayout from "../layouts/DepartmentLayout";

// Pages
import Home from "../pages/main/Home";
import About from "../pages/main/About";
import EventsPage from "../pages/main/EventsPage";
import ContactPage from "../pages/main/ContactPage";
import { NoticeBoardPage } from "../pages/main/NoticeBoardPage";
import { AdoptionPage } from "../pages/main/AdoptionPage";
import { ApplyNowPage } from "../pages/main/ApplyNowPage";
import { ToppersGalleryPage } from "../pages/main/ToppersGalleryPage";
import { ExploreProgramsPage } from "../pages/main/ExploreProgramsPage";
import { GalleryPage } from "../pages/main/GalleryPage";
import { VideoGalleryPage } from "../pages/main/VideoGalleryPage";
import { NewsPage } from "../pages/main/NewsPage";
import Login from "../pages/auth/Login";
import DeptHome from "../pages/dept/Nursing/Home";
import NursingAbout from "../pages/dept/Nursing/About";
import NursingFaculty from "../pages/dept/Nursing/Faculty";
import NursingSyllabus from "../pages/dept/Nursing/Syllabus";
import NursingNews from "../pages/dept/Nursing/NewsPage";
import NursingEvents from "../pages/dept/Nursing/EventsPage";
import NursingNotice from "../pages/dept/Nursing/NoticePage";
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
import PrincipalDesk from "../pages/main/PrincipalDesk";
import DirectorPage from "../pages/main/DirectorPage";
import CommitteesPage from "../pages/main/CommitteesPage";
import {ManageToppers} from "../pages/admin/ManageToppers";
import { ManageFacilities } from "../pages/admin/ManageFacilities";
import { ManageCommittee } from "../pages/admin/ManageCommittee";

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
      { path: "adoption", element: <AdoptionPage /> },
      { path: "applynow", element: <ApplyNowPage /> },
      { path: "gallerypage", element: <GalleryPage /> },
      { path: "videogallerypage", element: <VideoGalleryPage /> },
      { path: "noticeboardpage", element: <NoticeBoardPage /> },
      { path: "exploreprogram", element: <ExploreProgramsPage /> },
      { path: "newspage", element: <NewsPage /> },
      { path: "topperpage", element: <ToppersGalleryPage /> },
      { path: "principaldesk", element: <PrincipalDesk /> },
      { path: "directorpage", element: <DirectorPage /> },
      { path: "committee", element: <CommitteesPage /> },
    ],
  },

  // 2. Department Dynamic Routes (Naya Section)
  {
    path: "/dept/:deptId",
    element: <DepartmentLayout />,
    children: [
      { index: true, element: <DeptHome /> },
      { path: "admissionenquiry", element: <AdmissionEnquiry /> },
      { path: "nursingAbout", element: <NursingAbout /> },
      { path: "nursingFaculty", element: <NursingFaculty /> },
      { path: "syllabus", element: <NursingSyllabus /> },
      { path: "news", element: <NursingNews /> },
      { path: "eventDetails", element: <NursingEvents /> },
      { path: "noticeDetails", element: <NursingNotice /> },
      { path: "noticeGallery", element: <NursingGallery /> },
      { path: "nursingVideo", element: <NursingVideo /> },
      { path: "nursingContact", element: <NursingFacultyPage /> },
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
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "banner", element: <ManageBanners /> },
      { path: "news", element: <ManageNews /> },
      { path: "notice", element: <ManageNotice /> },
      { path: "events", element: <ManageEvents /> },
      { path: "gallery", element: <ManageGallery /> },
      { path: "video", element: <ManageVideo /> },
      { path: "toppers", element: <ManageToppers /> },
      { path: "facility", element: <ManageFacilities /> },
      { path: "committee", element: <ManageCommittee /> },
    ],
  },
]);
