document.getElementById('nameForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('username').value.trim();
  localStorage.setItem('chipsTester', name);
  window.location.href = 'taste.html';
});