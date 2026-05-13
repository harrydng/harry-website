import { useState } from "react";
import ClueCard from "./clueCard";
import { openings } from "../../../data/openings";
import type { ChessOpening } from "../../../data/openings"; 

type PieceColor = "white" | "black";
type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

type Piece = {
  type: PieceType;
  color: PieceColor;
};

type BoardState = Record<string, Piece | null>;

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

function getRandomOpening(): ChessOpening {
  const randomIndex = Math.floor(Math.random() * openings.length);
  return openings[randomIndex];
}

function getPieceImage(piece: Piece | null) {
  if (!piece) return null;

  return `/chess-pieces/${piece.color}-${piece.type}.svg`;
}

function playMoveSound() {
  const audio = new Audio("/sound/move.mp3");
  audio.volume = 0.45;
  audio.play().catch(() => {});
}

function playCaptureSound() {
  const audio = new Audio("/sound/capture.mp3");
  audio.volume = 0.45;
  audio.play().catch(() => {});
}

function createInitialBoard(): BoardState {
  const board: BoardState = {};

  for (const rank of ranks) {
    for (const file of files) {
      board[`${file}${rank}`] = null;
    }
  }

  const backRank: PieceType[] = [
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",
  ];

  files.forEach((file, index) => {
    board[`${file}1`] = { type: backRank[index], color: "white" };
    board[`${file}2`] = { type: "pawn", color: "white" };

    board[`${file}8`] = { type: backRank[index], color: "black" };
    board[`${file}7`] = { type: "pawn", color: "black" };
  });

  return board;
}

export default function ChessBoard() {
  const [opening] = useState<ChessOpening>(() => getRandomOpening());
  const solution = opening.moves;

  const [board, setBoard] = useState<BoardState>(() => createInitialBoard());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [status, setStatus] = useState("White to move.");
  const [hasStarted, setHasStarted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSquareClick = (square: string) => {
    if (!hasStarted || unlocked) return;

    const piece = board[square];

    if (!selectedSquare) {
      if (!piece) return;

      setSelectedSquare(square);
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    attemptMove(selectedSquare, square);
  };

  const attemptMove = (from: string, to: string) => {
    const expectedMove = solution[currentMoveIndex];
    const movingPiece = board[from];
    const capturedPiece = board[to];

    if (!movingPiece) {
      setSelectedSquare(null);
      return;
    }

    const isCorrectMove =
      expectedMove && expectedMove.from === from && expectedMove.to === to;

    if (!isCorrectMove) {
      setStatus("Wrong move. Try again.");
      setSelectedSquare(null);
      return;
    }

    if (capturedPiece) {
      playCaptureSound();
    } else {
      playMoveSound();
    }

    const updatedBoard = {
      ...board,
      [to]: movingPiece,
      [from]: null,
    };

    const updatedHistory = [...moveHistory, expectedMove.notation];
    const nextMoveIndex = currentMoveIndex + 1;

    setBoard(updatedBoard);
    setMoveHistory(updatedHistory);
    setCurrentMoveIndex(nextMoveIndex);
    setSelectedSquare(null);

    if (nextMoveIndex === solution.length) {
      setStatus("Opening completed.");
      setUnlocked(true);

      localStorage.setItem(
        "portfolio_access",
        JSON.stringify({
          unlocked: true,
          method: "played",
          openingId: opening.id,
          expiresAt: Date.now() + 20 * 60 * 1000,
        })
      );

      return;
    }

    setStatus(nextMoveIndex % 2 === 0 ? "White to move." : "Black to move.");
  };

  const resetBoard = () => {
    setBoard(createInitialBoard());
    setSelectedSquare(null);
    setCurrentMoveIndex(0);
    setMoveHistory([]);
    setStatus("White to move.");
    setHasStarted(false);
    setUnlocked(false);
  };

  const skipPuzzle = () => {
    setHasStarted(true);
    setUnlocked(true);

    localStorage.setItem(
      "portfolio_access",
      JSON.stringify({
        unlocked: true,
        method: "skipped",
        openingId: opening.id,
        expiresAt: Date.now() + 20 * 60 * 1000,
      })
    );
  };

  const enterPortfolio = () => {
    console.log("Enter portfolio");
    // Later you can route here:
    // navigate("/home");
    // or setShowPortfolio(true);
  };

  const formatMoveRows = () => {
    const rows = [];

    for (let i = 0; i < solution.length; i += 2) {
      rows.push({
        number: i / 2 + 1,
        white: moveHistory[i] ?? "—",
        black: moveHistory[i + 1] ?? "—",
      });
    }

    return rows;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-8 py-10">
      <div className="grid grid-cols-[280px_minmax(500px,720px)_220px] gap-10 items-center w-full max-w-7xl">
        <aside className="h-[620px] rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl flex flex-col">
          <div className="border-b border-white/10 pb-6">
            <p className="text-xs tracking-[0.25em] text-[#b89b63] mb-3">
              CLUE
            </p>
            <h2 className="text-2xl font-serif">{opening.name}</h2>
            <p className="mt-3 text-sm leading-6 text-white/45">
              {opening.clue}
            </p>
          </div>

          <div className="py-6 border-b border-white/10">
            <p className="text-xs tracking-[0.25em] text-[#b89b63] mb-5">
              MOVE LOG
            </p>

            <div className="space-y-4">
              {formatMoveRows().map((row) => (
                <div
                  key={row.number}
                  className="grid grid-cols-[40px_70px_70px] text-lg text-white/80"
                >
                  <span className="text-[#b89b63]">{row.number}.</span>
                  <span>{row.white}</span>
                  <span>{row.black}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-[#b89b63]">
            <span className="mr-2">•</span>
            {status}
          </div>

          <div className="mt-auto pt-10 flex gap-3">
            <button
              onClick={resetBoard}
              className="rounded-lg border border-white/15 px-5 py-3 text-white/80 hover:bg-white/10 transition"
            >
              Reset
            </button>

            <button
              onClick={skipPuzzle}
              className="rounded-lg border border-white/15 px-5 py-3 text-white/80 hover:bg-white/10 transition"
            >
              Skip
            </button>
          </div>
        </aside>

        <main className="relative">
          <div className="relative aspect-square w-full border-[18px] border-[#181818] shadow-2xl bg-[#181818]">
            <div className="absolute -top-12 left-0 right-0 grid grid-cols-8 text-center text-[#b89b63] text-xl">
              {files.map((file) => (
                <span key={file}>{file}</span>
              ))}
            </div>

            <div className="absolute -bottom-12 left-0 right-0 grid grid-cols-8 text-center text-[#b89b63] text-xl">
              {files.map((file) => (
                <span key={file}>{file}</span>
              ))}
            </div>

            <div className="absolute -left-12 top-0 bottom-0 grid grid-rows-8 text-center text-[#b89b63] text-xl">
              {ranks.map((rank) => (
                <span key={rank} className="flex items-center justify-center">
                  {rank}
                </span>
              ))}
            </div>

            <div className="absolute -right-12 top-0 bottom-0 grid grid-rows-8 text-center text-[#b89b63] text-xl">
              {ranks.map((rank) => (
                <span key={rank} className="flex items-center justify-center">
                  {rank}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
              {ranks.map((rank, rowIndex) =>
                files.map((file, colIndex) => {
                  const square = `${file}${rank}`;
                  const isDark = (rowIndex + colIndex) % 2 === 1;
                  const isSelected = selectedSquare === square;
                  const piece = board[square];
                  const pieceImage = getPieceImage(piece);

                  return (
                    <button
                      key={square}
                      onClick={() => handleSquareClick(square)}
                      className={[
                        "relative flex items-center justify-center transition",
                        isDark ? "bg-[#3d3a34]" : "bg-[#b9aa8f]",
                        isSelected ? "ring-4 ring-[#d6b36a] z-10" : "",
                        hasStarted && !unlocked
                          ? "hover:brightness-110 cursor-pointer"
                          : "cursor-default",
                      ].join(" ")}
                    >
                      {pieceImage && (
                        <img
                          src={pieceImage}
                          alt={`${piece?.color} ${piece?.type}`}
                          className="w-[76%] h-[76%] object-contain select-none pointer-events-none drop-shadow-xl"
                          draggable={false}
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {!hasStarted && !unlocked && (
            <ClueCard
              mode="intro"
              openingName={opening.name}
              openingClue={opening.clue}
              onPlay={() => setHasStarted(true)}
              onSkip={skipPuzzle}
            />
          )}

          {unlocked && (
            <ClueCard
              mode="unlocked"
              openingName={opening.name}
              onEnter={enterPortfolio}
            />
          )}
        </main>

        <aside className="h-[620px] flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="tracking-[0.25em] text-[#b89b63] text-lg">
              HARRY DUONG
            </h1>
            <p className="text-white/50 mt-2">CS + Business</p>
          </div>

          <div className="h-px bg-white/10 mb-10" />

          <div className="space-y-6 text-white/70">
            <a href="#" className="block hover:text-[#b89b63] transition">
              GitHub
            </a>
            <a href="#" className="block hover:text-[#b89b63] transition">
              LinkedIn
            </a>
            <a href="#" className="block hover:text-[#b89b63] transition">
              Email
            </a>
            <a href="#" className="block hover:text-[#b89b63] transition">
              Resume
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}