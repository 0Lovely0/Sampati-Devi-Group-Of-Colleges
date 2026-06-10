import { useParams } from "react-router-dom";

// IMPORT ALL PAGES
import NursingAbout from "./Nursing/About";
import NursingFaculty from "./Nursing/Faculty";
import NursingSyllabus from "./Nursing/Syllabus";

import PostNursingAbout from "./post_Nursing/about";
import PostNursingFaculty from "./post_Nursing/Faculty";
import PostNursingSyllabus from "./post_Nursing/Syllabus";

export default function DeptPage({ type }: { type: string }) {
  const { deptId } = useParams();

  if (!deptId) return <div>No Department</div>;

  const map: any = {
    "bsc-nursing": {
      About: NursingAbout,
      Faculty: NursingFaculty,
      Syllabus: NursingSyllabus,
    },
    "post-basic-bsc-nursing": {
      About: PostNursingAbout,
      Faculty: PostNursingFaculty,
      Syllabus: PostNursingSyllabus,
    },
  };

  const Dept = map[deptId]?.[type];

  if (!Dept) return <div>Page not found</div>;

  return <Dept />;
}