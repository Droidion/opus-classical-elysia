/** @jsxImportSource solid-js */

import {
  createSignal,
  onCleanup,
  Show,
  For,
  type Accessor,
  type Component,
} from "solid-js";
import type { FoundComposer } from "@db/queries/searchComposers";
import { getSearchComposersData } from "@lib/apiClient";
import Fuse from "fuse.js";
import { autofocus } from "@solid-primitives/autofocus";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      clickOutside: typeof clickOutside;
    }
  }
}

autofocus;

const [searchData, setSearchData] = createSignal<FoundComposer[]>([]);
const [searchResults, setSearchResults] = createSignal<FoundComposer[]>([]);
const [isSearchVisible, setIsSearchVisible] = createSignal(false);
const [selectedSearchResultIndex, setSelectedSearchResultIndex] =
  createSignal(0);

function search(q: string): void {
  const keys = ["firstName", "lastName"];
  const fuse = new Fuse(searchData(), {
    keys,
  });

  setSearchResults(
    fuse
      .search(q)
      .map((result) => result.item)
      .slice(0, 5),
  );
}

async function fetchSearchData(): Promise<void> {
  try {
    const data = await getSearchComposersData();
    setSearchData(data);
  } catch (error) {
    console.error("Failed to fetch search data:", error);
    setSearchData([]);
  }
}

async function showSearch(): Promise<void> {
  await fetchSearchData();
  setIsSearchVisible(true);
}

function hideSearch(): void {
  setSearchResults([]);
  setIsSearchVisible(false);
}

function redirectOnSearchResult() {
  location.pathname = `/composer/${
    searchResults()[selectedSearchResultIndex()]?.slug
  }`;
}

function moveSelectionUp() {
  setSelectedSearchResultIndex(
    selectedSearchResultIndex() > 0
      ? selectedSearchResultIndex() - 1
      : searchResults().length - 1,
  );
}

function moveSelectionDown() {
  setSelectedSearchResultIndex(
    selectedSearchResultIndex() < searchResults().length - 1
      ? selectedSearchResultIndex() + 1
      : 0,
  );
}

function clickOutside(el: HTMLElement, accessor: Accessor<() => void>) {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as Node) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

function handleKeydown(event: KeyboardEvent) {
  if (event.code === "ArrowUp" && searchResults().length > 0) {
    moveSelectionUp();
  } else if (event.code === "ArrowDown" && searchResults().length > 0) {
    moveSelectionDown();
  } else if (event.code === "Escape") {
    hideSearch();
  } else if (event.code === "Enter" && searchResults().length > 0) {
    redirectOnSearchResult();
  }
}

function handleSearchInput(
  event: InputEvent & { currentTarget: HTMLInputElement },
): void {
  const inputEvent = event.currentTarget.value.trim();
  if (searchData().length > 0) {
    search(inputEvent);
  }
}

function handleResultHover(index: number): void {
  setSelectedSearchResultIndex(index);
}

function SearchButton() {
  return (
    <div
      class="search-button label cursor-pointer duration-150 hover:scale-125"
      role="button"
      aria-label="Search Icon"
      tabindex="0"
      onClick={showSearch}
      onKeyPress={showSearch}
    >
      <svg
        class="icon h-4 w-4 xl:h-5 xl:w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="searchIconTitle">Search</title>
        <path d="m23.809 21.646-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
      </svg>
    </div>
  );
}

const ComposerLink: Component<{
  composer: FoundComposer;
  i: Accessor<number>;
}> = ({ composer, i }) => {
  return (
    <a
      href={`/composer/${composer.slug}`}
      onMouseEnter={() => handleResultHover(i())}
    >
      <div
        class={
          selectedSearchResultIndex() === i()
            ? "mx-1.5 my-1 rounded-sm bg-black/10 px-2 py-0.5"
            : "mx-1.5 my-1 rounded-sm px-2 py-0.5"
        }
      >
        {composer.lastName}, {composer.firstName}
      </div>
    </a>
  );
};

function SearchInput() {
  return (
    <input
      class="m-1.5 h-8 w-[calc(100%-0.8rem)] appearance-none rounded-sm border-0 bg-black/10 px-1.5 py-4 text-black placeholder:font-light focus:outline-none dark:text-white/80"
      type="search"
      placeholder="Search composers by last name"
      onInput={handleSearchInput}
      use:autofocus
      autofocus
      role="searchbox"
    />
  );
}

function SearchResultOverlay() {
  return (
    <div
      role="link"
      tabindex="0"
      class="fixed inset-0 bg-black/35 backdrop-blur-sm"
      onKeyDown={handleKeydown}
    >
      <div
        class="dark:bg-mineshaft absolute left-[calc(50%-10rem)] top-32 w-80 rounded bg-white text-lg shadow-md"
        use:clickOutside={() => hideSearch()}
      >
        <SearchInput />
        <For each={searchResults()}>
          {(composer, i) => <ComposerLink composer={composer} i={i} />}
        </For>
      </div>
    </div>
  );
}

export function SearchComponent() {
  return (
    <>
      <SearchButton />
      <Show when={isSearchVisible()}>
        <SearchResultOverlay />
      </Show>
    </>
  );
}
