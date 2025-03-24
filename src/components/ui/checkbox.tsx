
import React from "react";
import { Checkbox as HeroCheckbox } from "@heroui/react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof HeroCheckbox> {
  className?: string;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, children, ...props }, ref) => {
  return (
    <HeroCheckbox
      ref={ref}
      className={cn("peer", className)}
      {...props}
    >
      {children}
    </HeroCheckbox>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
