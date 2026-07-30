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
    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 overflow-hidden p-1"
    style={{ backgroundColor: "var(--color-surface-hover)" }}
  >
    <Image
      src={resolveLogoUrl(logo)}
      alt={name || ""}
      width={24}
      height={24}
      className="object-contain w-6 h-6"
    />
  </div>
);

const ScoreBox = ({ match }: { match: SimplifiedMatch }) => {
  const isPlayed = match.status === MatchStatus.JUGADO;
  const isLive = match.status === MatchStatus.JUGANDO;
  const hasTime = !isPlayed && !isLive && match.date && moment(match.date).isValid();

  if (isLive) {
    return (
      <div
        className="flex items-center justify-center px-3 py-1.5 rounded min-w-[64px]"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <span className="text-white font-bold text-sm">
          {match.homeTeamGoals ?? 0} - {match.awayTeamGoals ?? 0}
        </span>
      </div>
    );
  }

  if (isPlayed) {
    return (
      <div
        className="flex items-center justify-center px-3 py-1.5 rounded min-w-[64px]"
        style={{ backgroundColor: "var(--color-surface-hover)" }}
      >
        <span className="text-[var(--color-text)] font-bold text-sm">
          {match.homeTeamGoals ?? 0} - {match.awayTeamGoals ?? 0}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-3 py-1 rounded min-w-[64px]"
      style={{ backgroundColor: "var(--color-surface-hover)" }}
    >
      <span className="text-[var(--color-text)] font-medium text-sm leading-tight">
        {hasTime ? moment(match.date).format("HH:mm") : "-"}
      </span>
      <span className="text-[var(--color-text-secondary)] text-[10px] uppercase tracking-wider">vs</span>
    </div>
  );
};

const LiveBadge = () => (
  <div className="flex items-center gap-1.5 flex-shrink-0 pr-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
    </span>
    <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider">
      Vivo
    </span>
  </div>
);

const MatchResultRow = ({
  match,
  onClick,
}: {
  match: SimplifiedMatch;
  onClick?: () => void;
}) => {
  const isPlayed = match.status === MatchStatus.JUGADO;
  const isLive = match.status === MatchStatus.JUGANDO;

  return (
    <div
      className={`flex items-center justify-between gap-3 py-3 px-4 transition-colors ${
        onClick
          ? "cursor-pointer hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          : ""
      }`}
      style={{ borderBottom: "1px solid var(--color-surface)" }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {isLive && <LiveBadge />}

      {/* Home team */}
      <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
        <span
          className={`text-sm text-right truncate uppercase ${
            isPlayed ? "text-[var(--color-text)] font-semibold" : "text-[var(--color-text-secondary)]"
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
            isPlayed ? "text-[var(--color-text)] font-semibold" : "text-[var(--color-text-secondary)]"
          }`}
        >
          {match.awayTeamName}
        </span>
      </div>
    </div>
  );
};

export default MatchResultRow;
