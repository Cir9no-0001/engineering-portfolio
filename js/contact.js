/* Printer code below */

// Select print button and paper element
const printButton = document.querySelector('#print-btn');
const paper = document.querySelector('.paper');

// Listen for click on print button to print
printButton.addEventListener('click', function () {
    paper.classList.add('printed');
});