import { MatchStatus, SimplifiedMatch } from "@/app/models/Match";
import { LOGO_DEFAULT_TEAM } from "@/app/utils/constants";
import Image from "next/image";
import moment from "moment";

export const resolveLogoUrl = (url: string | null): string => {
  if (!url) return LOGO_DEFAULT_TEAM;
  return url.startsWith("https://") ? url : "https://" + url;
};

const TeamAvatar = ({ name, logo }: { name: string | null; logo: string | null }) => (
  <div
    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
    style={{ backgroundColor: "#2a2a2a" }}
  >
    <Image
      src={resolveLogoUrl(logo)}
      alt={name || ""}
      width={28}
      height={28}
      className="object-contain w-7 h-7"
    />
  </div>
);

const ScoreBox = ({ match }: { match: SimplifiedMatch }) => {
  const isPlayed = match.status === MatchStatus.JUGADO;
  const isLive = (match.status as string) === "live" || (match.status as string) === "EN_VIVO";
  const hasTime = !isPlayed && !isLive && match.date && moment(match.date).isValid();

  if (isLive) {
    return (
      <div
        className="flex flex-col items-center justify-center px-3 py-1 rounded min-w-[64px]"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <span className="text-white font-bold text-sm leading-tight">
          {match.homeTeamGoals ?? 0}-{match.awayTeamGoals ?? 0}
        </span>
        <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">
          En vivo
        </span>
      </div>
    );
  }

  if (isPlayed) {
    return (
      <div
        className="flex items-center justify-center px-3 py-1.5 rounded min-w-[64px]"
        style={{ backgroundColor: "#222" }}
      >
        <span className="text-white font-bold text-sm">
          {match.homeTeamGoals ?? 0} - {match.awayTeamGoals ?? 0}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-3 py-1 rounded min-w-[64px]"
      style={{ backgroundColor: "#222" }}
    >
      <span className="text-gray-300 font-medium text-sm leading-tight">
        {hasTime ? moment(match.date).format("HH:mm") : "-"}
      </span>
      <span className="text-gray-500 text-[10px] uppercase tracking-wider">vs</span>
    </div>
  );
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
      className={`flex items-center justify-between gap-3 py-3 px-4 transition-colors ${onClick ? "cursor-pointer" : ""}`}
      style={{ borderBottom: "1px solid #1a1a1a" }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.backgroundColor = "#1a1a1a")}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.backgroundColor = "transparent")}
      onClick={onClick}
    >
      {/* Home team */}
      <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
        <span
          className={`text-sm text-right truncate uppercase ${
            isPlayed ? "text-white font-semibold" : "text-gray-400"
          }`}
        >
          {match.homeTeamName}
        </span>
        <TeamAvatar name={match.homeTeamName} logo={match.homeTeamLogo} />
      </div>

      {/* Score */}
      <div className="flex-shrink-0">
        <ScoreBox match={match} />
      </div>

      {/* Away team */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <TeamAvatar name={match.awayTeamName} logo={match.awayTeamLogo} />
        <span
          className={`text-sm truncate uppercase ${
            isPlayed ? "text-white font-semibold" : "text-gray-400"
          }`}
        >
          {match.awayTeamName}
        </span>
      </div>
    </div>
  );
};

export default MatchResultRow;
