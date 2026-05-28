// // // // src/app/router.tsx
// // // import { createBrowserRouter } from "react-router-dom";
// // // import MainLayout from "../layouts/MainLayout";
// // // import Home from "../pages/main/Home";
// // // import About from "../pages/main/About";
// // // import EventsPage from "../pages/main/EventsPage";
// // // import ContactPage from "../pages/main/ContactPage";
// // // import Login from  "../pages/auth/Login";

// // // export const router = createBrowserRouter([
// // //   {
// // //     path: "/",
// // //     element: <MainLayout />,
// // //     children: [
// // //       {
// // //         index: true,
// // //         element: <Home />,
// // //       },
// // //       {
// // //         path: "about", // The URL will be /about
// // //         element: <About />,
// // //       },
// // //       {
// // //         path: "events",
// // //         element: <EventsPage />,
// // //       },
// // //       {
// // //         path: "contact",
// // //         element: <ContactPage />,
// // //       },
// // //       {
// // //         path: "/login",
// // //         element: <Login />,
// // //       },
// // //     ],
// // //   },
// // // ]);

// // // src/app/router.tsx
// // import { createBrowserRouter } from "react-router-dom";
// // import MainLayout from "../layouts/MainLayout";
// // import Home from "../pages/main/Home";
// // import About from "../pages/main/About";
// // import EventsPage from "../pages/main/EventsPage";
// // import ContactPage from "../pages/main/ContactPage";
// // import Login from "../pages/auth/Login";

// // export const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <MainLayout />,
// //     children: [
// //       { index: true, element: <Home /> },
// //       { path: "about", element: <About /> },
// //       { path: "events", element: <EventsPage /> },
// //       { path: "contact", element: <ContactPage /> },
// //     ],
// //   },
// //   {
// //     path: "/login", // Moved outside MainLayout children
// //     element: <Login />,
// //   },
// // ]);

// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import AdminLayout from "../layouts/AdminLayout"; // Naya layout import kiya
// import Home from "../pages/main/Home";
// import About from "../pages/main/About";
// import EventsPage from "../pages/main/EventsPage";
// import ContactPage from "../pages/main/ContactPage";
// import Login from "../pages/auth/Login";
// import Dashboard from "../pages/admin/Dashboard";
// import ManageUsers from "../pages/admin/ManageUsers";
// import ManageBanners from "../pages/admin/ManageBanners";
// import ManageNews from "../pages/admin/ManageNews";
// import ManageNotice from "../pages/admin/ManageNotice";
// import ManageEvents from "../pages/admin/ManageEvents";
// import ManageGallery from "../pages/admin/ManageGallery";
// import ManageVideo from "../pages/admin/ManageVideo";

// export const router = createBrowserRouter([
//   // Public Routes (Website)
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "about", element: <About /> },
//       { path: "events", element: <EventsPage /> },
//       { path: "contact", element: <ContactPage /> },
//     ],
//   },

//   // Login Route (Independent)
//   {
//     path: "/login",
//     element: <Login />,
//   },

//   // Admin Routes (With Sidebar/AdminLayout)
//   {
//     path: "/dashboard",
//     element: <AdminLayout />,
//     children: [
//       { index: true, element: <Dashboard /> }, // Ye main dashboard page hai
//       { path: "users", element: <ManageUsers /> }, 
//       { path: "banner", element: <ManageBanners /> },
//       { path: "news", element: <ManageNews /> },
//       { path: "notice", element: <ManageNotice /> },
//       { path: "events", element: <ManageEvents /> },
//       { path: "gallery", element: <ManageGallery /> },
//       { path: "video", element: <ManageVideo /> },
//     ],
//   },
// ]);


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
import DeptHome from "../pages/dept/Nursing/Home"; // Naya Dept Home page

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