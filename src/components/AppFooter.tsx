import { GithubIcon } from "./GithubIcon";

export function AppFooter(): JSX.Element {
  return (
    <footer class="dark:xl:bg-codgray dark:bg-mineshaft flex h-16 w-full max-w-screen-xl items-center justify-center bg-black/20 px-4 xl:bg-white">
      <a
        class="mx-3"
        title="Buy me a coffee"
        href="https://www.buymeacoffee.com/zunh"
      >
        <img
          alt="Buy me a coffee"
          class="h-8"
          width="128"
          height="36"
          src="/public/bmc-button.svg"
        />
      </a>
      <a
        class="mx-3"
        title="Github repository"
        href="https://github.com/Droidion/opus-classical-elysia"
      >
        <GithubIcon />
      </a>
    </footer>
  );
}
