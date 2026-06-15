import { useParams } from "react-router-dom";

import BscNursingGallery from "../../departments/bsc-nursing/pages/Gallery";

// import PharmacyGallery from "../../departments/pharmacy/pages/Gallery";
// import VeterinaryGallery from "../../departments/veterinary-pharmacist/pages/Gallery";
// import PostBasicGallery from "../../departments/post-basic-bsc-nursing/pages/Gallery";
// import MphwGallery from "../../departments/multipurpose-health-worker/pages/Gallery";

export default function DepartmentGallery() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingGallery />;

    // case "pharmacy":
    //   return <PharmacyGallery />;

    // case "veterinary-pharmacist":
    //   return <VeterinaryGallery />;

    // case "post-basic-bsc-nursing":
    //   return <PostBasicGallery />;

    // case "multipurpose-health-worker":
    //   return <MphwGallery />;

    default:
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-xl font-semibold text-red-500">
            Department Gallery Not Found
          </h1>
        </div>
      );
  }
}