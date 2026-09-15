import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display uppercase tracking-wide transition-[transform,background-color,color,box-shadow] duration-(--motion-quick) ease-(--ease-out) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-star text-paper shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_18%,transparent)] hover:bg-star-hot",
        flag: "bg-flag text-ink hover:bg-flag-hot",
        outline:
          "bg-transparent text-paper shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_28%,transparent)] hover:bg-paper/8",
        ghost: "bg-transparent text-paper hover:bg-paper/8",
        ink: "bg-paper text-ink hover:bg-cream",
      },
      size: {
        md: "h-11 px-5 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-7 text-xl",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
