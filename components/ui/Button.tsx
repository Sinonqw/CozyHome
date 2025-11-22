import { ReactNode, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonClassess> {
  children: ReactNode;
}

const ButtonClassess = cva(
  "rounded-xl px-3 py-1 cursor-pointer font-semibold transition",
  {
    variants: {
      intent: {
        primary: "bg-[#7C5840] hover:bg-[#C19673] ",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const Button = ({ children, intent, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={clsx(ButtonClassess({ intent }), className)}>
      {children}
    </button>
  );
};

export default Button;
