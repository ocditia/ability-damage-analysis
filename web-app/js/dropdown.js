const magicOpts = requre('./magic/utils/magic_const.js')

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


// Example dictionary
const myOptions = {
  option1: "Value 1",
  option2: "Value 2",
  option3: "Value 3"
  // Add more options as needed
};

// Function to populate the dropdown
function populateDropdown() {
  const dropdown = document.getElementById("myDropdown");

  for (const key in myOptions) {
      if (myOptions.hasOwnProperty(key)) {
          const option = document.createElement("option");
          option.value = key;
          option.text = myOptions[key];
          dropdown.appendChild(option);
      }
  }
}

// Call the function to populate the dropdown
populateDropdown();
