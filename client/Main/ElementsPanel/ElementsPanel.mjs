import SearchBar from "./SearchBar/SearchBar.mjs"
import ElementsList from "./ElementsList/ElementsList.mjs"

export default class ElementsPanel {
	constructor() {
		this.el = document.createElement("div");
		this.el.classList.add("elements-panel");
		this.searchBar = new SearchBar();
		this.elementsList = new ElementsList();
		this.el.append(this.searchBar.el, this.elementsList.el);
	}
}