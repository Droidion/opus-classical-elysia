export function HeadBlock(
  props: Html.PropsWithChildren<{ title: string }>,
): JSX.Element {
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
      <link rel="stylesheet" href="/public/styles.css" />
      <title>{props.title}</title>
      <script src="/public/init-switcher.js" defer></script>
    </head>
  );
}
