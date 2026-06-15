import { Outlet } from "react-router-dom";
import ProgramNavbar from "../components/programs/ProgramNavbar";
import ProgramFooter from "../components/programs/ProgramFooter";

export default function ProgramLayout() {
  return (
    <>
      <ProgramNavbar />
      <Outlet />
      <ProgramFooter />
    </>
  );
}