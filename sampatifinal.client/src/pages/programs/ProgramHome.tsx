import { useParams } from "react-router-dom";
import { departments } from "../../data/departments";

export default function ProgramHome() {
  const { slug } = useParams();

  const program = departments.find(
    (item) => item.slug === slug
  );

  if (!program) {
    return (
      <div className="py-20 text-center">
        Program not found
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
            Build a rewarding career in healthcare with
            world-class education, practical training,
            and professional excellence.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold">
              Apply Now
            </button>

            <button className="px-6 py-3 border border-white rounded-full font-semibold">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </>
  );
}


