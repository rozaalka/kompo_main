const collage = document.getElementById("collage");

const layers = [];

for (let i = 1; i <= 19; i++) {
    const img = document.createElement("img");

    const number = String(i).padStart(2, "0");

    img.src = `images/layer_${number}.png`;
    img.className = "layer";

    const depth = i / 19;

    img.dataset.depth = depth;

    collage.appendChild(img);
    layers.push(img);
}
// NIERUCHOMA RAMKA

const frame = document.createElement("img");

frame.src = "images/frame.png";
frame.id = "frame";

collage.appendChild(frame);

function moveLayers(x, y) {

    layers.forEach((layer) => {

        const depth = Number(layer.dataset.depth);

        const moveX = x * depth * 30;
        const moveY = y * depth * 30;

        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}


function handleOrientation(event) {

    const x = event.gamma / 45;
    const y = event.beta / 45;

    moveLayers(x, y);
}


function startMotion() {

    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {

        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {

                if (permissionState === "granted") {
                    window.addEventListener(
                        "deviceorientation",
                        handleOrientation
                    );
                }

            })
            .catch(console.error);

    } else {

        window.addEventListener(
            "deviceorientation",
            handleOrientation
        );
    }
}


const motionButton = document.getElementById("motionButton");

motionButton.addEventListener("click", () => {
    startMotion();
    motionButton.style.display = "none";
});
