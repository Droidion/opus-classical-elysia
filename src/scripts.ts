import "./styles.css";

import Search from "./components/Search.svelte";

const search = new Search({
  target: document.getElementById("search")!,
});

export default search;
