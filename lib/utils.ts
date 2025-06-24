import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// useApiToast hook for API feedback as per user rules
export function useApiToast() {
  const showResponseToast = (result: { success: boolean; message: string; data?: any }) => {
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const showErrorToast = (error: any) => {
    const message = error?.message || error?.toString() || "An unexpected error occurred";
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  return {
    showResponseToast,
    showErrorToast,
  };
}
