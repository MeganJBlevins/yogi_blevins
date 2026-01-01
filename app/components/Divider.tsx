interface DividerProps {
  className?: string;
  flipped?: boolean;
}

export default function Divider({ className = "", flipped = false }: DividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <img
        src="/divider-svg.svg"
        alt=""
        className={`w-full h-auto block ${flipped ? "rotate-180" : ""}`}
      />
    </div>
  );
}

