let cookies = 0;
let grandmas = 0;

function bakeCookie() {
    cookies += 1;
    document.getElementById("cookies").innerHTML = cookies;
}

function buyGrandma() {
    grandmas += 1;
    cookies -= 100;
    document.getElementById("grandmas").innerHTML = grandmas;
    document.getElementById("cookies").innerHTML = cookies;
    grandmaBakeCookie();
}

function grandmaBakeCookie(){
    while(true){
    cookies += grandmas;
    document.getElementById("cookies").innerHTML = cookies;
    setTimeout(grandmaBakeCookie, 1);
    grandmaBakeCookie();
    }

}



// Number to odometer
function numberToOdometer(number) {
    //check to see how many digits the number has
    let digits = number.toString().length;
    //create an array of digits
    let digitArray = number.toString().split("");
    //map the amount of digits to the amount of odometer digits hide the rest
    let odometerDigits = document.getElementsByClassName("zerosPlaceHolders");
    for (let i = 0; i < odometerDigits.length; i++) {
        if (i < digits) {
            odometerDigits[i].style.display = "block";
        } else {
            odometerDigits[i].style.display = "none";
        }
    }

    //translateY the odometer digits to the number
    for (let i = 0; i < digitArray.length; i++){
        //Switch case statement to translate the digits to the correct number
        switch (i) {
            case 1:
                odometerDigits[i].style.transform = "translateY(0px)";
                break;
            case 2:
                odometerDigits[i].style.transform = "translateY(-100px)";
                break;
            case 3:
                odometerDigits[i].style.transform = "translateY(-200px)";
                break;
            case 4:
                odometerDigits[i].style.transform = "translateY(-300px)";
                break;
            case 5:
                odometerDigits[i].style.transform = "translateY(-400px)";
                break;
            case 6:
                odometerDigits[i].style.transform = "translateY(-500px)";
                break;
            case 7:
                odometerDigits[i].style.transform = "translateY(-600px)";
                break;
            case 8:
                odometerDigits[i].style.transform = "translateY(-700px)";
                break;
            case 9:
                odometerDigits[i].style.transform = "translateY(-800px)";
                break;
            case 10:
                odometerDigits[i].style.transform = "translateY(-900px)";
                break;
        }
    }
}

numberToOdometer(12345);
