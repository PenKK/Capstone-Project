if (localStorage.getItem("HarrHarrTime") == null) {
    console.log("Harr harr initialized");
    localStorage.setItem("HarrHarrTime", "0");
}

//Page transfering

gg = () => {
    setTimeout(() => {
        window.location.href = "guessing-game.html";
    }, pageChangeDelay);	
}

rps = () => {
    setTimeout(() => {
        window.location.href = "rock-paper-scissors.html";
    }, pageChangeDelay);	
}

ttt = () => {
    setTimeout(() => {
        window.location.href = "tic-tac-toe.html";
    }, pageChangeDelay);	
}

tft = () => {
    setTimeout(() => {
        window.location.href = "2048.html";
    }, pageChangeDelay);
}

ach = () => {
    setTimeout(() => {
        window.location.href = "achievements.html";
    }, pageChangeDelay);
}

cont = () => {
    setTimeout(() => {
        window.location.href = "controls.html";
    }, pageChangeDelay);
}