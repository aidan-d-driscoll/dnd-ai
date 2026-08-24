// Character Name
const nameBox = document.getElementById("characterName");
const nameError = document.getElementById("nameError");

nameBox.addEventListener("input", () => {
    if (nameBox.value.trim() === "") {
        nameError.textContent = "Please enter a character name.";
    } else {
        nameError.textContent = "";
    }
});

// Class Dropdown
const classBox = document.getElementById("characterClass");
const classError = document.getElementById("classError")

classBox.addEventListener("change", () => {
    if (classBox.value === "") {
        classError.textContent = "Please choose a class.";
    } else {
        classError.textContent = "";
    }
});

// Submit Protocol
const submitButton = document.getElementById("submitCharacter");
const submitMessage = document.getElementById("submitMessage");

submitButton.addEventListener("click", async () => {

    if (nameBox.value.trim() === "") {
        submitMessage.textContent = "Please enter a character name.";
        return;
    }
    
    if (classBox.value === "") {
        submitMessage.textContent = "Please choose a class.";
        return;
    }

    // Request made by browser occurs below, only if all previous fields succeeded upon button press.
    const character = {
        name: nameBox.value.trim(),
        class: classBox.value
    };

    const response = await fetch("/api/characters", { // This fetch is where the post request is actually made from browser.
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(character)
    });

    const result = await response.json(); // Takes the Node JSON response and converts it to a JS object.
    
    submitMessage.textContent = result.message;

})