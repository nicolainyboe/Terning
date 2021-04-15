let tasks = [
    "Gå en tur",
    "Tag løbesko på",
    "Ring til en ven",
    "Lav en snack",
    "Tænd fjernsynet",
    "Tænd din kaffemaskine",
    "Skriv til et familiemedlem",
    "Lav en aftale",
    "Pluk en blomst",
    "Sæt musik på",
    "Gør noget du har udsat",
    "Mediter i 5 minutter",
    "Lav en ret du aldrig har lavet før",
    "Lyt til podcast",
    "Nedskriv din dag på 5 linjer",
    "Tag fat i opvaskebørsten",
    "Kig ud af vinduet i 5 minutter",
    "Sorter dine sokker",
    "Skriv et kort til en fra din familie",
    "Læg en kabale",
    "Gør rent ét sted i dit hjem",
    "Vand dine planter",
    "Skift sengetøj",
    "Sluk din telefon i 30 minutter",
    "Spis et stykke frugt",
    "Tag en powernap",
    "Læg et puslespil",
    "Bag noget",
    "Luft ud",
    "Plant noget",
    "Tag armbøjninger",
];

let valX;
let canIThrow = true;
let throws = 0;
let timeout = false;

let diceAudio = document.getElementById("myAudio");



function handleDeviceMotion(e) {
    valX = e.acceleration.x;
    valX = Math.floor(valX);
    let tolerance = 20;
    if (threshold(valX, tolerance)) {
        if (canIThrow == true && timeout == false) {

            let number = Math.floor(Math.random() * 31);

            diceAudio.muted = false;
            document.getElementById("title").style.visibility = "collapse";
            document.getElementById("activity-block").style.visibility = "visible";
            document.getElementById("buttons").style.visibility = "visible";
            document.getElementById("activity").innerHTML = tasks[number]
            throws++;
            diceAudio.play();
            if (throws == 2) {
                canIThrow = false;
                document.getElementById("nomorethrows").innerHTML = "Kom tilbage og prøv og ryst i morgen igen"
            }
            timeout = true;
            setTimeout(() => {
                timeout = false;
            }, 3000);
        }



    }
}

function startDeviceMotion() {
    document.getElementById("myAudio").muted = true;
    diceAudio.play();
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("devicemotion", handleDeviceMotion, false);
                    document.getElementById("start").style.visibility = "collapse";
                    document.getElementById("title").style.visibility = "visible";
                }
            })
            .catch(console.log("Vi har ikke fået adgang til DeviceMotion"));
    } //NON IOS device - just add the eventlistner
    else {
        window.addEventListener("devicemotion", handleDeviceMotion, false);
        document.getElementById("start").style.visibility = "collapse";
        document.getElementById("title").style.visibility = "visible";
    }
}