import CombinerElement from "./CombinerElement/CombinerElement.mjs"

import { getMainInstance } from "../../../mainInstance.mjs";

export default class ElementCombiner {
	constructor() {
		this.list = [];

		this.elementsList = document.createElement("div");
		this.elementsList.classList.add("element-combiner-list");

		this.combineButton = document.createElement("button");
		this.combineButton.textContent = "Combine";
		this.combineButton.classList.add("element-combiner-button");
		this.combineButton.addEventListener("click", this.combine.bind(this));

		this.el = document.createElement("div");
		this.el.classList.add("element-combiner");
		this.el.append(this.elementsList, this.combineButton);
	}
	addElement(id) {
		if (this.list.length >= 4) return;

		const elementData = getMainInstance().storage.elements[id];
		const element = new CombinerElement(elementData);
		this.elementsList.append(element.el);
		this.list.push(element);
	}
	removeElement(element) {
		const index = this.list.indexOf(element);
		if (index > -1) {
			this.list.splice(index, 1);
			element.el.remove();
		}
	}
	removeAllElements() {
		for(const element of this.list) {
			element.el.remove();
		}
		this.list = [];
	}
	combine() {
		const idList = [];
		for(const element of this.list) {
			idList.push(element.data.id);
		}
		const fromIds = idList.sort((a,b) => a-b).join(",");
		const resultId = getMainInstance().storage.combinations[fromIds];
		if (resultId !== undefined) {
			const result = getMainInstance().storage.elements[resultId];
			if (!result.unlocked) {
				result.unlocked = true;
				getMainInstance().elementsPanel.elementsList.updateColor(resultId);
				alert("Unlocked "+result.name);
			}
		}
		this.removeAllElements();
	}
}