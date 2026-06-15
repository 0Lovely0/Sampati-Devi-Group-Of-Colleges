import { useParams } from "react-router-dom";

import BscNursingNews from "../../departments/bsc-nursing/pages/news";

// import PharmacyNews from "../../departments/pharmacy/pages/News";
// import VeterinaryNews from "../../departments/veterinary-pharmacist/pages/News";
// import PostBasicNews from "../../departments/post-basic-bsc-nursing/pages/News";
// import MphwNews from "../../departments/multipurpose-health-worker/pages/News";

export default function DepartmentNews() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingNews />;

    // case "pharmacy":
    //   return <PharmacyNews />;

    // case "veterinary-pharmacist":
    //   return <VeterinaryNews />;

    // case "post-basic-bsc-nursing":
    //   return <PostBasicNews />;

    // case "multipurpose-health-worker":
    //   return <MphwNews />;

    default:
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-xl font-semibold text-red-500">
            Department News Not Found
          </h1>
        </div>
      );
  }
}