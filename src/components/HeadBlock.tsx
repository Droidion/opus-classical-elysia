import { isProd } from "../lib/helpers";

async function getProdAssets() {
  const path = "./dist/.vite/manifest.json";
  const file = Bun.file(path);
  const contents = await file.json();
  const jsPath = contents["src/scripts.ts"].file as string;
  const cssPath = contents["src/scripts.ts"].css[0] as string;
  return (
    <>
      <link rel="stylesheet" href={`/public/${cssPath}`} />
      <script defer type="module" src={`/public/${jsPath}`} />
    </>
  );
}

function getDevAssets() {
  return (
    <>
      <script type="module" src="http://localhost:5173/@vite/client" />
      <script type="module" src="http://localhost:5173/src/scripts.ts" />
    </>
  );
}

export async function HeadBlock(
  props: Html.PropsWithChildren<{ title: string }>,
): Promise<string> {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta
        name="description"
        content="Catalogue for streaming classical music."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#ffffff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#1a1a1a"
      />
      <meta name="color-scheme" content="dark light" />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="/public/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/public/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/public/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/public/safari-pinned-tab.svg" color="#fff" />
      <link rel="manifest" href="/public/site.webmanifest" />
      <link
        rel="apple-touch-icon-precomposed"
        type="image/png"
        sizes="180x180"
        href="/public/apple-touch-icon.png"
      />
      <link rel="icon" type="image/x-icon" href="/public/favicon.ico" />
      {isProd() && (await getProdAssets())}
      {!isProd() && getDevAssets()}
      <title>{props.title}</title>
      <script src="/public/init-switcher.js" defer />
    </head>
  );
}
