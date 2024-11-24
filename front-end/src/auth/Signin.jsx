import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Signin;
