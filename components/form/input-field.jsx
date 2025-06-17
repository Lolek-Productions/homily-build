import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * InputField component that renders a labeled input with optional description and error message.
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the input
 * @param {string} props.name - Name attribute for the input
 * @param {string} props.value - Current value of the input
 * @param {Function} props.onChange - Change handler function
 * @param {string} [props.description] - Optional description text below the input
 * @param {string} [props.error] - Optional error message to display
 * @param {boolean} [props.required] - Whether the input is required
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.inputProps] - Additional props to spread onto the input element
 * @returns {JSX.Element}
 */
export function InputField({
  label,
  name,
  value,
  onChange,
  description,
  error,
  required = false,
  className,
  ...inputProps
}) {
  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : description ? `${name}-description` : undefined}
        {...inputProps}
      />
      {description && (
        <p id={`${name}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
