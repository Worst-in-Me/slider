const wrapper = document.querySelector('.wrapper');
const content = document.querySelector('.content');

let position = 0;

const createButton = (name, content) => {
    const button = document.createElement('div');

    button.classList.add('button', name);
    button.textContent = content;

    return button;
};

const nextSlide = () => () => {
    position--;

    if (position < -1) position = 1;
    content.style.transform = `translate(${position * 100}%)`;
};

const prevSlide = () => () => {
    position++;

    if (position > 1) position = -1;
    content.style.transform = `translate(${position * 100}%)`;
};

const createSlider = (elem) => {
    const prevButton = createButton('prevButton', '< prev');
    const nextButton = createButton('nextButton', 'next >');
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    prevButton.addEventListener('click', prevSlide());
    nextButton.addEventListener('click', nextSlide());

    buttons.append(prevButton, nextButton);

    elem.append(buttons);
};

createSlider(wrapper);
