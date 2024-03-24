import "./styles.css";

import Search from "./components/Search.svelte";

const target = document.getElementById("search");
if (target) {
  new Search({ target });
}
