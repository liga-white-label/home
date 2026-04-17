import { MatchStatus, SimplifiedMatch } from "@/app/models/Match";
import { LOGO_DEFAULT_TEAM } from "@/app/utils/constants";
import Image from "next/image";

export const resolveLogoUrl = (url: string | null): string => {
  if (!url) return LOGO_DEFAULT_TEAM;
  return url.startsWith("https://") ? url : "https://" + url;
};

const MatchResultRow = ({
  match,
  onClick,
}: {
  match: SimplifiedMatch;
  onClick?: () => void;
}) => {
  const isPlayed = match.status === MatchStatus.JUGADO;

  return (
    <div
      className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {/* Home team */}
      <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
        <span
          className={`text-sm text-right truncate ${
            isPlayed ? "font-semibold" : "text-gray-500"
          }`}
        >
          {match.homeTeamName}
        </span>
        <Image
          src={resolveLogoUrl(match.homeTeamLogo)}
          width={28}
          height={28}
          alt={match.homeTeamName}
          className="object-contain rounded-full flex-shrink-0"
        />
      </div>

      {/* Score / vs */}
      <div className="flex-shrink-0 w-16 text-center">
        {isPlayed ? (
          <span
            className="font-bold text-base"
            style={{ color: "var(--color-primary)" }}
          >
            {match.homeTeamGoals ?? 0} - {match.awayTeamGoals ?? 0}
          </span>
        ) : (
          <span className="text-gray-400 text-sm font-medium">vs</span>
        )}
      </div>

      {/* Away team */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Image
          src={resolveLogoUrl(match.awayTeamLogo)}
          width={28}
          height={28}
          alt={match.awayTeamName}
          className="object-contain rounded-full flex-shrink-0"
        />
        <span
          className={`text-sm truncate ${
            isPlayed ? "font-semibold" : "text-gray-500"
          }`}
        >
          {match.awayTeamName}
        </span>
      </div>
    </div>
  );
};

export default MatchResultRow;
