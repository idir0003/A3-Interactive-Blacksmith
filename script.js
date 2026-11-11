
// MTM6302 — A3: Interactive Blacksmith
// The Tiny Forge


// 1. Select the forge information from the page.

const forge = document.getElementById("forge");
const forgeImage = document.getElementById("forge-image");
const forgeStatus = document.getElementById("forge-status");
const heatValue = document.getElementById("heat-value");
const swordCount = document.getElementById("sword-count");
const actionMessage = document.getElementById("action-message");


// Select the interactive controls.

const heatInput = document.getElementById("heat-input");
const addHeatButton = document.getElementById("add-heat");
const makeSwordButton = document.getElementById("make-sword");
const resetForgeButton = document.getElementById("reset-forge");


// 2. Create the two changing numbers.

let forgeHeat = 20;
let swordsMade = 0;


// 3. Choose the forge status using the heat number.

function getForgeStatus(heatValue) {

    if (heatValue < 30) {
        return "Too cold";
    } else if (heatValue < 70) {
        return "Ready to forge";
    } else {
        return "Roaring fire";
    }

}


// 4. Update the forge display.

function updateForge() {

    heatValue.textContent = forgeHeat;
    swordCount.textContent = swordsMade;

    const status = getForgeStatus(forgeHeat);

    forgeStatus.textContent = status;

    // Remove the previous forge status classes.

    forge.classList.remove("is-cold");
    forge.classList.remove("is-ready");
    forge.classList.remove("is-roaring");


    // Change the class and image depending on the forge status.

    if (status === "Too cold") {

        forge.classList.add("is-cold");

        forgeImage.setAttribute("src", "assets/forge-cold.svg");

        forgeImage.setAttribute(
            "alt",
            "A stone forge with dark coals and no flames"
        );

    } else if (status === "Ready to forge") {

        forge.classList.add("is-ready");

        forgeImage.setAttribute("src", "assets/forge-ready.svg");

        forgeImage.setAttribute(
            "alt",
            "A stone forge with a small orange fire"
        );

    } else {

        forge.classList.add("is-roaring");

        forgeImage.setAttribute("src", "assets/forge-roaring.svg");

        forgeImage.setAttribute(
            "alt",
            "A stone forge with tall bright flames and sparks"
        );

    }

}


// 5. Reset the forge.

function resetForge() {

    forgeHeat = 20;

    swordsMade = 0;

    // Clear the input and previous feedback.

    heatInput.value = "";

    actionMessage.textContent = "";

    updateForge();

}


// 6. Heat the forge.

function heatForge(amount) {

    forgeHeat = forgeHeat + amount;

    // Do not let the forge go above 100 heat.

    if (forgeHeat > 100) {
        forgeHeat = 100;
    }

    actionMessage.textContent =
        "Heating complete. The forge is at " + forgeHeat + " heat.";

    updateForge();

}


// 7. Make a sword.

function makeSword() {

    if (forgeHeat >= 30) {

        forgeHeat = forgeHeat - 30;

        swordsMade = swordsMade + 1;

        actionMessage.textContent = "Success! You made a sword.";

    } else {

        actionMessage.textContent =
            "The forge is too cold. Add more heat before making a sword.";

    }

    updateForge();

}


// 8. Connect the buttons using event listeners.


// Add heat button.

addHeatButton.addEventListener("click", function () {

    // Read the input and convert it to a number.

    const amount = Number(heatInput.value);

    // Check if the input is a positive whole number.

    if (
        heatInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        !Number.isInteger(amount) ||
        amount <= 0
    ) {

        actionMessage.textContent =
            "Please enter a positive whole number.";

        return;

    }

    // Add heat using the existing function.

    heatForge(amount);

    // Clear the input after adding heat.

    heatInput.value = "";

});


// Make sword button.

makeSwordButton.addEventListener("click", function () {

    makeSword();

});


// Reset forge button.

resetForgeButton.addEventListener("click", function () {

    resetForge();

});


// 9. Start the forge in its starting state.

resetForge();
