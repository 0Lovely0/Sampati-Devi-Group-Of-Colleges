import { useParams } from "react-router-dom";

import BscNursingNotices from "../../departments/bsc-nursing/pages/Notices";
import PharmacyNotices from "../../departments/pharmacy/pages/notice";
import VeterinaryNotices from "../../departments/veterinary-pharmacist/pages/notice";
import PostBasicNotices from "../../departments/post-basic-bsc-nursing/pages/notices";
import MphwNotices from "../../departments/multipurpose-health-worker/pages/notice";

export default function DepartmentNotices() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingNotices />;

    case "pharmacy":
      return <PharmacyNotices />;

    case "veterinary-pharmacist":
      return <VeterinaryNotices />;

    case "post-basic-bsc-nursing":
      return <PostBasicNotices />;

    case "multipurpose-health-worker":
      return <MphwNotices />;

    default:
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-xl font-semibold text-red-500">
            Department Notices Not Found
          </h1>
        </div>
      );
  }
}