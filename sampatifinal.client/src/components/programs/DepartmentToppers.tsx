import { useParams } from "react-router-dom";

// B.Sc Nursing
import BscNursingToppersGallery from "../../departments/bsc-nursing/pages/toppers";

// You can uncomment when ready
// import PharmacyToppersGallery from "../../departments/pharmacy/pages/ToppersGallery";
// import VeterinaryToppersGallery from "../../departments/veterinary-pharmacist/pages/ToppersGallery";
// import PostBasicToppersGallery from "../../departments/post-basic-bsc-nursing/pages/ToppersGallery";
// import MphwToppersGallery from "../../departments/multipurpose-health-worker/pages/ToppersGallery";

export default function DepartmentToppers() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingToppersGallery />;

    // case "pharmacy":
    //   return <PharmacyToppersGallery />;

    // case "veterinary-pharmacist":
    //   return <VeterinaryToppersGallery />;

    // case "post-basic-bsc-nursing":
    //   return <PostBasicToppersGallery />;

    // case "multipurpose-health-worker":
    //   return <MphwToppersGallery />;

    default:
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-xl font-semibold text-red-500">
            Department Toppers Not Found
          </h1>
        </div>
      );
  }
}