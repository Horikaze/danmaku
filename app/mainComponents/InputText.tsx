import * as React from "react";

import { cn } from "@/app/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "outline-white/20 focus:outline-white transition-all outline-none border-none bg-primary py-1.5 px-4 rounded-md",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputText.displayName = "InputText";

export { InputText };
