import "./styles.css";
import { render } from "solid-js/web";

import { SearchComponent } from "@components/Search";

const target = document.getElementById("search");
if (target) {
  render(SearchComponent, target);
}
