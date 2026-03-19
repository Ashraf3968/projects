import { Star } from "lucide-react";

const RatingStars = ({ value }) => (
  <div className="flex items-center gap-1 text-amber-300">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} size={16} fill={index < value ? "currentColor" : "none"} />
    ))}
  </div>
);

export default RatingStars;
