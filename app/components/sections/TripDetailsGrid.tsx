import { Calendar, Clock, Users, ShieldCheck } from "lucide-react";
import { FormattedTrip } from "@/app/components/sections/calendarSection/CalendarConstants";

export const TripDetailsGrid = ({ trip }: { trip: FormattedTrip }) => {
  const details = [
    {
      icon: Calendar,
      label: "Termin",
      value: trip.dates,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Clock,
      label: "Czas",
      value: `${trip.duration} dni`,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      icon: Users,
      label: "Grupa",
      value: "Max 12 osób",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: ShieldCheck,
      label: "Gwarancja",
      value: "Pewny termin",
      color: "text-[#b32a2e]",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {details.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-center min-h-[110px] transition-transform hover:scale-[1.02] duration-300"
        >
          <div className={`p-2 rounded-xl mb-2 ${item.bg}`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>

          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              {item.label}
            </p>

            <p className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
