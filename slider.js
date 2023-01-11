const contents = [
    './images/aI9N_qQbLoU.jpg',
    './images/q_x0pT3XFSg.jpg',
    './images/vtTLCsOcRrQ.jpg',
    './images/xaYsxffBsNs.jpg',
    './images/yX1EZIEdh7w.jpg',
    './images/53wRLkux6dA.jpg',
    './images/F3kTFWnrruc.jpg',
    './images/raX80tq_cEc.jpg',
];

const createElem = (tagName, className, attrs = {}, content) => {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    elem.textContent = content;

    if (attrs) {
        for (const [name, value] of Object.entries(attrs)) {
            elem.setAttribute(name, value);
        }
    }

    return elem;
};

const createSlider = (children) => {
    let slide = 0;
    let x = null;

    const nextSlide = () => {
        slide++;
        moveSlide();
    };

    const prevSlide = () => {
        slide--;
        moveSlide();
    };

    const onPointerDown = (e) => {
        x = e.clientX;
    };

    const onPointerUp = (e) => {
        if (x === null) return;

        const diff = Math.abs(x - e.clientX);
        if (diff < 50) return (x = null);

        if (x > e.clientX) nextSlide();
        else prevSlide();

        x = null;
    };

    const moveSlideOnKey = () => {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') prevSlide();
            else if (e.code === 'ArrowRight') nextSlide();
        });
    };

    const navigationToSlides = (index) => {
        slide = index;
        moveSlide();
    };

    const moveSlide = () => {
        const content = document.querySelector('.slider__content');

        const allNavigationButtons = document.querySelectorAll('.navigation__button');

        if (slide === children.length) slide = 0;

        if (slide < 0) slide = children.length - 1;

        const active = document.querySelector('.navigation__button-active');
        if (active !== null) active.classList.remove('navigation__button-active');

        allNavigationButtons[slide].classList.add('navigation__button-active');

        content.style.transform = `translate(${-slide * 100}%)`;
    };

    const drawSlider = () => {
        const slider = createElem('div', 'slider');
        const sliderContainer = createElem('div', 'slider__container');
        const sliderContent = createElem('div', 'slider__content');
        sliderContainer.appendChild(sliderContent);

        children.map((elem) => {
            const img = createElem('img', 'slider__content-img', { src: elem });
            sliderContent.appendChild(img);
        });

        sliderContainer.addEventListener('pointerdown', onPointerDown);
        document.body.addEventListener('pointerup', onPointerUp);

        slider.appendChild(sliderContainer);

        const nextButton = createElem('div', 'slider__button', null, '->');
        const prevButton = createElem('div', 'slider__button', null, '<-');

        const buttons = createElem('div', 'slider__buttons');

        buttons.appendChild(prevButton);

        children.map((_, index) => {
            const navButton = createElem('div', `navigation__button`);
            buttons.appendChild(navButton);

            navButton.addEventListener('click', (event) => {
                navigationToSlides(index);

                event.target.classList.add('navigation__button-active');
            });
        });

        buttons.appendChild(nextButton);

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        moveSlideOnKey();

        slider.appendChild(buttons);

        return slider;
    };

    document.body.prepend(drawSlider());
};

createSlider(contents);
