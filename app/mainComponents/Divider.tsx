import { forwardRef } from "react";
import { cn } from "../lib/utils";

export interface DividerProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cn("grow h-[1px] bg-white/20", className)} />
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
