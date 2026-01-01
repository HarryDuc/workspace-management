import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center gap-5">
      <Link href="/sign-in">
        <Button className="bg-blue-500 text-white">Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button className="bg-blue-500 text-white">Sign Up</Button>
      </Link>
    </div>
  );
}
