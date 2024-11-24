import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <div className="container">
        <div className="flex items-center justify-center gap-4 ">
          <div className="flex flex-col items-start gap-4 mt-11">
            <h1 className="font-ultra text-5xl lg:text-7xl xl:text-8xl mt-6">
              Build a Stunning <span className="text-primary">Resume</span> in
              Minutes
            </h1>
            <h3 className="text-2xl text-foreground">
              Choose from professional templates, customize with ease, and get
              hired faster.
            </h3>
            <Button size="lg">
              <Link to="dashboard">Get Started</Link>
            </Button>
            <img
              src="/hero-grain.svg"
              alt="hero"
              className="absolute -z-10 opacity-35 top-1/2 -translate-y-1/2 left-0"
            />
          </div>
          <div className="hidden md:block">
            <img src="/laptop.svg" alt="hero" className="max-w-full" />
          </div>
        </div>
      </div>

      <img
        src="/lines-fade-bottom.svg"
        className="absolute top-0 left-0 -z-10 opacity-10"
      />
    </div>
  );
};

export default Hero;
