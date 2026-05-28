// import { Outlet, useParams } from "react-router-dom";
// import NursingNav from "../components/dept/Nursing/NursingNav";
// import NursingFooter from "../components/dept/Nursing/NursingFooter";

// export default function DepartmentLayout() {
//   const { deptId } = useParams();

//   // Abhi hum sirf Nursing ke liye logic likh rahe hain
//   if (deptId === "bsc-nursing") {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <NursingNav />
//         <main className="flex-1">
//           <Outlet />
//         </main>
//         <NursingFooter />
//       </div>
//     );
//   }

//   // Baki departments ke liye yahan logic ayega
//   return <div>Department not configured yet.</div>;
// }

import { Outlet, useParams } from "react-router-dom";
import NursingNav from "../components/dept/Nursing/NursingNav";
import NursingFooter from "../components/dept/Nursing/NursingFooter";
// Import other departments later:
// import PharmacyNav from "../components/dept/Pharmacy/PharmacyNav";

export default function DepartmentLayout() {
  const { deptId } = useParams();

  // 1. Navigation aur Footer ka config
  const deptComponents: Record<string, { Nav: React.ComponentType, Footer: React.ComponentType }> = {
    "bsc-nursing": { Nav: NursingNav, Footer: NursingFooter },
    // "pharmacy": { Nav: PharmacyNav, Footer: PharmacyFooter },
  };

  // 2. Select current department config
  const currentDept = deptId ? deptComponents[deptId] : null;

  // 3. Agar department exist nahi karta
  if (!currentDept) {
    return <div>Department not configured yet.</div>;
  }

  // 4. Render
  const { Nav, Footer } = currentDept;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}