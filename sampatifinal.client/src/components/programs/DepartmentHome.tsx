import { useParams } from "react-router-dom";

import BscNursingHome from "../../departments/bsc-nursing/pages/Home";
import PharmacyHome from "../../departments/pharmacy/pages/Home";
import VeterinaryHome from "../../departments/veterinary-pharmacist/pages/Home";
import PostBasicHome from "../../departments/post-basic-bsc-nursing/pages/Home";
import MphwHome from "../../departments/multipurpose-health-worker/pages/Home";

export default function DepartmentHome() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingHome />;

    case "pharmacy":
      return <PharmacyHome />;

    case "veterinary-pharmacist":
      return <VeterinaryHome />;

    case "post-basic-bsc-nursing":
      return <PostBasicHome />;

    case "multipurpose-health-worker":
      return <MphwHome />;

    default:
      return <div>Department Not Found</div>;
  }
}