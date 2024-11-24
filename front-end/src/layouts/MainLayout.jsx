import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
};

export default MainLayout;
