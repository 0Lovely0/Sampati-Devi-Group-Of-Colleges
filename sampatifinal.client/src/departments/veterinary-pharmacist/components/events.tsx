import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllEvents,
  type Event as ApiEvent,
} from "../../../services/eventService";
import Loader from "../../../components/common/Loader";

interface EventUI {
  id: number;
  date: string;
  title: string;
  image: string;
}

const normalize = (str: string = "") =>
  str.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

const TARGET_DEPARTMENT = "Veterinary Pharmacist";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventUI[]>([]);
  const [previewImage, setPreviewImage] = useState<EventUI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const data: ApiEvent[] = await getAllEvents();

        const vetEvents = data
          .filter((event: any) =>
            event.departments?.some(
              (dept: any) =>
                normalize(dept.departmentName) ===
                normalize(TARGET_DEPARTMENT)
            )
          )
          .map((e) => ({
            id: e.eventId,
            title: e.title,
            image: e.imagePath?.startsWith("http")
              ? e.imagePath
              : `${API_BASE_URL}/${e.imagePath}`,
            date: new Date(e.eventDate)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
              .toUpperCase(),
          }));

        setEvents(vetEvents);
      } catch (error) {
        console.error("Failed to load veterinary events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
      className="pb-14"
      style={{ backgroundColor: "#DCFCE7" }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center border-b"
        style={{
          background: "linear-gradient(135deg,#15803D 0%,#22C55E 100%)",
          borderColor: "#22C55E",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          Veterinary Pharmacist Events
        </h2>

        <div
          className="h-1 w-16 mx-auto rounded-full"
          style={{ backgroundColor: "#22C55E" }}
        />

        <p className="text-green-100 mt-4 max-w-xl mx-auto text-xs">
          Workshops, academic activities, celebrations and events from
          the Veterinary Pharmacist Department.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading veterinary events..." />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setPreviewImage(event)}
                  className="group relative bg-white rounded-2xl border overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: "#BBF7D0",
                  }}
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div
                    className="absolute top-3 left-3 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow"
                    style={{
                      backgroundColor: "#15803D",
                    }}
                  >
                    {event.date}
                  </div>

                  <div className="p-3 text-center">
                    <h3
                      className="text-xs font-black truncate"
                      style={{ color: "#15803D" }}
                    >
                      {event.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-12">
                <p
                  className="font-medium"
                  style={{ color: "#15803D" }}
                >
                  No Veterinary Pharmacist events available.
                </p>
              </div>
            )}

            {/* VIEW ALL BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/programs/veterinary-pharmacist/events"
                className="text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg,#15803D 0%,#22C55E 100%)",
                }}
              >
                View All Events →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(21,128,61,0.92)",
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 z-10 px-3 py-1 text-[9px] font-black text-white rounded-full uppercase tracking-widest transition"
              style={{
                backgroundColor: "#15803D",
              }}
            >
              Close
            </button>

            <img
              src={previewImage.image}
              alt={previewImage.title}
              className="w-full max-h-[50vh] object-cover"
            />

            <div className="p-5">
              <span
                className="text-[9px] font-black uppercase tracking-widest"
                style={{ color: "#22C55E" }}
              >
                {previewImage.date}
              </span>

              <h3
                className="text-xl font-black mt-2"
                style={{ color: "#15803D" }}
              >
                {previewImage.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Veterinary Pharmacist Department
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;