
import React, { createContext, useContext, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";

interface CollapsibleContextType {
  open: boolean;
  toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

interface CollapsibleProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Collapsible = ({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  ...props
}: CollapsibleProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  const toggle = () => {
    if (isControlled) {
      onOpenChange?.(!open);
    } else {
      setUncontrolledOpen(!open);
    }
  };
  
  return (
    <CollapsibleContext.Provider value={{ open, toggle }}>
      <div {...props}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible must be used within a Collapsible");
  }
  return context;
};

const CollapsibleTrigger = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { toggle } = useCollapsible();
  
  return (
    <button type="button" onClick={toggle} {...props}>
      {children}
    </button>
  );
};

const CollapsibleContent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open } = useCollapsible();
  
  if (!open) return null;
  
  return (
    <div {...props}>
      {children}
    </div>
  );
};

// Convenience wrapper for HeroUI Accordion
const HeroCollapsible = ({ children, ...props }: React.ComponentProps<typeof Accordion>) => {
  return (
    <Accordion {...props}>
      {children}
    </Accordion>
  );
};

const HeroCollapsibleItem = ({ children, ...props }: React.ComponentProps<typeof AccordionItem>) => {
  return (
    <AccordionItem {...props}>
      {children}
    </AccordionItem>
  );
};

export { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent,
  HeroCollapsible as Accordion,
  HeroCollapsibleItem as AccordionItem
};
