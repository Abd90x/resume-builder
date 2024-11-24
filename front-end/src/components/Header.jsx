import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white/20 backdrop-blur print:hidden border-b">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/">
          <img src="/logo.svg" alt="logo" />{" "}
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Link to="dashboard">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to="/signin">
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
