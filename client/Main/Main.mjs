import ElementsPanel from "./ElementsPanel/ElementsPanel.mjs";
import CombinerPanel from "./CombinerPanel/CombinerPanel.mjs";
import Storage from "./Data/Storage.mjs";

export default class Main {
	constructor() {
		this.storage = new Storage();
		this.el = document.createElement("div");
		this.el.classList.add("main");
		this.elementsPanel = new ElementsPanel();
		this.combinerPanel = new CombinerPanel();
		this.el.append(this.elementsPanel.el, this.combinerPanel.el);
		document.body.append(this.el);
	}
}