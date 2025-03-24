
import React from "react";
import { Checkbox as HeroCheckbox } from "@heroui/react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  className?: string;
  isSelected?: boolean;
  onValueChange?: (isSelected: boolean) => void;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, isSelected, onValueChange, ...props }, ref) => {
  return (
    <HeroCheckbox
      ref={ref}
      className={cn("peer", className)}
      isSelected={isSelected}
      onValueChange={onValueChange}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
