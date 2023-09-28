let cookies = 0;
let totalCookies = 0;
let cookiesPerSecond = 0;

let grandmas = 0;
let grandmaCost = 10;

// how many times per second the game loop runs
let gameLoop = 2;
let transitionTime = 0.5;


function startGame(){
    loadGame();
    numberToOdometer(cookies);
    grandmaLoop();
}


// Cookie Clicker Button
function cookieClick() {
    cookies++;
    totalCookies++;
    numberToOdometer(cookies);
    saveGame();
}

// Buy Grandma Button
function buyGrandma(){
    if (cookies >= grandmaCost){
        // increase the cost of the next grandma by ((1/10000)x^e)+10
        grandmaCost = Math.floor((1/500 * Math.pow(grandmas, 2.718281828459045)) + 10);
        numberToOdometer(cookies);
        grandmas++;
        cookies -= grandmaCost;
        updateGrandmas();
    }
    saveGame();
    updateCookiesPerSecond();
}


// Grandma Loop 
async function grandmaLoop(){
    if(grandmas>0){
        cookieClick();
    }
    setTimeout(grandmaLoop, (1000/(grandmas+1)));
}



// Number to odometer
function numberToOdometer(number) {
    //check to see how many digits the number has
    let digits = number.toString().length;
    //create an array of digits
    let digitArray = number.toString().split("");


    //log
    // console.log("Number: " + number);
    // console.log("Digits: " + digits);
    // console.log("Digit Array: " + digitArray);

    //map the amount of digits to the amount of odometer digits hide the rest
    let odometerDigits = document.getElementsByClassName("zerosPlaceHolders");

    for (let i = 0; i < odometerDigits.length; i++) {
        if (i < digits) {
            odometerDigits[i].style.display = "block";
            // console.log("Displaying digit " + i);
        } else {
            odometerDigits[i].style.display = "none";
            // console.log("Hiding digit " + i);
        }
    }

    //translateY the odometer digits to the number
    for (let i = 0; i < digitArray.length+1; i++){
        // console.log("Setting " + digitArray[i] + " to " + i);

        odometerDigits[i].style.transform = "translateY(" + digitToPosition(parseInt(digitArray[i])+1) + "vw)";

        // Based on how fast the digit is moving, change the transition time 
        let tempTransitionTime = transitionTime - ((transitionTime * (i/(digitArray.length))));
        // if(i == digitArray.length && cookiesPerSecond > 15) {
        //     tempTransitionTime = 0;
        // }
        odometerDigits[i].style.transition = "transform " + tempTransitionTime.toString() + "s";


        // Get the all the p child of the odometer digit and set all of them to transparent except the one that is the number that is in focus
        let pChildren = odometerDigits[i].getElementsByTagName("p");
        for (let j = 0; j < pChildren.length; j++){
            if (j == parseInt(digitArray[i])){
                pChildren[j].style.opacity = "1";
            } else {
                pChildren[j].style.opacity = "0.2";
            }
        }
        
    }
    updateTotalCookies();
}

let zeroOffset = 32;
let numberSpacing = 6;


//translate the number to the position on the odometer
function digitToPosition(number){
    return zeroOffset - (numberSpacing * number);
}

// Update the number of cookies per second
function updateCookiesPerSecond(){
    cookiesPerSecond = grandmas*gameLoop;
    document.getElementById("amountOfCookiesPerSecond").innerHTML = cookiesPerSecond.toString() + " c/sec";
    document.getElementById("amountOfCookiesPerSecond").style.fontSize = "2vw";
}

// Update the number of grandmas
function updateGrandmas(){
    document.getElementById("amountOfGrandmas").innerHTML = "Grandmas: " + grandmas.toString();
    document.getElementById("amountOfGrandmas").style.fontSize = "2vw";
    document.getElementById("grandmaCost").innerHTML = "Buy Grandma ¢" + (Math.floor((1/500 * Math.pow(grandmas, 2.718281828459045)) + 10)).toString();
    document.getElementById("grandmaCost").style.fontSize = "2vw";
}

//Update the number of total cookies
function updateTotalCookies(){
    document.getElementById("amountOfCookies").innerHTML = "Total Cookies: " + totalCookies.toString();
    document.getElementById("amountOfCookies").style.fontSize = "2vw";
}

// Save the game in cookies that expire in 5 years
function saveGame(){
    let d = new Date();
    d.setTime(d.getTime() + (5*365*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "cookies=" + cookies.toString() + ";" + expires + ";path=/";
    document.cookie = "grandmas=" + grandmas.toString() + ";" + expires + ";path=/";
    document.cookie = "totalCookies=" + totalCookies.toString() + ";" + expires + ";path=/";
}

// Load the game from cookies
function loadGame(){
    let cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++){
        let cookie = cookieArray[i].split("=");
        //console.log(cookie);
        if (cookie[0] == " cookies"){
            cookies = parseInt(cookie[1]);
            console.log(cookies);
        } else if (cookie[0] == " grandmas"){
            grandmas = parseInt(cookie[1]);
            console.log(grandmas);
        } else if (cookie[0] == " totalCookies"){
            totalCookies = parseInt(cookie[1]);
            console.log(totalCookies);
        }
        console.log(cookie[0] + " " + " i:" + i);
    }

    updateCookiesPerSecond();
    updateTotalCookies();
    numberToOdometer(cookies);
    updateGrandmas();
}



window.onbeforeunload = closingCode;

function closingCode(){
    saveGame();
    return null;
}