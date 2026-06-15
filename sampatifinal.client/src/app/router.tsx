import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProgramLayout from "../layouts/ProgramLayout";

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

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import ManageBanners from "../pages/admin/ManageBanners";
import ManageNews from "../pages/admin/ManageNews";
import ManageNotice from "../pages/admin/ManageNotice";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageVideo from "../pages/admin/ManageVideo";
import PrincipalDesk from "../pages/main/PrincipalDesk";
import DirectorPage from "../pages/main/DirectorPage";
import CommitteesPage from "../pages/main/CommitteesPage";
import { ManageToppers } from "../pages/admin/ManageToppers";
import { ManageFacilities } from "../pages/admin/ManageFacilities";
import { ManageCommittee } from "../pages/admin/ManageCommittee";
import ManagePlacement from "../pages/admin/ManagePlacement";

import DepartmentHome from "../components/programs/DepartmentHome";
import DepartmentNotices from "../components/programs/DepartmentNotices";
import DepartmentGallery from "../components/programs/DepartmentGallery";
import DepartmentNews from "../components/programs/DepartmentNews";
import DepartmentEvents from "../components/programs/DepartmentEvents";
import DepartmentVideos from "../components/programs/DepartmentVideos";
import DepartmentToppers from "../components/programs/DepartmentToppers";
import ProgramFaculty from "../pages/programs/ProgramFaculty";
// import ProgramGallery from "../pages/programs/ProgramGallery";
// import ProgramNotices from "../pages/programs/ProgramNotices";
import ProgramAdmissions from "../pages/programs/ProgramAdmissions";

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
    path: "/programs/:slug",
    element: <ProgramLayout />,
    children: [
      {
        index: true,
        element: <DepartmentHome />,
      },
      {
        path: "faculty",
        element: <ProgramFaculty />,
      },
      {
        path: "gallery",
        element: <DepartmentGallery />,
      },
      {
        path: "notices",
        element: <DepartmentNotices />,
      },
      {
        path: "news",
        element: <DepartmentNews />,
      },
      {
        path: "events",
        element: <DepartmentEvents />,
      },
      {
        path: "videos",
        element: <DepartmentVideos />,
      },
      {
        path: "videos",
        element: <DepartmentVideos />,
      },
      {
        path: "toppers",
        element: <DepartmentToppers />,
      },
      {
        path: "admissions",
        element: <ProgramAdmissions />,
      },
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
      { path: "banner", element: <ManageBanners /> },
      { path: "news", element: <ManageNews /> },
      { path: "notice", element: <ManageNotice /> },
      { path: "events", element: <ManageEvents /> },
      { path: "gallery", element: <ManageGallery /> },
      { path: "video", element: <ManageVideo /> },
      { path: "toppers", element: <ManageToppers /> },
      { path: "facility", element: <ManageFacilities /> },
      { path: "committee", element: <ManageCommittee /> },
      { path: "placements", element: <ManagePlacement /> },
    ],
  },
]);
