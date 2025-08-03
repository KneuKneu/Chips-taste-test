localStorage.setItem("currentChip", "A"); // Default chip
const defaultButtonClass = "btn btn-outline-secondary m-1"; // Default button class

document.getElementById("tasteForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  saveChipsResult();
});


// Load chips from JSON file and populate the select dropdown
document.addEventListener("DOMContentLoaded", function () {
  fetch("data/chips.json")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("chipSelect");
      data.forEach((chip) => {
        const option = document.createElement("option");
        option.value = chip.code;
        option.textContent = chip.name;
        select.appendChild(option);
      });
    });
});

function saveChipsResult() {
  // Get the current chip data from the form inputs
  const chipsResult = JSON.parse(localStorage.getItem("ChipsResult")) || [];
  const currentChip = localStorage.getItem("currentChip");
  console.log(
    `Current chip: ${currentChip} + ${parseInt(
      document.getElementById("flavor").value
    )}`
  );
  if (currentChip) {
    const chipData = chipsResult.find((chip) => chip.name === currentChip);
    if (chipData) {
      // Update existing chip data
      chipData.flavor = parseInt(document.getElementById("flavor").value);
      chipData.crunch = parseInt(document.getElementById("crunch").value);
      chipData.salt = parseInt(document.getElementById("salt").value);
      // save in localStorage
      localStorage.setItem("ChipsResult", JSON.stringify(chipsResult));
    } else {
      // Add new chip data
      chipsResult.push({
        name: currentChip,
        flavor: parseInt(document.getElementById("flavor").value),
        crunch: parseInt(document.getElementById("crunch").value),
        salt: parseInt(document.getElementById("salt").value),
      });
    }
    localStorage.setItem("ChipsResult", JSON.stringify(chipsResult));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // ...existing code for chips.json...

  const sliders = [
    { id: "flavor", valueId: "flavorValue" },
    { id: "crunch", valueId: "crunchValue" },
    { id: "salt", valueId: "saltValue" },
  ];
  sliders.forEach((slider) => {
    const input = document.getElementById(slider.id);
    const output = document.getElementById(slider.valueId);
    input.addEventListener("input", function () {
      output.textContent = input.value;
    });
  });
});

// select chipsresult from localStorage

// loop through chipsResult and add a button for each chip
const chipsResult = JSON.parse(localStorage.getItem("ChipsResult")) || [];
const chipName = document.getElementById("chipName");
chipName.innerHTML = "Chip " + chipsResult[0].name;

// create a button for each chip in chipsResult
// Create a new div to hold the buttons
const chipsButtonDiv = document.createElement("div");
chipsButtonDiv.id = "chipsButtonDiv";

// Create a button for each chip in chipsResult
chipsResult.forEach((chip) => {
  const button = document.createElement("button");
  button.textContent = chip.name;
  button.id = `chip-${chip.name}`;
  button.value = chip.name; // You can use chip.code if you prefer
  button.className = defaultButtonClass; // Add Bootstrap classes for styling
  button.style.margin = "5px"; // Add some margin for spacing
  button.type = "button"; // Set button type to button

  // Add an event listener to handle button clicks
  button.addEventListener("click", () => {
    console.log(`Selected chipppp: ${chip.name}`);
    document.getElementById(`chip-${chip.name}`).className =
      "btn btn-primary m-1";
    localStorage.setItem("currentChip", chip.name); // Set the value of the select element
    chipName.innerHTML = "Chip " + chip.name; // Update the chip name display
    // Reset all other buttons to default style
    chipsResult.forEach((otherChip) => {
      if (otherChip.name !== chip.name) {
        document.getElementById(`chip-${otherChip.name}`).className =
          defaultButtonClass;
      }
    });
    //set values for chip.name from chipsResult
    console.log(`Selected chips: ${chip.flavor}, ${chip.crunch}, ${chip.salt}`);
    document.getElementById("flavor").value = chip.flavor || 5;
    document.getElementById("crunch").value = chip.crunch || 5;
    document.getElementById("salt").value = chip.salt || 5;
        console.log(`Selected chips: ${chip.flavor}, ${chip.crunch}, ${chip.salt}`);

  });
  chipsButtonDiv.appendChild(button);
});

// Append the div after the id="salt-div"
document.getElementById("salt-div").appendChild(document.createElement("hr"));
document.getElementById("salt-div").appendChild(chipsButtonDiv);

function clearLocalStorage() {
  localStorage.removeItem("ChipsResult");
  localStorage.removeItem("currentChip");
  localStorage.removeItem("chipsTester");
  localStorage.removeItem("ChipSelectAmount");
  document.getElementById("chipName").innerHTML = "Chip";
  document.getElementById("tasteForm").reset();
  window.location.href = "index.html";
}