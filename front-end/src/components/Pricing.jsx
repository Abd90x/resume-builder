import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Basic resume-building tools at no cost",
      features: [
        "Access to limited templates",
        "Basic customization options",
        "Download in PDF format",
        "Watermark on resume",
      ],
    },
    {
      name: "Premium",
      price: "$15",
      description: "Enhanced tools and more template options",
      features: [
        "Access to all templates",
        "Advanced customization options",
        "Download in PDF and Word formats",
        "No watermark",
        "Priority customer support",
      ],
    },
    {
      name: "Professional",
      price: "$25",
      description: "Full suite for career advancement",
      features: [
        "Access to exclusive templates",
        "All customization options",
        "Download in multiple formats (PDF, Word, JPG)",
        "No watermark",
        "Access to cover letter builder",
        "Interview tips and resources",
        "Dedicated customer support",
      ],
    },
  ];

  return (
    <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                Choose Your Plan
              </h1>
              <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
                Select the perfect plan for your needs. Upgrade or downgrade at
                any time.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <Card key={tier.name} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="mb-auto">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.name !== "Enterprise" && (
                    <span className="text-zinc-500 dark:text-zinc-400">
                      /month
                    </span>
                  )}
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="text-primary mr-2 h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {tier.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
