import { Match, MatchStatus } from "@/app/models/Match";

const vertialSpacing = 110; // It's the spacing used to define the progressive vertical distance between each Teambox
const horizontalSpacing = 300; // Spacing between rounds
const initialOffset = 50; // Initial offset from the left

const calculateTotalWidth = (leftRoundsLength: number) => {
  // Calculate total width including both sides and final
  return (leftRoundsLength * 2 + 1) * horizontalSpacing;
};

export const calculateLeftPosition = (
  matchIndex: number,
  roundIndex: number
) => {
  const leftOffset = initialOffset + roundIndex * horizontalSpacing; // Add initial offset
  const spacing = vertialSpacing * Math.pow(2, roundIndex); // Vertical spacing per round
  const topOffset = matchIndex * spacing + spacing / 2 + 5; // Progressive downward position
  return { left: `${leftOffset}px`, top: `${topOffset}px` };
};

const getFinalLeftOffset = (leftRoundsLength: number) => {
  return initialOffset + leftRoundsLength * horizontalSpacing - 50;
};

export const calculateRightPosition = (
  matchIndex: number,
  roundIndex: number,
  leftRoundsLength: number
) => {
  const finalOffset = getFinalLeftOffset(leftRoundsLength);
  const firstRightLeftOffsetStart = finalOffset + 250; // Space after the final match
  const leftOffset = firstRightLeftOffsetStart + roundIndex * horizontalSpacing;
  const adjustedRoundIndex = leftRoundsLength - roundIndex - 1; // Invert the order of the rounds
  const spacing = vertialSpacing * Math.pow(2, adjustedRoundIndex); // Vertical progressive spacing but in reverse
  const topOffset = matchIndex * spacing + spacing / 2 + 5; // Same formula as left side

  return { left: `${leftOffset}px`, top: `${topOffset}px` };
};

export const getFinalPosition = (leftRoundsLength: number) => {
  const leftOffset = getFinalLeftOffset(leftRoundsLength); // Center horizontally the final
  const semiTopOffset = vertialSpacing * Math.pow(2, leftRoundsLength - 2);
  const topOffset = leftRoundsLength === 0 ? 75 : semiTopOffset + 158; // if there's only a final then 75 else ...
  return { left: `${leftOffset}px`, top: `${topOffset}px` };
};

export const calculateScreenHeight = (leftRoundsLength: number) => {
  const totalRounds = leftRoundsLength + 1;
  const initialRoundMatches = totalRounds <= 2 ? totalRounds : totalRounds - 1;
  const matchHeight = 160;

  return initialRoundMatches * matchHeight + matchHeight / 2;
};
