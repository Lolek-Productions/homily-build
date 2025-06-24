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
  const showResponseToast = (result: { success: boolean; message: string; data?: unknown }) => {
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

  const showErrorToast = (error: Error | { message?: string } | string | unknown) => {
    let message = "An unexpected error occurred";
    
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
      message = error.message;
    }
    
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
