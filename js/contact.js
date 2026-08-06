const printButton = document.querySelector('#print-btn');
const paper = document.querySelector('.paper');

printButton.addEventListener('click', function () {
    paper.classList.add('printed');
});