import Link from "next/link";
import { Match, MatchStatus, SimplifiedMatch } from "@/app/models/Match";
import MatchResultRow from "./MatchResultRow";
import { groupMatchesByDay } from "./playoffUtils";

interface SingleMatchLatestBlockProps {
  /** Label de la fase (ej. "Final", "Promoción") */
  title: string;
  href: string;
  matches: SimplifiedMatch[];
  onSelectMatch: (match: Match) => void;
}

/** Bloque del inicio ("Fecha Actual") para una fase de partido único. */
const SingleMatchLatestBlock = ({ title, href, matches, onSelectMatch }: SingleMatchLatestBlockProps) => {
  const played = matches.filter((m) => m.status === MatchStatus.JUGADO);
  const upcoming = matches.filter((m) => m.status !== MatchStatus.JUGADO);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-surface)" }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
          {title}
        </span>
        <Link
          href={href}
          className="text-xs font-semibold hover:opacity-80 transition-opacity text-[var(--color-text-secondary)]"
        >
          Ver partido →
        </Link>
      </div>
      {groupMatchesByDay([...played, ...upcoming]).map((group) => (
        <div key={group.dayKey}>
          <div className="px-4 py-2" style={{ backgroundColor: "var(--color-surface)" }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              {group.dayLabel}
            </span>
          </div>
          {group.matches.map((match, i) => (
            <MatchResultRow
              key={i}
              match={match}
              onClick={match.matchDetail ? () => onSelectMatch(match.matchDetail!) : undefined}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default SingleMatchLatestBlock;
