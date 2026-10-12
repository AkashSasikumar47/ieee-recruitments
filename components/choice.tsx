"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ieee/ui/components/select";

type ChoiceOption = { value: string; label: string };

export function Choice({
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
  label,
  className = "w-full",
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  placeholder?: string;
  required?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <Select
      value={value || undefined}
      onValueChange={onChange}
      required={required}
    >
      <SelectTrigger id={id} aria-label={label} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
