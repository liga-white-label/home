import { Liga, Campeonato } from "@/app/models/Campeonato";
import CategoryLatestMatches from "./CategoryLatestMatches";
import CupLatestMatches from "./CupLatestMatches";

type TabItem =
  | { kind: "category"; id: string; label: string; ligaId: string }
  | { kind: "cup"; id: string; label: string };

interface LatestResultsSectionProps {
  liga: Liga | null;
  cups: Campeonato[];
}

const LatestResultsSection = ({ liga, cups }: LatestResultsSectionProps) => {
  const categoryTabs: TabItem[] = (liga?.categories ?? []).map((cat) => ({
    kind: "category",
    id: cat.id,
    label: `${cat.name}`,
    ligaId: liga!.id,
  }));

  const cupTabs: TabItem[] = cups.map((cup) => ({
    kind: "cup",
    id: cup.id,
    label: cup.name,
  }));

  const tabs: TabItem[] = [...categoryTabs, ...cupTabs];

  if (tabs.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-10 py-8" style={{ backgroundColor: "var(--color-bg)" }}>
      <h2 className="text-[var(--color-text)] text-lg font-bold mb-5 tracking-widest uppercase">
        Fecha Actual
      </h2>

      <div className="flex flex-col gap-8">
        {tabs.map((tab) => (
          <div key={tab.id}>
            <h3 className="text-[var(--color-text)] text-sm font-bold mb-3 tracking-wide uppercase px-1">
              {tab.label}
            </h3>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "var(--color-surface-2)" }}>
              {tab.kind === "category" && (
                <CategoryLatestMatches categoryId={tab.id} ligaId={tab.ligaId} />
              )}
              {tab.kind === "cup" && <CupLatestMatches cupId={tab.id} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestResultsSection;
