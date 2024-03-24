import { MainLogo } from "./MainLogo";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function AppHeader(): JSX.Element {
  return (
    <header class="dark:xl:bg-codgray dark:bg-mineshaft top-0 z-10 flex h-16 w-full max-w-screen-xl items-center justify-between bg-black/20 px-4 xl:sticky xl:h-24 xl:bg-white">
      <MainLogo />
      <nav class="menu flex items-center">
        <div class="mr-4">
          <ThemeSwitcher />
        </div>
        <div id="search" />
      </nav>
    </header>
  );
}
