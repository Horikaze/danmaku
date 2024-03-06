import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva("rounded-full text-black", {
  variants: {
    variant: {
      default: "bg-white text-black",
      outline:
        "border-white border-2 border-solid text-white hover:bg-white hover:text-black transition-all",
    },
    size: {
      default: "py-1 px-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

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
