export function Layout(
  props: Html.PropsWithChildren<{ title?: string }>,
): JSX.Element {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{props.title || "Hello World!"}</title>
          <link rel="stylesheet" href="/public/styles.css" />
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}