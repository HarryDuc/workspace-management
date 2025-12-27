"use client";

import { useEffect } from "react";
import { useAuth } from "@/src/provider/AuthContext";
import { useRouter } from "next/navigation";
import { Loader } from "../components/Loader";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default RootLayout;
