import { AppLayout } from "@components/AppLayout";
import { PeriodCard } from "@components/PeriodCard";
import { dbConnect } from "@db/connect";
import { getComposersByPeriods } from "@db/queries/composersByPeriods";

export async function IndexPage(): Promise<string> {
  const periods = await getComposersByPeriods(dbConnect());
  return (
    <AppLayout title="Composers | Opus Classical">
      <div>
        <h1>Composers</h1>
        {periods.map((period) => (
          <PeriodCard period={period} />
        ))}
      </div>
    </AppLayout>
  );
}
