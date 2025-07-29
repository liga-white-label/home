const vertialSpacing = 110; // It's the spacing used to define the progressive vertical distance between each Teambox
const horizontalSpacing = 180; // Spacing between rounds
const initialOffset = 20; // Initial offset from the left

const calculateTotalWidth = (leftRoundsLength: number) => {
  // Calculate total width including both sides and final
  return (leftRoundsLength * 2 + 1) * horizontalSpacing;
};

export const calculateLeftPosition = (
  matchIndex: number,
  roundIndex: number,
  totalRounds: number
) => {
  // For semifinals (when there's only one round before final)
  if (totalRounds === 1) {
    const leftOffset = 300; // Fixed position for semifinals
    const spacing = vertialSpacing * 2; // Increased spacing for semifinals
    const topOffset = matchIndex * spacing + 150; // Adjusted vertical position
    return { left: `${leftOffset}px`, top: `${topOffset}px` };
  }

  // Regular case (more than semifinals)
  const leftOffset = initialOffset + roundIndex * horizontalSpacing;
  const spacing = vertialSpacing * Math.pow(2, roundIndex);
  const topOffset = matchIndex * spacing + spacing / 2 + 5;
  return { left: `${leftOffset}px`, top: `${topOffset}px` };
};

const getFinalLeftOffset = (leftRoundsLength: number) => {
  if (leftRoundsLength === 1) {
    return 600; // Fixed position for final when only semifinals
  }
  return initialOffset + leftRoundsLength * horizontalSpacing + 65;
};

export const calculateRightPosition = (
  matchIndex: number,
  roundIndex: number,
  leftRoundsLength: number
) => {
  // For semifinals (when there's only one round before final)
  if (leftRoundsLength === 1) {
    const leftOffset = 900; // Fixed position for right semifinals
    const spacing = vertialSpacing * 2; // Increased spacing for semifinals
    const topOffset = matchIndex * spacing + 150; // Adjusted vertical position
    return { left: `${leftOffset}px`, top: `${topOffset}px` };
  }

  // Regular case (more than semifinals)
  const finalOffset = getFinalLeftOffset(leftRoundsLength);
  const firstRightLeftOffsetStart = finalOffset + 250;
  const leftOffset = firstRightLeftOffsetStart + roundIndex * horizontalSpacing;
  const adjustedRoundIndex = leftRoundsLength - roundIndex - 1;
  const spacing = vertialSpacing * Math.pow(2, adjustedRoundIndex);
  const topOffset = matchIndex * spacing + spacing / 2 + 5;

  return { left: `${leftOffset}px`, top: `${topOffset}px` };
};

export const getFinalPosition = (leftRoundsLength: number) => {
  const leftOffset = getFinalLeftOffset(leftRoundsLength);
  if (leftRoundsLength === 1) {
    return { left: `${leftOffset}px`, top: "225px" }; // Fixed vertical position for semifinals case
  }
  const semiTopOffset = vertialSpacing * Math.pow(2, leftRoundsLength - 2);
  const topOffset = leftRoundsLength === 0 ? 75 : semiTopOffset + 158;
  return { left: `${leftOffset}px`, top: `${topOffset}px` };
};

export const calculateScreenHeight = (leftRoundsLength: number) => {
  if (leftRoundsLength === 1) {
    return 400; // Fixed height for semifinals case
  }
  const totalRounds = leftRoundsLength + 1;
  const initialRoundMatches = totalRounds <= 2 ? totalRounds : totalRounds - 1;
  const matchHeight = 160;

  return initialRoundMatches * matchHeight + matchHeight / 2;
};
