import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { HeadBlock } from "./HeadBlock";

type Props = { title: string };

export function AppLayout(props: Html.PropsWithChildren<Props>): JSX.Element {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <HeadBlock title={props.title} />
        <body>
          <script src="/public/theme-loader.js" />
          <div class="grid justify-items-center min-h-screen w-full grid-rows-[auto_1fr_auto]">
            <AppHeader />
            <main class="main flex flex-col w-full max-w-screen-xl overflow-auto px-4 pb-4">
              {props.children}
            </main>
            <AppFooter />
          </div>
        </body>
      </html>
    </>
  );
}
