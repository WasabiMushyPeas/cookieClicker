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
