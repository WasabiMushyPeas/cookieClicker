let cookies = 0;
let totalCookies = 0;
let cookiesPerSecond = 0;

let grandmas = 0;
let grandmaCost = 10;

// how many times per second the game loop runs
let gameLoop = 2;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Cookie Clicker Button
function cookieClick() {
    cookies++;
    totalCookies++;
    numberToOdometer(cookies);
}

// Buy Grandma Button
function buyGrandma(){
    if (cookies >= grandmaCost){
        // increase the cost of the next grandma by ((1/10000)x^e)+10
        grandmaCost = Math.floor((1/500 * Math.pow(grandmas, 2.718281828459045)) + 10);
        console.log(grandmaCost);
        document.getElementById("amountOfGrandmas").innerHTML = "Grandmas: " + grandmas.toString();
        document.getElementById("amountOfGrandmas").style.fontSize = "2vw";
        document.getElementById("grandmaCost").innerHTML = "Buy Grandma ¢" + grandmaCost.toString();
        document.getElementById("grandmaCost").style.fontSize = "2vw";
        numberToOdometer(cookies);
        grandmas++;
        cookies -= grandmaCost;
    }
    updateCookiesPerSecond();
}


// Grandma Loop 
async function grandmaLoop(){
    cookies += grandmas;
    totalCookies += grandmas;
    numberToOdometer(cookies);
    setTimeout(grandmaLoop, (1000/gameLoop));
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

let zeroOffset = 33;
let numberSpacing = 6.1;


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

//Update the number of total cookies
function updateTotalCookies(){
    document.getElementById("amountOfCookies").innerHTML = "Total Cookies: " + totalCookies.toString();
    document.getElementById("amountOfCookies").style.fontSize = "2vw";
}


numberToOdometer(cookies);
grandmaLoop();
