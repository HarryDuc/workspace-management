"use client";

import { Sidebar } from "@/src/layout/Sidebar";
import { CreateWorkspace } from "@/src/components/workspace/CreateWorkspace";
import type { Workspace } from "@/src/types";
import { useState } from "react";
import { Navbar } from "@/src/layout/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Navbar
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />

        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            {children}
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};
