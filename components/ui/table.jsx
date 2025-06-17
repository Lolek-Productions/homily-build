import * as React from "react";

export function Table({ children, className = "" }) {
  return (
    <div className={`w-full overflow-x-auto rounded-md border ${className}`}>
      <table className="w-full text-sm text-left">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead className="bg-muted/50">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr className="border-b last:border-0">{children}</tr>;
}

export function TableHeader({ children }) {
  return <th className="px-4 py-2 font-semibold">{children}</th>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}
