document.getElementById('tasteForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = localStorage.getItem('chipsTester') || 'Anoniem';
  const chipSelect = document.getElementById('chipSelect').value.trim();
  const flavor = parseInt(document.getElementById('flavor').value);
  const crunch = parseInt(document.getElementById('crunch').value);
  const salt = parseInt(document.getElementById('salt').value);

  const newScore = { name, chipSelect, flavor, crunch, salt };

  const existingScores = JSON.parse(localStorage.getItem('chipsScores')) || [];
  existingScores.push(newScore);
  localStorage.setItem('chipsScores', JSON.stringify(existingScores));

  document.getElementById('tasteForm').reset();
  document.getElementById('message').textContent = 'Score opgeslagen! ✅';
});
document.addEventListener('DOMContentLoaded', function() {
  fetch('data/chips.json')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('chipSelect');
      data.forEach(chip => {
        const option = document.createElement('option');
        option.value = chip.code;
        option.textContent = chip.name;
        select.appendChild(option);
      });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // ...existing code for chips.json...

  const sliders = [
    { id: 'flavor', valueId: 'flavorValue' },
    { id: 'crunch', valueId: 'crunchValue' },
    { id: 'salt', valueId: 'saltValue' }
  ];
  sliders.forEach(slider => {
    const input = document.getElementById(slider.id);
    const output = document.getElementById(slider.valueId);
    input.addEventListener('input', function() {
      output.textContent = input.value;
    });
  });
});