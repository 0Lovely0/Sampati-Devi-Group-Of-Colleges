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

const TARGET_DEPARTMENT = "Multipurpose Health Worker";

const MPHW_THEME = {
  primary: "#EA580C",
  secondary: "#FFEDD5",
  accent: "#F97316",
};

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

        const mphwEvents = data
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

        setEvents(mphwEvents);
      } catch (error) {
        console.error("Failed to load MPHW events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
      className="pb-14"
      style={{ backgroundColor: MPHW_THEME.secondary }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center border-b"
        style={{
          background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
          borderColor: MPHW_THEME.accent,
        }}
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
          MPHW Events
        </h2>

        <div
          className="h-1 w-16 mx-auto rounded-full"
          style={{ backgroundColor: MPHW_THEME.accent }}
        />

        <p className="text-orange-100 mt-4 max-w-2xl mx-auto text-lg">
          Workshops, field visits, health awareness programs, community
          outreach activities, practical training sessions, seminars and
          academic events from the Multipurpose Health Worker Department.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading MPHW events..." />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {events.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  onClick={() => setPreviewImage(event)}
                  className="group relative bg-white rounded-2xl border overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: MPHW_THEME.secondary,
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
                      backgroundColor: MPHW_THEME.primary,
                    }}
                  >
                    {event.date}
                  </div>

                  <div className="p-3 text-center">
                    <h3
                      className="text-xs font-black truncate"
                      style={{ color: MPHW_THEME.primary }}
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
                  style={{ color: MPHW_THEME.primary }}
                >
                  No MPHW events available.
                </p>
              </div>
            )}

            {/* VIEW ALL BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/programs/multipurpose-health-worker/events"
                className="text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition shadow-lg hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${MPHW_THEME.primary} 0%, ${MPHW_THEME.accent} 100%)`,
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
            backgroundColor: "rgba(234,88,12,0.92)",
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
                backgroundColor: MPHW_THEME.primary,
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
                style={{ color: MPHW_THEME.accent }}
              >
                {previewImage.date}
              </span>

              <h3
                className="text-xl font-black mt-2"
                style={{ color: MPHW_THEME.primary }}
              >
                {previewImage.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Multipurpose Health Worker Department
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;