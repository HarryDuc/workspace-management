import { useAuth } from "@/src/provider/auth-context";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return navigation.push("/dashboard");
  }

  return {children};
};

export default AuthLayout;
