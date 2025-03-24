
import React from "react";
import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
} from "@heroui/react";
import { cn } from "@/lib/utils";

// Card
interface CardProps extends React.ComponentPropsWithoutRef<typeof HeroCard> {
  className?: string;
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, ...props }, ref) => {
  return (
    <HeroCard
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
Card.displayName = "Card";

// CardHeader
interface CardHeaderProps extends React.ComponentPropsWithoutRef<typeof HeroCardHeader> {
  className?: string;
}

const CardHeader = React.forwardRef<
  HTMLDivElement,
  CardHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <HeroCardHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

// CardTitle
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  CardTitleProps
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
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
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
interface CardContentProps extends React.ComponentPropsWithoutRef<typeof HeroCardBody> {
  className?: string;
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  CardContentProps
>(({ className, ...props }, ref) => {
  return (
    <HeroCardBody
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

// CardFooter
interface CardFooterProps extends React.ComponentPropsWithoutRef<typeof HeroCardFooter> {
  className?: string;
}

const CardFooter = React.forwardRef<
  HTMLDivElement,
  CardFooterProps
>(({ className, ...props }, ref) => {
  return (
    <HeroCardFooter
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
