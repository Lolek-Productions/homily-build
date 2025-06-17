"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "./button";

import { getAllRolesDb, createRole } from "@/app/(main)/people/roles-actions";

export function RoleCombobox({ roles, setRoles }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setInput("");
    setOpen(false);
  }

  async function handleAdd() {
    if (!input) return;
    // Check if already exists in options
    const existing = options.find((opt) => opt.name.toLowerCase() === input.toLowerCase());
    if (existing) {
      await handleSelect(existing);
      return;
    }
    // Create new role in DB
    try {
      const newRole = await createRole(input);
      setOptions([...options, newRole]);
      await handleSelect(newRole);
    } catch (e) {
      // Optionally handle error
    }
  }

  function handleRemove(roleObj) {
    setRoles(roles.filter((r) => r.id !== roleObj.id));
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
      <Button type="button" variant="outline" onClick={() => setOpen((o) => !o)}>
        Add Role
      </Button>
      {open && (
        <div className="relative mt-2">
          <input
            className="border rounded px-2 py-1 w-48"
            placeholder="Type or select a role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            list="role-options"
            onKeyDown={async (e) => {
              if (e.key === "Enter") await handleAdd();
            }}
          />
          <datalist id="role-options">
            {options.filter((opt) => !roles.find((r) => r.id === opt.id)).map((opt) => (
              <option key={opt.id} value={opt.name} />
            ))}
          </datalist>
          <Button
            type="button"
            className="ml-2"
            size="sm"
            onClick={handleAdd}
            disabled={!input}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
