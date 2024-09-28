import ElementCombiner from "./ElementCombiner/ElementCombiner.mjs";

export default class RightPanel {
	constructor() {
		this.elementCombiner = new ElementCombiner();
		this.el = document.createElement("div");
		this.el.classList.add("right-panel");
		this.el.append(this.elementCombiner.el);
	}
}