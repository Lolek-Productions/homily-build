import Link from "next/link";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { LayoutDashboard } from "lucide-react";

export async function AuthButton() {
  const { user } = await getCurrentUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Button asChild size="sm" variant="ghost">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Hey, {user.email}!</span>
        </Link>
      </Button>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
