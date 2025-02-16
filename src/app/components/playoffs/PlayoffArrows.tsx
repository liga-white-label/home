import Xarrow from "react-xarrows";
import { RoundMatch } from "@/app/models/FaseCampeonato";

interface PlayoffArrowsProps {
  leftRounds: RoundMatch[][];
  rightRounds: RoundMatch[][];
  finalMatchId?: string;
}

const PlayoffArrows: React.FC<PlayoffArrowsProps> = ({
  leftRounds,
  rightRounds,
  finalMatchId,
}) => {
  // Get the last matches from left and right rounds that should connect to the final
  const lastLeftRound = leftRounds[leftRounds.length - 1] || [];
  const lastRightRound = rightRounds[0] || [];
  console.log(lastRightRound);

  return (
    <>
      {/* Render arrows for left rounds */}
      {leftRounds.map((matches) =>
        matches.map((match) =>
          match.nextMatchId ? (
            <Xarrow
              key={`arrow-${match.id}-to-${match.nextMatchId}`}
              start={`match-${match.id}`}
              end={`match-${match.nextMatchId}`}
              color="grey"
              strokeWidth={2}
              headSize={0}
              path="grid"
              curveness={0}
              startAnchor="right"
              endAnchor="left"
            />
          ) : null
        )
      )}

      {/* Render arrows for right rounds */}
      {rightRounds.map((matches) =>
        matches.map((match) =>
          match.nextMatchId ? (
            <Xarrow
              key={`arrow-${match.id}-to-${match.nextMatchId}`}
              start={`match-${match.id}`}
              end={`match-${match.nextMatchId}`}
              color="grey"
              strokeWidth={2}
              headSize={0}
              path="grid"
              curveness={0}
              startAnchor="left"
              endAnchor="right"
            />
          ) : null
        )
      )}

      {/* Render arrows to final */}
      {finalMatchId &&
        lastLeftRound.map((match) => (
          <Xarrow
            key={`arrow-${match.id}-to-final`}
            start={`match-${match.id}`}
            end={`match-${finalMatchId}`}
            color="grey"
            strokeWidth={2}
            headSize={0}
            path="grid"
            curveness={0}
            startAnchor="right"
            endAnchor="left"
          />
        ))}
      {finalMatchId &&
        lastRightRound.map((match) => (
          <Xarrow
            key={`arrow-${match.id}-to-final`}
            start={`match-${match.id}`}
            end={`match-${finalMatchId}`}
            color="grey"
            strokeWidth={2}
            headSize={0}
            path="grid"
            curveness={0}
            startAnchor="left"
            endAnchor="right"
          />
        ))}
    </>
  );
};

export default PlayoffArrows;
