export interface Appointment {
  id: number;
  userId: number;
  userName: string;
  haircutType: "small" | "medium" | "large";
  price: number;
  durationMinutes: number;
  scheduledAt: string;
  createdAt: string;
  discountApplied: boolean;
}
