import MainLayout from "@/src/layout/MainLayout";

export default function MainLayoutApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <MainLayout>{children}</MainLayout>
  );
};
