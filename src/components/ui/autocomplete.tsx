
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AutocompleteOption {
  value: string;
  label: string;
  detail?: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value: string;
  onChange: (value: string) => void;
  onOptionSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

export function Autocomplete({
  options,
  value,
  onChange,
  onOptionSelect,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  className,
  isLoading = false
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update internal state when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    if (newValue) {
      setOpen(true);
    }
  };

  const handleOptionSelect = (option: AutocompleteOption) => {
    setInputValue(option.value);
    onChange(option.value);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn("w-full pr-10", className)}
            onClick={() => options.length > 0 && setOpen(true)}
            onFocus={() => options.length > 0 && setOpen(true)}
          />
          {isLoading ? (
            <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin opacity-70" />
          ) : (
            <ChevronsUpDown 
              className="absolute right-3 top-3 h-4 w-4 shrink-0 opacity-50" 
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 w-full min-w-[200px]" 
        align="start"
        side="bottom"
        sideOffset={5}
      >
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleOptionSelect(option)}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span>{option.label}</span>
                    {option.detail && (
                      <span className="text-xs text-muted-foreground">{option.detail}</span>
                    )}
                  </div>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
