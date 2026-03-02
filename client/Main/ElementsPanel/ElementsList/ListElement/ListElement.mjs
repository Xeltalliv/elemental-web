import GameElement from "../../../GameElement/GameElement.mjs"

import {getMainInstance} from "../../../../mainInstance.mjs"

export default class ListElement extends GameElement {
	constructor(data) {
		super(data);
		this.el.addEventListener("click", this.onClick.bind(this));
	}
	onClick() {
        if (!this.data.unlocked) return;
		getMainInstance().combinerPanel.elementCombiner.addElement(this.data.id);
	}
}