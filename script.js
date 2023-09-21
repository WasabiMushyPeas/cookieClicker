let cookies = 0;
let grandmas = 0;


function cookieClick() {
    cookies++;
    numberToOdometer(cookies);
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
}

let zeroOffset = 26.8;
let numberSpacing = 6;


//translate the number to the position on the odometer
function digitToPosition(number){
    return zeroOffset - (numberSpacing * number);
}


