document.getElementById('tasteForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = localStorage.getItem('chipsTester') || 'Anoniem';
  const chipCode = document.getElementById('chipCode').value.trim();
  const flavor = parseInt(document.getElementById('flavor').value);
  const crunch = parseInt(document.getElementById('crunch').value);
  const salt = parseInt(document.getElementById('salt').value);

  const newScore = { name, chipCode, flavor, crunch, salt };

  const existingScores = JSON.parse(localStorage.getItem('chipsScores')) || [];
  existingScores.push(newScore);
  localStorage.setItem('chipsScores', JSON.stringify(existingScores));

  document.getElementById('tasteForm').reset();
  document.getElementById('message').textContent = 'Score opgeslagen! ✅';
});
