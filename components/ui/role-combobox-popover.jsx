"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getAllRolesDb, createRole } from "@/app/(main)/people/roles-actions";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";

export function RoleComboboxPopover({ roles, setRoles }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    async function fetchRoles() {
      try {
        const dbRoles = await getAllRolesDb();
        if (mounted) setOptions(dbRoles);
      } catch (e) {
        if (mounted) setOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchRoles();
    return () => { mounted = false; };
  }, []);

  async function handleSelect(roleObj) {
    if (!roles.find((r) => r.id === roleObj.id)) {
      setRoles([...roles, roleObj]);
    }
    setSelected(roleObj);
    setOpen(false);
    setInput(""); // Always clear input after selection
  }

  async function handleAdd() {
    if (!input) return;
    const existing = options.find((opt) => opt.name.toLowerCase() === input.toLowerCase());
    if (existing) {
      await handleSelect(existing);
      return;
    }
    try {
      const newRole = await createRole(input);
      setOptions([...options, newRole]);
      await handleSelect(newRole);
      setInput("");
    } catch (e) {}
  }

  function handleRemove(roleObj) {
    setRoles(roles.filter((r) => r.id !== roleObj.id));
    if (selected && selected.id === roleObj.id) setSelected(null);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {roles.map((role) => (
          <span key={role.id} className="inline-flex items-center bg-muted px-2 py-1 rounded text-xs">
            {role.name}
            <button type="button" onClick={() => handleRemove(role)} className="ml-1 text-red-500 hover:text-red-700">&times;</button>
          </span>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Click to Add Role
            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput
              placeholder="Search or add role..."
              className="h-9"
              value={input}
              onValueChange={setInput}
              onKeyDown={async (e) => {
                if (e.key === "Enter") await handleAdd();
              }}
            />
            <CommandList>
              <CommandEmpty>No role found.</CommandEmpty>
              <CommandGroup>
                {options.filter((opt) => !roles.find((r) => r.id === opt.id)).map((opt) => (
                  <CommandItem
                    key={opt.id}
                    value={opt.name}
                    onSelect={() => handleSelect(opt)}
                  >
                    {opt.name}
                    <Check className={cn("ml-auto", selected && selected.id === opt.id ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
              {/* Create new role button */}
              {input &&
                !options.some((opt) => opt.name.toLowerCase() === input.toLowerCase()) &&
                !roles.some((r) => r.name.toLowerCase() === input.toLowerCase()) && (
                  <div className="p-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full justify-start gap-2"
                      onClick={handleAdd}
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      Create "{input}" as new role
                    </Button>
                  </div>
                )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
