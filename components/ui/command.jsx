"use client";
import * as React from "react";

export function Command({ children }) {
  return <div className="p-2">{children}</div>;
}
Command.displayName = "Command";

import { Search } from "lucide-react";

export function CommandInput({ placeholder, className, value, onValueChange, onKeyDown }) {
  return (
    <div className={"relative w-full " + (className || "")}> 
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="w-4 h-4" aria-hidden="true" />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="pl-8 pr-2 py-1 w-full bg-transparent outline-none border-b"
        value={value}
        onChange={e => onValueChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label={placeholder}
      />
    </div>
  );
}
CommandInput.displayName = "CommandInput";

export function CommandList({ children }) {
  return <div className="max-h-48 overflow-auto">{children}</div>;
}
CommandList.displayName = "CommandList";

export function CommandEmpty({ children }) {
  return <div className="text-gray-400 px-2 py-1">{children}</div>;
}
CommandEmpty.displayName = "CommandEmpty";

export function CommandGroup({ children }) {
  return <div className="py-1">{children}</div>;
}
CommandGroup.displayName = "CommandGroup";

export function CommandItem({ children, value, onSelect }) {
  return (
    <div
      className="flex items-center px-2 py-1 cursor-pointer hover:bg-muted"
      tabIndex={0}
      onClick={() => onSelect && onSelect(value)}
      onKeyDown={e => {
        if (e.key === "Enter" && onSelect) onSelect(value);
      }}
    >
      {children}
    </div>
  );
}
CommandItem.displayName = "CommandItem";
