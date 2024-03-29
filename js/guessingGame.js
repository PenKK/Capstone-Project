//Enter key listener

function eventKey(e, func) {
    // console.log("key code: "+e.keyCode)
    if(e.keyCode == 13) {
        func();
    }
}

//Game

var guess;
var ans;
var el;
var triesCounter = 0;
var enterLocked = false;
var playLocked = false;

function play() {

    if(3>ElementId("range").value){
        if(!playLocked) {

            playLocked = true;
            notification("Enter a value of <br>at least 3");
            ElementId("play").style.color = "rgb(252, 50, 50)";
            
            setTimeout(function(){
                ElementId("play").style.color = "bisque";
            }, 500)

            setTimeout(function(){
                playLocked = false;
            }, 1000)
        }
    }

    else {
        ElementId("range").disabled = true;
        ElementId("play").disabled = true;
        ElementId("guess").disabled = false;
        ElementId("enter").disabled = false;
        ElementId("triesBox").style.opacity = "1";
        ans = Math.round(Math.random()*ElementId("range").value);
        // console.log(ans);
    }
}

function enterGuess() {

    if (!enterLocked) {

        clickSound.play();
        enterLocked = true;
        guess = ElementId("guess").value;

        if (guess == ans){
            triesCounter++;

            runAnimation('leftUpArrow');
            resetAnimation("leftUpArrow", "upArrow");

            runAnimation('rightUpArrow');
            resetAnimation("rightUpArrow", "upArrow");

            runAnimation('leftDownArrow');
            resetAnimation("leftDownArrow", "downArrow");

            runAnimation('rightDownArrow');
            resetAnimation("rightDownArrow", "downArrow");

            winGame();
        } 

        else if(guess>ans){
            runAnimation('leftDownArrow');
            resetAnimation("leftDownArrow", "downArrow");

            runAnimation('rightDownArrow');
            resetAnimation("rightDownArrow", "downArrow");

            triesCounter++;
        }

        else if(guess<ans) {
            runAnimation('leftUpArrow');
            resetAnimation("leftUpArrow", "upArrow");

            runAnimation('rightUpArrow');
            resetAnimation("rightUpArrow", "upArrow");

            triesCounter++;
        }

        updateTries();

        setTimeout(function() {
            enterLocked = false;
        }, 600);
        
    }

}

function updateTries() {
    ElementId("triesH2").innerHTML = triesCounter;
}

function winGame() {
    ElementId("triesText").innerHTML = "Congratulations you win!<br>It took you " + triesCounter +" tries";
    ElementId("triesBox").style.opacity = "0";
    document.getElementById('winBox').removeAttribute("hidden");
    ElementId("guess").disabled = true;
    document.getElementById('enter').disabled = true;
    checkAchievements();
}

//Local storage achievements

function checkAchievements() {
    if (ElementId("range").value > 9999 && triesCounter <= 15 && localStorage.getItem("MASTER_GUESSER") == "false") {
            localStorage.setItem("MASTER_GUESSER", true);
            notification("Achievement complete: Master Guesser!");
    } 
    
    else {
    if (ElementId("range").value > 999999 && triesCounter <= 20 && localStorage.getItem("GRANDMASTER_GUESSER") == "false") {
        localStorage.setItem("GRANDMASTER_GUESSER", true);
        notification("Achievement complete: Grandmaster Guesser!");
        }
    }
}

if (localStorage.getItem("MASTER_GUESSER") == null) {
    console.log("Guessing game achievements initialized");
    localStorage.setItem("MASTER_GUESSER", false);
    localStorage.setItem("GRANDMASTER_GUESSER", false);
}