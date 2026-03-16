import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

function ThankYouFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1628]">
      <p className="text-[#00FCB8]">Loading...</p>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouFallback />}>
      <ThankYouClient />
    </Suspense>
  );
}
