export type ChessMove = {
    from: string;
    to: string;
    notation: string;
}

export type ChessOpening = {
    id: string;
    name: string;
    clue: string;
    moves: ChessMove[];
}

export const openings: ChessOpening[] = [
  {
    id: "two-knights-defense",
    name: "Tưo Knights Defense",
    clue: "A sharp Italian line with two black knights developed early.",
    moves: [
      { from: "e2", to: "e4", notation: "e4" },
      { from: "e7", to: "e5", notation: "e5" },
      { from: "g1", to: "f3", notation: "Nf3" },
      { from: "b8", to: "c6", notation: "Nc6" },
      { from: "f1", to: "c4", notation: "Bc4" },
      { from: "g8", to: "f6", notation: "Nf6" },
    ],
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    clue: "White offers a wing pawn to control the center.",
    moves: [
      { from: "d2", to: "d4", notation: "d4" },
      { from: "d7", to: "d5", notation: "d5" },
      { from: "c2", to: "c4", notation: "c4" },
    ],
  },
];
