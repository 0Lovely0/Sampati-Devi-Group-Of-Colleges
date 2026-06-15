import { Link, useParams } from "react-router-dom";
import { departments } from "../../data/departments";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function ProgramFooter() {
  const { slug } = useParams();

  const department = departments.find(
    (dept) => dept.slug === slug
  );

  const theme = department?.theme || {
    primary: "#2563EB",
    accent: "#4F46E5",
  };

  return (
    <footer
      className="mt-20 text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* College Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {department?.name || "Sampati Devi Group of Colleges"}
            </h3>

            <p className="text-white/80 leading-7">
              Empowering students through quality education,
              practical training, and professional excellence in
              healthcare and allied sciences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xl mb-5">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Apply Now", path: "/applynow" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-all hover:translate-x-1"
                >
                  <ArrowRight size={15} />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xl mb-5">
              Contact Us
            </h4>

            <div className="space-y-4 text-white/80">
              <div className="flex gap-3 items-start">
                <MapPin size={18} />
                <span>
                  Bijni, Mandi,
                  <br />
                  Himachal Pradesh
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={18} />
                <span>+91 70182 26132</span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={18} />
                <span>sdmnursingcollege@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/70">
          <p>
            © {new Date().getFullYear()}{" "}
            Sampati Devi Group of Colleges.
            All Rights Reserved.
          </p>

          <p>
            Department:{" "}
            <span className="font-semibold text-white">
              {department?.name}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}