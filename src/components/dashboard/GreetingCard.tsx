"use client";

interface GreetingCardProps {
  status?: string;
}

export default function GreetingCard({
  status,
}: GreetingCardProps) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  let title = `${greeting} 👋`;
  let subtitle =
    "Ready to begin today's field visits?";

  if (status === "ACTIVE") {
    title = "🌞 Day In Progress";
    subtitle =
      "Your workday is active. Don't forget to log every customer interaction.";
  }

  if (status === "COMPLETED") {
    title = "🎉 Great Work Today!";
    subtitle =
      "Today's work has been completed successfully. Have a safe journey home.";
  }

  return (
    <div className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white shadow">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="mt-2 text-blue-100">
        {subtitle}
      </p>
    </div>
  );
}