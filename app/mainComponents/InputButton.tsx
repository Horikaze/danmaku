import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-full text-black disabled:bg-opacity-60 ",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:opacity-60 transition-all py-1",
        outline:
          "border-white border-2 border-solid text-white hover:bg-white hover:text-black transition-all py-0.5",
      },
      size: {
        default: "px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonInput = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonInput.displayName = "Divider";

export { ButtonInput };
