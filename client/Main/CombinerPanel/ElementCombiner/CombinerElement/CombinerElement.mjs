import GameElement from "../../../GameElement/GameElement.mjs";

import { getMainInstance } from "../../../../mainInstance.mjs";

export default class CombinerElement extends GameElement {
	constructor(data) {
		super(data);
		this.el.addEventListener("click", this.onClick.bind(this));
	}
	onClick() {
		getMainInstance().combinerPanel.elementCombiner.removeElement(this);
	}
}