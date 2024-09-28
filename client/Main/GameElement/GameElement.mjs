export default class Element {
	constructor(data) {
		this.data = data;

		this.el = document.createElement("div");
		this.el.classList.add("element");
		this.el.textContent = data.name;

		this.updateColor();
	}
	updateColor() {
		const color = this.data.unlocked ? this.data.color : "90909020";

		const red   = parseInt(color.substring(0, 2), 16);
		const green = parseInt(color.substring(2, 4), 16);
		const blue  = parseInt(color.substring(4, 6), 16);
		const brightness = 0.299*red + 0.587*green + 0.114*blue;

		this.el.style.backgroundColor = "#"+color;
		this.el.style.color = brightness > 128 ? "black" : "white";
	}
}