import { Card, CardContent } from "@/components/ui/card";

export default function ClientsSection() {
  const clients = [
    { name: "Zain", logo: "/Zain.png" },
    { name: "Indeed", logo: "/Indeed-Logo.png" },
    { name: "UJ", logo: "/UJ-LOGO-1.png" },
    { name: "glassdoor", logo: "/glassdoor.svg" },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Our Trusted Clients
          </h2>
          <p className="max-w-[700px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            We&apos;re proud to work with some of the most innovative companies
            in the industry.
          </p>
        </div>
        <div className="flex overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center space-x-8 min-w-full justify-between">
            {clients.map((client, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="flex items-center justify-center p-4 grayscale">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={120}
                    height={60}
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
