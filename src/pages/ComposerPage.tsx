import { AppLayout } from "../components/AppLayout";
import { WorkCard } from "../components/WorkCard";
import { dbConnect } from "../db/connect";
import { getComposerBySlug } from "../db/queries/composerBySlug";
import { getWorksByGenres } from "../db/queries/worksByGenres";
import { formatYearsRangeString } from "../lib/helpers";

export async function ComposerPage(
  props: Html.PropsWithChildren<{ slug: string }>,
): Promise<string> {
  const composer = await getComposerBySlug(dbConnect(), props.slug);
  const genres = await getWorksByGenres(dbConnect(), composer.id);
  const yearsLived = formatYearsRangeString(
    composer.yearBorn,
    composer.yearDied,
  );
  return (
    <AppLayout title={`${composer.lastName} | Opus Classical`}>
      <div>
        <h1>
          <span>{composer.firstName}</span>
          <span>&nbsp;</span>
          <span>{composer.lastName}</span>
        </h1>
        <div class="mb-4 w-full text-center">
          <span>{composer.countries}</span>
          <span class="vertical-separator" />
          <span>{yearsLived}</span>
          {composer.wikipediaLink && (
            <>
              <span class="vertical-separator" />
              <a href={composer.wikipediaLink}>Wikipedia</a>
            </>
          )}
          {composer.imslpLink && (
            <>
              <span class="vertical-separator" />
              <a href={composer.imslpLink}>IMSLP</a>
            </>
          )}
        </div>

        {genres?.map((genre) => (
          <>
            <h2>{genre.genreName}</h2>
            <hr />
            <div class="mb-4 flex flex-wrap">
              {genre.works.map((work) => (
                <a href={`/composer/${composer.slug}/work/${work.id}`}>
                  <WorkCard work={work} />
                </a>
              ))}
            </div>
          </>
        ))}
      </div>
    </AppLayout>
  );
}
