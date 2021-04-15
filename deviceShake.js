let valX;
let canIThrow = true;
let throws = -1;

function handleDeviceMotion(e) {
    valX = e.acceleration.x;
    valX = Math.floor(valX);
    console.log(valX)
    document.getElementById("nicodiv").innerHTML = "Your Acceleration " + valX;

    let tolerance = 20;
    if (threshold(valX, tolerance)) {
        if (canIThrow == true) {
            document.getElementById("random").innerHTML = Math.floor(Math.random() * 10)
            throws++;
            if (throws == 2) {
                canIThrow = false;
            }
        }

        // do stuff if the difference between val and previous value if greater than tolerance
    }
    document.getElementById("throw").innerHTML = "can i throw? " + canIThrow;

    let textMessage = ""
    if (throws == 0) {
        textMessage = "Du har 2 kast tilbage"
    } else if (throws == 1) {
        textMessage = "du har 1 kast tilbage, tør du kaste igen?"
    } else if (throws == 2) {
        textMessage = "Du har ikke flere kast tilbage"
    }

    document.getElementById("throwsleft").innerHTML = textMessage;
}


function startDeviceMotion() {

    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === "granted") {
                    window.addEventListener("devicemotion", handleDeviceMotion, false);
                }
            })
            .catch(console.log("Vi har ikke fået adgang til DeviceMotion"));
    } else //NON IOS device - just add the eventlistner
    {
        window.addEventListener("devicemotion", handleDeviceMotion, false);
    }
}