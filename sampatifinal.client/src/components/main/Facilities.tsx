import React, { useState } from "react";
import { X } from "lucide-react";

interface Facility {
  id: number;
  name: string;
  image: string;
}

const facilities: Facility[] = [
  {
    id: 1,
    name: "Modern Nursing Lab",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Advanced Anatomy Lab",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Library Facility",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Skill Lab Training",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Computer Lab",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Hospital Training Area",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
  },
];

const FacilitiesPage: React.FC = () => {
  const [selected, setSelected] = useState<Facility | null>(null);

  return (
    <section className="bg-indigo-950  py-20 px-8 text-white">
      <div className="w-full mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Our Facilities</h1>
          <p className="text-sm text-slate-300 mt-1">
            Modern infrastructure and learning environment for students.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {facilities.map((item) => (
            <div key={item.id} className="group">
              
              {/* Image */}
              <div
                onClick={() => setSelected(item)}
                className="cursor-pointer overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <p className="text-xs mt-2 text-slate-200">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Watch More Button */}
        {/* <div className="flex justify-center mt-10">
          <button className="bg-amber-500 text-black text-xs font-bold px-6 py-2 hover:bg-amber-400 transition">
            Watch More
          </button>
        </div> */}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          
          {/* Close Button */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={28} />
          </button>

          {/* Image */}
          <img
            src={selected.image}
            alt={selected.name}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default FacilitiesPage;