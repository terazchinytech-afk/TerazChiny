import Link from "next/link";

interface MobileBookingBarProps {
  price: number;
  bookingUrl?: string;
  tripTitle: string;
}

export const MobileBookingBar = ({
  price,
  bookingUrl,
  tripTitle,
}: MobileBookingBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
            Cena od
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-gray-900">
              {price.toLocaleString("pl-PL")}
            </span>
            <span className="text-sm font-bold text-gray-900">PLN</span>
          </div>
        </div>

        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b32a2e] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 active:scale-95 transition-transform"
          >
            Zarezerwuj
          </a>
        ) : (
          <Link
            href={`/kontakt?wyprawa=${encodeURIComponent(tripTitle)}`}
            className="bg-[#b32a2e] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 active:scale-95 transition-transform"
          >
            Zapytaj
          </Link>
        )}
      </div>
    </div>
  );
};
