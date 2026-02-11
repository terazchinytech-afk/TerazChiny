// sections/calendarSection/CalendarConstants.ts

export const MONTHS_BASE = [
  { label: "Styczeń", value: "STY" },
  { label: "Luty", value: "LUT" },
  { label: "Marzec", value: "MAR" },
  { label: "Kwiecień", value: "KWI" },
  { label: "Maj", value: "MAJ" },
  { label: "Czerwiec", value: "CZE" },
  { label: "Lipiec", value: "LIP" },
  { label: "Sierpień", value: "SIE" },
  { label: "Wrzesień", value: "WRZ" },
  { label: "Październik", value: "PAŹ" },
  { label: "Listopad", value: "LIS" },
  { label: "Grudzień", value: "GRU" },
];

// Definition moved here for global access
export interface FormattedTrip {
  id: string;
  year: number;
  month: string;
  day: string;
  dates: string;
  duration: string;
  title: string;
  region: string;
  description: string;
  price: string;
  spots: string;
  image: string;
  slug: string;
}

export interface CalendarStripProps {
  selectedYear: number;
  selectedMonth: string;
  onYearChange: (year: number) => void;
  onMonthSelect: (month: string) => void;
  events: FormattedTrip[]; // Added this prop
}
