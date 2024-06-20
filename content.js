function state() { console.log("State Changed!"); }
var player = document.getElementById("movie_player");
player.addEventListener("onStateChange", "state");
console.log("Started!");
console.log(window.rapidContext)