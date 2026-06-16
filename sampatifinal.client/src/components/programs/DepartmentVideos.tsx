import { useParams } from "react-router-dom";

import BscNursingVideos from "../../departments/bsc-nursing/pages/videos";

import PharmacyVideos from "../../departments/pharmacy/pages/video";
import VeterinaryVideos from "../../departments/veterinary-pharmacist/pages/videos";
import PostBasicVideos from "../../departments/post-basic-bsc-nursing/pages/videos";
import MphwVideos from "../../departments/multipurpose-health-worker/pages/video";

export default function DepartmentVideos() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingVideos />;

    case "pharmacy":
      return <PharmacyVideos />;

    case "veterinary-pharmacist":
      return <VeterinaryVideos />;

    case "post-basic-bsc-nursing":
      return <PostBasicVideos />;

    case "multipurpose-health-worker":
      return <MphwVideos />;

    default:
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-xl font-semibold text-red-500">
            Department Videos Not Found
          </h1>
        </div>
      );
  }
}