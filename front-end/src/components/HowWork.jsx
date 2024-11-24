import React from "react";

const HowWork = () => {
  return (
    <section className="container flex flex-col gap-4 py-28">
      <h1 className="text-3xl">How it's work</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-8">
        <div className="relative flex items-center rounded-lg px-8 py-8 border bg-primary hover:bg-[url(/card-grain.svg)] object-center transition-all duration-700">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl text-white font-semibold pe-20">
              Choose a Template
            </h2>
            <img
              src="/template.svg"
              alt="template"
              className="w-36 absolute right-1 drop-shadow-lg"
            />
          </div>
        </div>

        <div className="relative flex items-center rounded-lg px-8 py-8 border bg-[#353535] hover:bg-[url(/card-grain.svg)] object-center transition-all duration-700">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl text-white font-semibold pe-20">
              Customize Your Details
            </h2>
            <img
              src="/cv-hero-4.svg"
              alt="template"
              className="w-36 absolute right-0 md:-right-6 drop-shadow-lg"
            />
          </div>
        </div>

        <div className="relative flex items-center rounded-lg px-8 py-8 border bg-primary hover:bg-[url(/card-grain.svg)] object-center transition-all duration-700">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl text-white font-semibold pe-20">
              Download & Share
            </h2>
            <img
              src="/cv-hero-3.svg"
              alt="template"
              className="w-36 absolute right-0 md:-right-7 drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
