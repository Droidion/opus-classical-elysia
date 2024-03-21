import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export function AppLayout(
  props: Html.PropsWithChildren<{ title: string }>,
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
        <body>
          <div class="grid min-h-screen w-full grid-rows-[auto_1fr_auto] justify-items-center">
            <AppHeader />
            <main
              class="main flex w-full max-w-screen-xl flex-col overflow-auto px-4 pb-4"
              role="main"
            >
              {props.children}
            </main>
            <AppFooter />
          </div>
        </body>
      </html>
    </>
  );
}
