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

const POST_BASIC_DEPARTMENT_ID = 2;

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

        const postBasicEvents = data
          .filter((event: any) =>
            event.departments?.some(
              (dept: any) =>
                dept.departmentId === POST_BASIC_DEPARTMENT_ID
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

        setEvents(postBasicEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
      className="pb-14"
      style={{ backgroundColor: "#DBEAFE" }}
    >
      {/* HEADER */}
      <div
        className="py-12 px-4 text-center border-b"
        style={{
          backgroundColor: "#1E40AF",
          borderColor: "#3B82F6",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          Post Basic B.Sc Nursing Events
        </h2>

        <div
          className="h-1 w-16 mx-auto rounded-full"
          style={{ backgroundColor: "#3B82F6" }}
        />

        <p className="text-blue-100 mt-4 max-w-xl mx-auto text-xs">
          Workshops, academic activities, celebrations and events from
          the Post Basic B.Sc Nursing Department.
        </p>
      </div>

      {/* GRID */}
      <div className="w-full mx-auto px-4 -mt-10">
        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <Loader text="Loading events..." />
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
                    borderColor: "#BFDBFE",
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
                      backgroundColor: "#1E40AF",
                    }}
                  >
                    {event.date}
                  </div>

                  <div className="p-3 text-center">
                    <h3
                      className="text-xs font-black truncate"
                      style={{ color: "#1E40AF" }}
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
                  style={{ color: "#1E40AF" }}
                >
                  No Post Basic B.Sc Nursing events available.
                </p>
              </div>
            )}

            {/* VIEW ALL BUTTON */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/programs/post-basic-bsc-nursing/events"
                className="text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg,#1E40AF 0%,#3B82F6 100%)",
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
            backgroundColor: "rgba(30,64,175,0.92)",
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
                backgroundColor: "#1E40AF",
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
                style={{ color: "#3B82F6" }}
              >
                {previewImage.date}
              </span>

              <h3
                className="text-xl font-black mt-2"
                style={{ color: "#1E40AF" }}
              >
                {previewImage.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Post Basic B.Sc Nursing Department
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;