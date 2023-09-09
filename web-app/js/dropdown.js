function changeOption(optionText, dropdownId) {
  var dropbtn = document.getElementById(dropdownId);
  dropbtn.textContent = optionText;
}

window.addEventListener('load', function () {
  changeOption('Elder overload', 'potionDropdown');
});
