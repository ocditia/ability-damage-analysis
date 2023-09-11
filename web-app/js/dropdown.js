function changeOption(optionText, dropdownId) {
  var dropbtn = document.getElementById(dropdownId);
  dropbtn.textContent = optionText;
}

document.querySelectorAll('.option').forEach(function(element) {
  element.addEventListener('click', function(event) {
    changeOption(event.target.textContent, 'myDropdown');
    event.preventDefault();
  });
});
