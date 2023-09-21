let cookies = 0;
let grandmas = 0;



// Number to odometer
function numberToOdometer(number) {
    //check to see how many digits the number has
    let digits = number.toString().length;
    //create an array of digits
    let digitArray = number.toString().split("");


    //log
    console.log("Number: " + number);
    console.log("Digits: " + digits);
    console.log("Digit Array: " + digitArray);

    //map the amount of digits to the amount of odometer digits hide the rest
    let odometerDigits = document.getElementsByClassName("zerosPlaceHolders");
    for (let i = 0; i < odometerDigits.length; i++) {
        if (i < digits) {
            odometerDigits[i].style.display = "block";
            console.log("Displaying digit " + i);
        } else {
            odometerDigits[i].style.display = "none";
            console.log("Hiding digit " + i);
        }
    }

    //translateY the odometer digits to the number
    for (let i = 0; i < digitArray.length+1; i++){
        console.log("Setting " + digitArray[i] + " to " + i);
        odometerDigits[i].style.transform = "translateY(" + digitToPosition(parseInt(digitArray[i])+1) + "vw)";
    }
}

let zeroOffset = 26.8;
let numberSpacing = 6;

function digitToPosition(number){
    return zeroOffset - (numberSpacing * number);
}

// function positionToDigit(position){
//     return (zeroOffset - position) / numberSpacing;
// }

// // Function that linearly animates from one digitToPosition to another and returns the value
// function animateDigitToPosition(start, end, duration) {
//     let difference = end - start;
//     let startTime = new Date().getTime();
//     let endTime = startTime + duration;
//     let current = start;
//     let step = function () {
//         let now = new Date().getTime();
//         let remaining = Math.max((endTime - now) / duration, 0);
//         current = end - (remaining * difference);
//         return current;
//     };
//     return step();
// }

numberToOdometer(10231);
