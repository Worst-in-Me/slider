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

const createButton = (tagName, className, content) => {
    const button = document.createElement(tagName);
    button.classList.add(className);
    button.textContent = content;

    return button;
};

const createSlider = (children) => {
    let slide = 0;
    let x = null;

    const onPointerDown = (e) => {
        x = e.clientX;
    };

    const onPointerUp = (e) => {
        if (x === null) return;

        const diff = Math.abs(x - e.clientX);
        if (diff < 50) return (x = null);

        if (x > e.clientX) {
            slide++;
            moveSlide();
        } else {
            slide--;
            moveSlide();
        }

        x = null;
    };

    const moveSlideOnKey = () => {
        document.addEventListener('keydown', (e) => {
            const key = e.code;

            if (key === 'ArrowLeft') {
                slide--;
                moveSlide();
            } else if (key === 'ArrowRight') {
                slide++;
                moveSlide();
            }
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
        const slider = document.createElement('div');
        slider.classList.add('slider');

        const slider__container = document.createElement('div');
        slider__container.classList.add('slider__container');

        const sliderContent = document.createElement('div');
        sliderContent.classList.add('slider__content');
        slider__container.appendChild(sliderContent);

        children.map((elem) => {
            const img = document.createElement('img');
            img.src = elem;
            img.classList.add('slider__content-img');
            sliderContent.appendChild(img);
        });

        slider__container.addEventListener('pointerdown', onPointerDown);
        document.body.addEventListener('pointerup', onPointerUp);

        slider.appendChild(slider__container);

        const nextButton = createButton('div', 'slider__button', '->');
        const prevButton = createButton('div', 'slider__button', '<-');

        const buttons = document.createElement('div');
        buttons.classList.add('slider__buttons');

        buttons.appendChild(prevButton);

        children.map((_, index) => {
            const navButton = createButton('div', `navigation__button`);
            buttons.appendChild(navButton);

            navButton.addEventListener('click', (event) => {
                navigationToSlides(index);

                event.target.classList.add('navigation__button-active');
            });
        });

        buttons.appendChild(nextButton);

        nextButton.addEventListener('click', () => {
            slide++;
            moveSlide();
        });

        prevButton.addEventListener('click', () => {
            slide--;
            moveSlide();
        });

        moveSlideOnKey();

        slider.appendChild(buttons);

        return slider;
    };

    document.body.prepend(drawSlider());
};

createSlider(contents);
