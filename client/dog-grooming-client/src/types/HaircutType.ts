export interface HaircutType {
  id: number;
  userId: number;
  type: "small" | "medium" | "large";
  price: number;
  durationMinutes: number;
  scheduledAt: string;
  createdAt: string;
}
