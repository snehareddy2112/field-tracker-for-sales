"use client";

import { Card } from "@/components/ui/card";

export default function GreetingCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";
  let subtitle = "Have a productive day.";

  if (hour < 12) {
    greeting = "Good Morning";
    subtitle = "Let's make today productive.";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    subtitle = "Keep the momentum going.";
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">
      <p className="text-lg opacity-90">
        {greeting} 👋
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        Welcome back
      </h1>

      <p className="mt-2 text-sm text-blue-100/90">
        {subtitle}
      </p>

      <p className="mt-4 max-w-xl text-blue-100">
        Track meetings, monitor travel,
        and manage your field work in one place.
      </p>
    </Card>
  );
}