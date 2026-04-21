document.querySelectorAll('.character-item').forEach(item => {
  item.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});