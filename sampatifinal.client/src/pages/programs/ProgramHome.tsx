import { useParams, Link } from "react-router-dom";
import { departments } from "../../data/departments";

export default function ProgramHome() {
  const { slug } = useParams();

  const normalizedSlug = (slug || "").toLowerCase().trim();

  const program = departments.find(
    (item) => item.slug.toLowerCase() === normalizedSlug
  );

  if (!program) {
    return (
      <div className="py-20 text-center text-red-500 font-semibold">
        Program not found: {slug}
      </div>
    );
  }

  const theme = program.theme;

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-20 text-white"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            {program.name}
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-3xl text-white/90">
            Build a rewarding career in healthcare with world-class education,
            practical training, and professional excellence.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/applynow">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold">
                Apply Now
              </button>
            </Link>

            <a
              href="/brochures/BSc_Nursing_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white rounded-full font-semibold inline-block"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </section>
    </>
  );
}