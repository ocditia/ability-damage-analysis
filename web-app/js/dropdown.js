function changeOption (optionText, dropdownId) {
  const dropdownButton = document.getElementById(dropdownId);
  dropdownButton.textContent = optionText;
}

document.querySelectorAll('.option').forEach(function (element) {
  element.addEventListener('click', function (event) {
    changeOption(event.target.textContent, 'myDropdown');
    event.preventDefault();
  });
});
