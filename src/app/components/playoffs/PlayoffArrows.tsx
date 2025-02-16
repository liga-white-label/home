import Xarrow from "react-xarrows";
import { RoundMatch } from "@/app/models/FaseCampeonato";

interface PlayoffArrowsProps {
  leftRounds: RoundMatch[][];
  rightRounds: RoundMatch[][];
}

const PlayoffArrows: React.FC<PlayoffArrowsProps> = ({
  leftRounds,
  rightRounds,
}) => {
  return (
    <>
      {/* Render arrows */}
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
            />
          ) : null
        )
      )}

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
            />
          ) : null
        )
      )}
    </>
  );
};

export default PlayoffArrows;
