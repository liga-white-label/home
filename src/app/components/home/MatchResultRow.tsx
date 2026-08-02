import { MatchStatus, SimplifiedMatch } from "@/app/models/Match";
import { Jugador } from "@/app/models/Jugador";
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
        className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded min-w-[64px]"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="flex items-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <span className="text-white text-[9px] font-bold uppercase tracking-wider leading-none">
            Vivo
          </span>
        </div>
        <span className="text-white font-bold text-sm leading-none">
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

const groupGoals = (jugadores: Jugador[] = []) => {
  const porJugador = new Map<string, { name: string; goles: number }>();
  jugadores.forEach((jugador) => {
    const actual = porJugador.get(jugador.id);
    if (actual) actual.goles += 1;
    else porJugador.set(jugador.id, { name: jugador.fullName, goles: 1 });
  });
  return Array.from(porJugador.values());
};

const Goleadores = ({ match }: { match: SimplifiedMatch }) => {
  const local = groupGoals(match.matchDetail?.homeTeamPlayerGoals);
  const visitante = groupGoals(match.matchDetail?.awayTeamPlayerGoals);

  if (local.length === 0 && visitante.length === 0) return null;

  return (
    <div className="flex justify-between gap-3 px-4 pb-2 -mt-1">
      <div className="flex flex-col gap-0.5 items-end text-right flex-1 min-w-0">
        {local.map((g) => (
          <span
            key={g.name}
            className="text-[var(--color-text-secondary)] text-[11px] leading-tight truncate max-w-full"
          >
            ⚽ {g.name}
            {g.goles > 1 ? ` x${g.goles}` : ""}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 items-start text-left flex-1 min-w-0">
        {visitante.map((g) => (
          <span
            key={g.name}
            className="text-[var(--color-text-secondary)] text-[11px] leading-tight truncate max-w-full"
          >
            ⚽ {g.name}
            {g.goles > 1 ? ` x${g.goles}` : ""}
          </span>
        ))}
      </div>
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
      className={`transition-colors ${
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
      <div className="flex items-center justify-between gap-3 py-3 px-4">
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

      {isPlayed && <Goleadores match={match} />}
    </div>
  );
};

export default MatchResultRow;
