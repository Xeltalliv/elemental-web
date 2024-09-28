export default class Storage {
	constructor() {
		this.elements = [];
		this.combinations = {};
		this.db = null;
		this.readyResolve = null;
		this.ready = new Promise((res) => this.readyResolve = res);

		const openRequest = indexedDB.open("elementalDB", 1);
		openRequest.onsuccess = () => {
			this.db = openRequest.result;
		}
		openRequest.onblocked = () => {
			alert("Error connecting to IndexedDB");
		}
		this.loadRaw();
	}
	async loadRaw() {
		const raw = await (await fetch("sampleResponse.json")).json();
		const by = new Set();
		for(const id in raw.elements) {
			const e = raw.elements[id];
			this.elements[id] = {
				id: +id,
				name: e.name,
				color: e.color.substring(3),
				time: e.time,
				by: e.by, 
				comments: raw.comments.count[id] ?? 0,
				unlocked: id < 4
			}
			by.add(e.by);
		}
		for(const id in raw.combinations) {
			const c = raw.combinations[id];
			this.combinations[c.from] = c.makes;
		}
		console.log(by);
		console.log(raw);
		this.readyResolve();
	}
}