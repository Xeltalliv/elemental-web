import { getMainInstance } from "../../../mainInstance.mjs";

const OrderingTypes = [
	{name: "Id",       prop: "id"},
	{name: "Unlocked", prop: "unlocked"},
	{name: "Name",     prop: "name"},
	{name: "Created",  prop: "time"},
	{name: "Comments", prop: "comments"}
]

export default class SearchBar {
	constructor() {
		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.placeholder = "Search element";
		this.input.classList.add("elements-search-input");
		this.input.addEventListener("keyup", this.onKeyUp.bind(this));
		this.search = "";

		this.orderingType = document.createElement("button");
		this.orderingType.classList.add("elements-search-button");
		this.orderingType.addEventListener("click", this.onClickOrderingType.bind(this));
		this.orderingTypeIndex = 0;
		this.updateOrderingType();

		this.orderingDir = document.createElement("button");
		this.orderingDir.classList.add("elements-search-button");
		this.orderingDir.addEventListener("click", this.onClickOrderingDir.bind(this));
		this.orderingDirValue = 1;
		this.updateOrderingDir();

		this.el = document.createElement("div");
		this.el.classList.add("elements-search-div");
		this.el.append(this.input, this.orderingType, this.orderingDir);
	}
	updateOrderingType() {
		this.orderingType.textContent = OrderingTypes[this.orderingTypeIndex].name;
	}
	updateOrderingDir() {
		this.orderingDir.textContent = this.orderingDir > 0 ? "V" : "^";
	}
	onClickOrderingType() {
		this.orderingTypeIndex++;
		if (this.orderingTypeIndex >= OrderingTypes.length) this.orderingTypeIndex = 0;
		this.updateList();
		this.updateOrderingType();
	}
	onClickOrderingDir() {
		this.orderingDirValue = -this.orderingDirValue;
		this.updateList();
		this.updateOrderingDir();
	}
	onKeyUp(event) {
		if (event.key == "Enter") {
			this.search = this.input.value;
			this.updateList();
		}
	}
	updateList() {
		getMainInstance().elementsPanel.elementsList.setDisplayOptions(this.search, OrderingTypes[this.orderingTypeIndex].prop, this.orderingDirValue);
	}
}