"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthContext";

export const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
