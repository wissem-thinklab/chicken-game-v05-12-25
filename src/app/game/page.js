import ChickenGame from "@/components/game/ChickenGame";

export default function GamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-6xl md:text-8xl font-black mb-10 bg-linear-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
        CHICKEN CRASH
      </h1>
      <ChickenGame />
    </main>
  );
}