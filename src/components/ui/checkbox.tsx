
import React from "react";
import { Checkbox as HeroCheckbox } from "@heroui/react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  [key: string]: any;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <HeroCheckbox
      ref={ref}
      className={cn("peer", className)}
      isSelected={checked}
      onValueChange={onCheckedChange}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
