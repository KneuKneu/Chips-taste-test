// Note: This code is part of a simple chips tasting application.
// It allows users to select chips, rate them, and store their scores in localStorage.

// Express is not used in this context, but could be used for a server-side implementation if needed.
// import express from 'express';
// const app = express();
// const PORT = process.env.PORT || 3000;

document.getElementById('nameForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('username').value.trim();
  localStorage.setItem('chipsTester', name);

  // add the values of the input fields of each chip to ChipsResult in localStorage
  const chipsResult = JSON.parse(localStorage.getItem('ChipsResult')) || [];

  for (let i = 0; i < chipsResult.length; i++) {
    const chipInput = document.getElementById(`chip${i}`);
    if (chipInput) {
      chipsResult[i].value = chipInput.value.trim();
    }
  }

  localStorage.setItem('ChipsResult', JSON.stringify(chipsResult));

  // Redirect to the tasting page after saving the name
  // This is done here instead of in taste.js because the user might NOT have entered a name
  // and we want to ensure the name is saved before navigating.

  window.location.href = 'taste.html';
});

// needed/used?

// Load username from localStorage if exists
// To ensure username is saved before navigating to the tasting page
// This is done here instead of in taste.js because the user might NOT have entered a name
document.addEventListener('DOMContentLoaded', function() {  
  const name = localStorage.getItem('chipsTester');
  if (name) {
    document.getElementById('username').value = name;
  }
});

// event listener for button to select chips
document.getElementById('chips').addEventListener('click', () => {

  // delete all chips from chipSelection / Clear
  document.getElementById('chipSelection').innerHTML = '';

  // get the amount of chips from input field
  const amount = parseInt(document.getElementById('ChipSelectAmount').value);
  localStorage.setItem('ChipSelectAmount', amount);
  // create ChipsResult array in LocalStorage
  localStorage.setItem('ChipsResult', JSON.stringify([]));
  // fill array with chipsselect amount
  const chipsResult = Array.from({ length: amount }, () => ({}));
  localStorage.setItem('ChipsResult', JSON.stringify(chipsResult)); 
  // add A-Z to chipsresult
  const chipsResultArray = JSON.parse(localStorage.getItem('ChipsResult'));
  chipsResultArray.forEach((chip, index) => {
    chip.name = String.fromCharCode(65 + index); // A-Z
  });
  localStorage.setItem('ChipsResult', JSON.stringify(chipsResultArray));

  
  const chipAmount = parseInt(document.getElementById('ChipSelectAmount').value);
  // console.log(`Selected amount of chips: ${chipAmount}`);

  // loop through chipsResult and add a textfield for each chip
  for (let i = 0; i < chipAmount; i++) {
    const chipsResult = JSON.parse(localStorage.getItem('ChipsResult'));
    console.log(`ChipsResult before: ${chipsResult[i]}`);
    // create insert field for each chip
    const chipDiv = document.createElement('div');
    chipDiv.classList.add('form-check');
    chipDiv.innerHTML = `
    <label class="form-label" for="chip${i}">${chipsResult[i].name}</label>
    <input type="text" id="chip${i}" class="form-control">
`;
    document.getElementById('chipSelection').appendChild(chipDiv);
  }

});