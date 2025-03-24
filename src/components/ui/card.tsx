
import React from "react";
import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
} from "@heroui/react";
import { cn } from "@/lib/utils";

// Card
const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCard>
>((props, ref) => {
  return <HeroCard ref={ref} {...props} />;
});
Card.displayName = "Card";

// CardHeader
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCardHeader>
>((props, ref) => {
  return <HeroCardHeader ref={ref} {...props} />;
});
CardHeader.displayName = "CardHeader";

// CardTitle
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

// CardDescription
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-default-500", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

// CardContent
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCardBody>
>((props, ref) => {
  return <HeroCardBody ref={ref} {...props} />;
});
CardContent.displayName = "CardContent";

// CardFooter
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCardFooter>
>((props, ref) => {
  return <HeroCardFooter ref={ref} {...props} />;
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
