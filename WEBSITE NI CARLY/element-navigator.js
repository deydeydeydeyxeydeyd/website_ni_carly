function next() {
    essentialElements.classList.add('switch-windows');
    compoundElements.classList.add('switch-windows');
    header.querySelector('h1').textContent = 'Compound Elements';

    nextButton.classList.add('hidden');
    prevButton.classList.remove('hidden');
}

function prev() {
    essentialElements.classList.remove('switch-windows');
    compoundElements.classList.remove('switch-windows');
    header.querySelector('h1').textContent = 'Essential Elements';

    nextButton.classList.remove('hidden');
    prevButton.classList.add('hidden');
}

const section = document.querySelector('section#elements');
const header = document.querySelector('section#elements #header');
const nextButton = section.querySelector('button ~ button');
const prevButton = section.querySelector('button');
const essentialElements = document.querySelector('#essential-elements');
const compoundElements = document.querySelector('#compound-elements');
let overflow = false;

section.style.overflow = 'hidden';
prevButton.classList.add('hidden');

nextButton.addEventListener('click', () => {
    next();
    overflow = true;
});

prevButton.addEventListener('click', () => {
    prev();
    overflow = false;
    section.style.overflow = 'hidden';
});

essentialElements.addEventListener('transitionend', () => {
    section.style.overflow = overflow
        ? 'unset'
        : 'hidden'
});