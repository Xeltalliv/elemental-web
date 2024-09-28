import ListElement from "./ListElement/ListElement.mjs";

import {getMainInstance} from "../../../mainInstance.mjs"

export default class ElementsList {
	constructor() {
		this.sortProp = "id";
		this.sortDir = 1;
		this.searchQuery = "";
		this.object = {};
		this.list = [];
		this.filteredList = [];
		this.el = document.createElement("div");
		this.el.classList.add("elements-list");
		setTimeout(this.init.bind(this), 1);
	}
	async init() {
		const storage = getMainInstance().storage;
		await storage.ready;
		const elements = storage.elements;
		for(let i=0; i<elements.length; i++) {
			const el = new ListElement(elements[i])
			this.object[el.data.id] = el;
			this.list.push(el);
			this.filteredList.push(el);
		}
		this.addElements();
	}
	resort() {
		this.removeElements();
		const sortProp = this.sortProp;
		const sortDir = this.sortDir;
		const searchQuery = this.searchQuery;
		this.filteredList = searchQuery ?
			this.list.filter(e => e.data.name.toLowerCase().includes(searchQuery)) :
			this.list.filter(e => true);
		this.filteredList.sort((a,b) => {
			const aa = a.data[sortProp];
			const bb = b.data[sortProp];
			if (aa > bb) return sortDir;
			if (aa < bb) return -sortDir;
			return 0;
		});
		const unlocked=[], locked=[];
		for(const el of this.filteredList) {
			if(el.data.unlocked) {
				unlocked.push(el);
			} else {
				locked.push(el);
			}
		}
		this.filteredList = [];
		for(const el of unlocked) this.filteredList.push(el);
		for(const el of locked) this.filteredList.push(el);
		this.addElements();
	}
	addElements() {
		for(const element of this.filteredList) this.el.append(element.el);
	}
	removeElements() {
		for(const element of this.list) element.el.remove();
	}
	setDisplayOptions(search, propertyName, dir) {
		this.sortProp = propertyName;
		this.sortDir = dir;
		this.searchQuery = search.toLowerCase();
		this.resort();
	}
	updateColor(id) {
		if (!this.object[id]) return;
		this.object[id].updateColor();
		this.resort();
	}
}