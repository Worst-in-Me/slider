const el = (tagName = 'div', elem = '', attrs = {}, listeners = {}) => {
    const element = document.createElement(tagName);

    if (typeof attrs === 'string') element.className = attrs;
    else
        for (const [key, value] of Object.entries(attrs))
            element.setAttribute(key, value);

    for (const [key, value] of Object.entries(listeners))
        element.addEventListener(key, value);

    element.append(...[].concat(elem));
    return element;
};

const elDiv = el.bind(null, 'div');

const elButton = (name = '', content, listeners) =>
    elDiv(content, 'button ' + name, listeners);

const createSlider = (elems) => {
    const content = elDiv(elems, 'slider__content');
    let position = 0;

    const go =
        (diff = 1) =>
        () => {
            position += diff;
            if (position >= elems.length) position = 0;
            if (position < 0) position = elems.length - 1;

            content.style = `--translate: ${-position * 100}%`;
        };

    const nextSlide = go(1);
    const prevSlide = go(-1);

    return elDiv(
        [
            elDiv(content, 'slider__container'),
            elDiv(
                [
                    elButton('button_type_prev', '< prev', {
                        click: prevSlide,
                    }),
                    elButton('button_type_next', 'next >', {
                        click: nextSlide,
                    }),
                ],
                'slider__buttons'
            ),
        ],
        'slider'
    );
};

document.body.append(
    createSlider(
        [
            './images/aI9N_qQbLoU.jpg',
            './images/q_x0pT3XFSg.jpg',
            './images/aI9N_qQbLoU.jpg',
            './images/q_x0pT3XFSg.jpg',
            './images/aI9N_qQbLoU.jpg',
            './images/q_x0pT3XFSg.jpg',
            './images/vtTLCsOcRrQ.jpg',
            './images/q_x0pT3XFSg.jpg',
            './images/vtTLCsOcRrQ.jpg',
        ].map((src) => el('img', '', { src, class: 'img' }))
    ),
    createSlider(
        ['./images/aI9N_qQbLoU.jpg', './images/vtTLCsOcRrQ.jpg'].map((src) =>
            el('img', '', { src, class: 'img' })
        )
    )
);
