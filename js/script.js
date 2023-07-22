const API_URL = "https://sleepy-spangled-starflower.glitch.me/";

const init = async () => {
    modalController({
        modal: '.modal_order', btnOpen: '.header__btn-order'
    });
    /*const headerBtnOrder = document.querySelector(".header__btn-orde");
    headerBtnOrder.addEventListener('click', () => {
        modal_order
    });*/

    const goodsListElem = document.querySelector(".goods__list");
    const data = await getData();

    const cartsCocktail = data.map((item) => {
        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.append(createCard(item));
        return li;
    });

    goodsListElem.append(...cartsCocktail);
};

const modalController = ({ modal, btnOpen, time = 300}) => {
    const buttonElem = document.querySelector(btnOpen);
    const modalElem = document.querySelector(modal);

    modalElem.style.cssText = `
        display: flex;
        visibity: hidden;
        opacity: 0;
        transition: opacity ${time}ms ease-in-out;
    `;

    const closeModel = (event) => {
        const target = event.target;
        const code = event.code;

        if (target === modalElem || code === 'Escape') {
            modalElem.style.opacity = 0;
            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
            }, time); 
            
            window.removeEventListener('keydown', closeModel);
        }
    };

    const openModel = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModel);
    };

    buttonElem.addEventListener('click', openModel);
    modalElem.addEventListener('click', closeModel);

    return {openModel, closeModel};
}; 

const getData = async () => {
    const response = await fetch(`${API_URL}api/goods`);
    const data = await response.json();
    return data;
}

const createCard = (item) => {
    const cocktail = document.createElement('article');
    cocktail.classList.add('cocktail');

    cocktail.innerHTML = `
    <img src="${API_URL}${item.image}" alt="Cocktail ${item.title}" class="cocktail__img">
    <div class="cocktail__content">
        <div class="cocktail__text">
            <h3 class="cocktail__title">${item.title}</h3>
            <p class="cocktail__price text-red">${item.price} ₽</p>
            <p class="cocktail__size">${item.size}</p>
        </div>
        
        <button class="btn cocktail__btn" data-id="${item.id}">Добавить</button>
    </div>
    `;

    return cocktail;
}

init();