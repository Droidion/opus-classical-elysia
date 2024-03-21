import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { HeadBlock } from "./HeadBlock";

export function AppLayout(
  props: Html.PropsWithChildren<{ title: string }>,
): JSX.Element {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <HeadBlock title={props.title} />
        <body>
          <script src="/public/theme-loader.js"></script>
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
