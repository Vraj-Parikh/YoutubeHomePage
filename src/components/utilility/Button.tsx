import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "text-secondary",
        "hover:bg-secondary-dark-hover",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "p-2.5",
        "flex",
        "justify-center",
        "items-center",
        "size-10",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    ComponentProps<"button"> {
  className?: string;
}
function Button({ variant, size, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}

export default Button;
