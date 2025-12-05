//   import React, { useMemo, useState, useEffect } from "react";
//   import {
//     Calendar as BigCalendar,
//     Views,
//     dateFnsLocalizer,
//   } from "react-big-calendar";
//   import format from "date-fns/format";
//   import parse from "date-fns/parse";
//   import startOfWeek from "date-fns/startOfWeek";
//   import getDay from "date-fns/getDay";
//   import enUS from "date-fns/locale/en-US";
//   import "react-big-calendar/lib/css/react-big-calendar.css";
//   import "../styles/calander.css";
//   import axios from "axios";

//   const locales = { "en-US": enUS };
//   const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
//     getDay,
//     locales,
//   });

//   function normalizeEvents(raw = []) {
//   if (!Array.isArray(raw)) return [];
//   return raw.map((ev) => {
//     const start = ev.start ? new Date(ev.start) : null;
//     const end = ev.end ? new Date(ev.end) : null;
//     return { ...ev, start, end };
//   });
// }

//   function CustomToolbar({ localizer, label, onNavigate, onView, view }) {
//     const goToToday = () => onNavigate("TODAY");
//     return (
//       <div className="rb-toolbar">
//         <div className="rb-left">
//           <button className="rb-btn" onClick={() => onNavigate("PREV")}>
//             ←
//           </button>
//           <button className="rb-btn rb-primary" onClick={goToToday}>
//             Today
//           </button>
//           <button className="rb-btn" onClick={() => onNavigate("NEXT")}>
//             →
//           </button>
//         </div>

//         <div className="rb-center">
//           <div className="rb-label">{label}</div>
//         </div>

//         <div className="rb-right">
//           <select
//             className="rb-select"
//             onChange={(e) => onView(e.target.value)}
//             value={view}
//           >
//             <option value={Views.MONTH}>Month</option>
//             <option value={Views.WEEK}>Week</option>
//             <option value={Views.DAY}>Day</option>
//           </select>
//         </div>
//       </div>
//     );
//   }

//   function Event({ event }) {
//     const timeStr = event.allDay
//       ? "All day"
//       : `${format(new Date(event.start), "p")} - ${format(
//           new Date(event.end),
//           "p"
//         )}`;
//     return (
//       <div className="rb-event-card" style={{ background: event.color }}>
//         <div className="rb-ev-title">{event.title}</div>
//         <div className="rb-ev-time">
//           {event.role ? event.role + " • " : ""}
//           {/* {timeStr} */}
//         </div>
//       </div>
//       // <div>{event.title}</div>
//     );
//   }

//   export default function CalendarPage({ events: backendEvents = null }) {
//     const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";
//     console.log("API_URL ->", API_URL);

//     // const defaultEvents = useMemo(() => {
//     //   return async () => {
//     //     const res = await axios.get(`${API_URL}/calendar/data`);
//     //     // console.log(`${API_URL}/calendar/data`, res.data);
//     //     return res.data;
//     //   };
//     // }, []);

//     const [events, setEvents] = useState([]);
//     // console.log(backendEvents,defaultEvents)
//     const [view, setView] = useState(Views.WEEK);
//     const [date, setDate] = useState(new Date());

//     const [moreModalOpen, setMoreModalOpen] = useState(false);
//     const [moreModalEvents, setMoreModalEvents] = useState([]);
//     const [moreModalDate, setMoreModalDate] = useState(null);

//     useEffect(() => {
//       function onKey(e) {
//         if (e.key === "Escape") setMoreModalOpen(false);
//       }
//       window.addEventListener("keydown", onKey);
//       return () => window.removeEventListener("keydown", onKey);
//     }, []);

//     useEffect(()=>{
//       const fetch = async () => {
//         const res = await axios.get(`${API_URL}/calendar/data`);
//         console.log(normalizeEvents(res.data));
//         setEvents(normalizeEvents(res.data));
//       };
//       fetch()
//     },[])

//     function eventStyleGetter(event) {
//       const style = {
//         background: event.color || "linear-gradient(135deg,#60a5fa,#a78bfa)",
//         border: "0px",
//         color: "#ffffffff",
//         padding: "6px",
//         borderRadius: 8,
//         boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
//         transition: "transform .12s ease, box-shadow .12s ease",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         // width: "120px",
//       };
//       // console.log(view)
//       return { style };
//     }

//     function handleShowMore(moreEvents, clickedDate) {
//       setMoreModalEvents(moreEvents);
//       setMoreModalDate(clickedDate);
//       setMoreModalOpen(true);
//     }

//     return (
//       <>
//         <div className="calendar-page">
//           <div className="calendar-card">
//             <BigCalendar
//               localizer={localizer}
//               events={events}
//               startAccessor="start"
//               endAccessor="end"
//               style={{ height: "78vh" }}
//               views={[Views.MONTH, Views.WEEK, Views.DAY]}
//               defaultView={Views.WEEK}
//               components={{
//                 event: Event,
//                 toolbar: CustomToolbar,
//               }}
//               onView={(v) => setView(v)}
//               view={view}
//               onNavigate={(newDate) => setDate(newDate)}
//               date={date}
//               selectable
//               popup={false}
//               onShowMore={(events, date) => handleShowMore(events, date)}
//               eventPropGetter={eventStyleGetter}
//               step={15}
//               timeslots={2}
//             />
//           </div>

//           <aside className="calendar-side">
//             <div className="side-card">
//               <h4>Scheduled Interviews</h4>
//               <div className="side-sub muted">Next {events.length} scheduled</div>

//               <div className="side-list">
//                 {events
//                   .slice()
//                   .sort((a, b) => new Date(a.start) - new Date(b.start))
//                   .slice(0, 7)
//                   .map((ev) => (
//                     <div className="side-row" key={ev.id}>
//                       <div className="side-avatar" aria-hidden>
//                         {ev.title
//                           .split(" ")
//                           .map((p) => p[0])
//                           .slice(0, 2)
//                           .join("")
//                           .toUpperCase()}
//                       </div>
//                       <div className="side-meta">
//                         <div className="side-name">{ev.title}</div>
//                         <div className="side-role muted">{ev.role}</div>
//                       </div>
//                       <div className="side-time muted">
//                         {format(new Date(ev.start), "MMM d, p")}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </aside>
//         </div>

//         {moreModalOpen && (
//           <div
//             className="qb-modal-overlay"
//             onClick={(e) => {
//               if (e.target.classList.contains("qb-modal-overlay")) {
//                 setMoreModalOpen(false);
//               }
//             }}
//           >
//             <div className="qb-modal" role="dialog" aria-modal="true">
//               <div className="qb-modal-head">
//                 <div className="qb-modal-title">
//                   {moreModalDate
//                     ? format(new Date(moreModalDate), "EEEE, MMM d")
//                     : "Events"}
//                 </div>
//                 <button
//                   className="qb-modal-close"
//                   onClick={() => setMoreModalOpen(false)}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="qb-modal-body">
//                 {moreModalEvents.length === 0 ? (
//                   <div className="qb-empty">No events</div>
//                 ) : (
//                   moreModalEvents.map((ev) => (
//                     <div
//                       key={ev.id}
//                       className="rb-event-card qb-modal-event"
//                       style={{ background: ev.color, color: "#fff" }}
//                       role="button"
//                       tabIndex={0}
//                     >
//                       <div className="rb-ev-title">{ev.title}</div>
//                       <div className="rb-ev-time">
//                         {ev.role ? ev.role + " • " : ""}
//                         {format(new Date(ev.start), "p")} -{" "}
//                         {format(new Date(ev.end), "p")}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

import React, { useMemo, useState, useEffect } from "react";
import {
  Calendar as BigCalendar,
  Views,
  dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calander.css";
import axios from "axios";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

function normalizeEvents(raw = []) {
  if (!Array.isArray(raw)) return [];
  return raw.map((ev) => {
    const start = ev.start ? new Date(ev.start) : null;
    const end = ev.end ? new Date(ev.end) : null;
    return { ...ev, start, end };
  });
}

function CustomToolbar({ label, onNavigate, onView, view }) {
  return (
    <div className="rb-toolbar">
      <div className="rb-left">
        <button className="rb-btn" onClick={() => onNavigate("PREV")}>
          ←
        </button>
        <button className="rb-btn rb-primary" onClick={() => onNavigate("TODAY")}>
          Today
        </button>
        <button className="rb-btn" onClick={() => onNavigate("NEXT")}>
          →
        </button>
      </div>

      <div className="rb-center">
        <div className="rb-label">{label}</div>
      </div>

      <div className="rb-right">
        <select className="rb-select" onChange={(e) => onView(e.target.value)} value={view}>
          <option value={Views.MONTH}>Month</option>
          <option value={Views.WEEK}>Week</option>
          <option value={Views.DAY}>Day</option>
        </select>
      </div>
    </div>
  );
}

function Event({ event }) {
  return (
    <div className="rb-event-card" style={{ background: event.color }}>
      <div className="rb-ev-title">{event.title}</div>
      <div className="rb-ev-time">{event.role ? event.role + " • " : ""}</div>
    </div>
  );
}

export default function CalendarPage({ events: backendEvents = null }) {
  const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:4000";

  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [moreModalEvents, setMoreModalEvents] = useState([]);
  const [moreModalDate, setMoreModalDate] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMoreModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${API_URL}/calendar/data`);
      setEvents(normalizeEvents(res.data));
    };
    fetch();
  }, []);

  function eventStyleGetter(event) {
    const style = {
      background: event.color || "linear-gradient(135deg,#60a5fa,#a78bfa)",
      border: "0px",
      color: "#ffffff",
      padding: "6px",
      borderRadius: 8,
      boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
      transition: "transform .12s ease, box-shadow .12s ease",
      overflow: "hidden",
      whiteSpace: "nowrap",
    };
    return { style };
  }

  function handleShowMore(moreEvents, clickedDate) {
    setMoreModalEvents(moreEvents);
    setMoreModalDate(clickedDate);
    setMoreModalOpen(true);
  }

  return (
    <>
      <div className="calendar-page">
        <div className="calendar-card">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "78vh" }}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={Views.WEEK}
            components={{
              event: Event,
              toolbar: CustomToolbar,
            }}
            onView={(v) => setView(v)}
            view={view}
            onNavigate={(newDate) => setDate(newDate)}
            date={date}
            selectable
            popup={false}
            onShowMore={(events, date) => handleShowMore(events, date)}
            eventPropGetter={eventStyleGetter}
            step={15}
            timeslots={2}
          />
        </div>

        <aside className="calendar-side">
          <div className="side-card">
            <h4>Scheduled Interviews</h4>
            <div className="side-sub muted">Next {events.length} scheduled</div>

            <div className="side-list">
              {events
                .slice()
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .slice(0, 7)
                .map((ev) => (
                  <div className="side-row" key={ev.id}>
                    <div className="side-avatar" aria-hidden>
                      {ev.title
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="side-meta">
                      <div className="side-name">{ev.title}</div>
                      <div className="side-role muted">{ev.role}</div>
                    </div>
                    <div className="side-time muted">
                      {format(new Date(ev.start), "MMM d, p")}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </aside>
      </div>

      {moreModalOpen && (
        <div
          className="qb-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("qb-modal-overlay")) {
              setMoreModalOpen(false);
            }
          }}
        >
          <div className="qb-modal" role="dialog" aria-modal="true">
            <div className="qb-modal-head">
              <div className="qb-modal-title">
                {moreModalDate ? format(new Date(moreModalDate), "EEEE, MMM d") : "Events"}
              </div>
              <button className="qb-modal-close" onClick={() => setMoreModalOpen(false)}>
                ✕
              </button>
            </div>

            <div className="qb-modal-body">
              {moreModalEvents.length === 0 ? (
                <div className="qb-empty">No events</div>
              ) : (
                moreModalEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rb-event-card qb-modal-event"
                    style={{ background: ev.color, color: "#fff" }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="rb-ev-title">{ev.title}</div>
                    <div className="rb-ev-time">
                      {ev.role ? ev.role + " • " : ""}
                      {format(new Date(ev.start), "p")} - {format(new Date(ev.end), "p")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
