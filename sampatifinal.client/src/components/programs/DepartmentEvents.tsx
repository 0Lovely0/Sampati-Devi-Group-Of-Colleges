import { useParams } from "react-router-dom";

import BscNursingEvents from "../../departments/bsc-nursing/pages/events";

import PharmacyEvents from "../../departments/pharmacy/pages/events";
import VeterinaryEvents from "../../departments/veterinary-pharmacist/pages/events";
import PostBasicEvents from "../../departments/post-basic-bsc-nursing/pages/events";
import MphwEvents from "../../departments/multipurpose-health-worker/pages/events";

export default function DepartmentEvents() {
  const { slug } = useParams();

  switch (slug) {
    case "bsc-nursing":
      return <BscNursingEvents />;

    case "pharmacy":
      return <PharmacyEvents />;

    case "veterinary-pharmacist":
      return <VeterinaryEvents />;

    case "post-basic-bsc-nursing":
      return <PostBasicEvents />;

    case "multipurpose-health-worker":
      return <MphwEvents />;

    default:
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-xl font-semibold text-red-500">
            Department Events Not Found
          </h1>
        </div>
      );
  }
}