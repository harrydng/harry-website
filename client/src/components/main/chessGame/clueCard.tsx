type ClueCardProps = {
  openingName: string;
  openingClue?: string;
  mode: "intro" | "unlocked";
  onPlay?: () => void;
  onSkip?: () => void;
  onEnter?: () => void;
};

export default function ClueCard({
  openingName,
  openingClue,
  mode,
  onPlay,
  onSkip,
  onEnter,
}: ClueCardProps) {
  const isUnlocked = mode === "unlocked";

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 backdrop-blur-[2px]">
      <div className="w-[430px] rounded-2xl border border-white/10 bg-[#111111]/95 px-8 py-9 text-center shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#b89b63]/40 bg-[#b89b63]/10 text-[#d6b36a]">
          {isUnlocked ? "♔" : "♞"}
        </div>

        <p className="mb-3 text-xs tracking-[0.28em] text-[#b89b63]">
          {isUnlocked ? "ACCESS GRANTED" : "CHESS GATE"}
        </p>

        <h2 className="font-serif text-4xl text-white">
          {isUnlocked ? "Position unlocked." : "Unlock the board"}
        </h2>

        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <p className="text-sm text-[#d6b36a]">Clue: {openingName}</p>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="mx-auto mb-7 max-w-[320px] text-sm leading-6 text-white/55">
          {isUnlocked
            ? "Welcome, strategist. The board is open for the next 20 minutes."
            : openingClue || "Play the correct opening sequence to enter."}
        </p>

        {isUnlocked ? (
          <button
            onClick={onEnter}
            className="w-full rounded-xl bg-[#b89b63] px-5 py-3 font-medium text-black transition hover:brightness-110"
          >
            Enter Portfolio
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onPlay}
              className="rounded-xl bg-[#b89b63] px-5 py-3 font-medium text-black transition hover:brightness-110"
            >
              Play
            </button>

            <button
              onClick={onSkip}
              className="rounded-xl border border-white/15 px-5 py-3 text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}