import Main from "./Main/Main.mjs";

alert("GoVed/Shurikun's 'Elemental' game for Android was about combining elements to unlock new elements, with the catch that all elements other than the first 4 were suggested by the players and automatically added into the game upon reaching enough votes. The original game shut down and is no longer playable. This is an unofficial static offline preservation project of data from it without any accounts or voting systems.");

const main = new Main();

window.main = main;

function getMainInstance() {
	return main;
}

export {getMainInstance};