import * as React from "react";

import { cn } from "@/app/lib/utils";

export interface InputCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputCheckbox = React.forwardRef<HTMLInputElement, InputCheckboxProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={"checkbox"}
        className={cn(
          "transition-all size-4 outline-none border-none bg-primary  rounded-full cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputCheckbox.displayName = "InputCheckbox";

export { InputCheckbox };
