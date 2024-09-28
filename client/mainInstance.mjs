import Main from "./Main/Main.mjs";

const main = new Main();

window.main = main;

function getMainInstance() {
	return main;
}

export {getMainInstance};