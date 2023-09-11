document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('numberInput');
  
    numberInput.addEventListener('keypress', function(event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      const value = this.value;
      
      if ((charCode < 48 || charCode > 57) && (charCode !== 46 || value.indexOf('.') !== -1)) {
        event.preventDefault();
      }
    });
  
    numberInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1');
    });
  });
  