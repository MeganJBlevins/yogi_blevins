import type { ReactNode, CSSProperties } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export default function Section({ 
  children, 
  className = "", 
  style,
  id 
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`w-full ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

