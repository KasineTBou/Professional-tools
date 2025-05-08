document.addEventListener('DOMContentLoaded', function() {
    // Данные товаров
    const products = [
        {
            id: 1,
            title: "Дрель ударная Bosch GBH 2-26 DFR",
            category: "power",
            price: 12500,
            image: "https://3.allegroimg.com/original/0120c7/3245a23e4cadb6d1a362ec7e5e03/BOSCH-GBH-2-26-DRE-mlotowiertarka-SDS-Plus-2-7J",
            description: "Профессиональная ударная дрель с мощным двигателем 800 Вт и частотой ударов 4000 уд/мин."
        },
        {
            id: 2,
            title: "Шуруповерт Makita DF347DWE",
            category: "power",
            price: 8900,
            image: "https://avatars.mds.yandex.net/get-mpic/5273154/img_id3725437669972100863.jpeg/orig",
            description: "Беспроводной шуруповерт с литий-ионным аккумулятором 14.4В и крутящим моментом 36 Нм."
        },
        {
            id: 3,
            title: "Болгарка Interskol UShM-125/1100E",
            category: "power",
            price: 6500,
            image: "https://avatars.mds.yandex.net/get-mpic/5280162/img_id3192458914634781260.jpeg/orig",
            description: "Угловая шлифовальная машина с мощностью 1100 Вт и диаметром диска 125 мм."
        },
        {
            id: 4,
            title: "Набор отверток Kraftool 6 предметов",
            category: "hand",
            price: 1200,
            image: "https://avatars.mds.yandex.net/get-mpic/1750349/2a0000019124f68a0c45d698f04b93c9407a/orig",
            description: "Набор отверток из хромованадиевой стали с прорезиненными рукоятками."
        },
        {
            id: 5,
            title: "Молоток слесарный Stanley 1-54-046",
            category: "hand",
            price: 850,
            image: "https://www.instrument18.ru/upload/iblock/d86/d863fe081b1529efd0cb72d8e4a07371.jpg",
            description: "Молоток с фиберглассовой ручкой и бойком из закаленной стали весом 500 г."
        },
        {
            id: 6,
            title: "Пила садовая Fiskars 135513",
            category: "garden",
            price: 2500,
            image: "https://avatars.mds.yandex.net/i?id=37032afaf970c52a25429d832b19f917_l-3730174-images-thumbs&n=13",
            description: "Садовая пила с тефлоновым покрытием лезвия и эргономичной рукояткой."
        },
        {
            id: 7,
            title: "Лазерный уровень Bosch GLL 3-15",
            category: "measure",
            price: 7500,
            image: "https://avatars.mds.yandex.net/i?id=cfdbd92ccdbd256377d61574b7c05325_l-8342321-images-thumbs&n=13",
            description: "Профессиональный лазерный нивелир с точностью ±0.3 мм/м и дальностью 15 м."
        },
        {
            id: 8,
            title: "Рубанок металлический Зубр 15040",
            category: "hand",
            price: 1800,
            image: "https://cdn.vseinstrumenti.ru/images/goods/ruchnoj-instrument/slesarnyj-i-stolyarnyj-instrument/1487544/1200x800/56015348.jpg",
            description: "Рубанок с регулируемым ножом из инструментальной стали и корпусом из алюминия."
        },
        // другие товары можно добавить сюда
    ];

    const cart = [];
    
    function displayProducts(products) {
        const productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML = ''; 
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-category">${product.category}</p>
                    <p class="product-price">${product.price} руб.</p>
                    <div class="product-actions">
                        <button class="btn add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                        <button class="btn view-details" data-id="${product.id}">Подробнее</button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    function addToCart(id) {
        const product = products.find(p => p.id === id);
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        showCartModal();
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalCount;
    }

    function showCartModal() {
        const cartModal = document.getElementById('cartModal');
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-title">${item.title} (x${item.quantity})</div>
                </div>
                <div class="cart-item-price">${item.price * item.quantity} руб.</div>
                <div class="cart-item-remove" data-id="${item.id}">&times;</div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        document.getElementById('cartTotal').textContent = total;
        cartModal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    document.getElementById("productsContainer").addEventListener('click', (event) => {
        if (event.target.matches('.add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        } else if (event.target.matches('.view-details')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            alert(`Описание: ${product.description}`);
        }
    });

    document.getElementById('cartItems').addEventListener('click', (event) => {
        if (event.target.matches('.cart-item-remove')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const itemIndex = cart.findIndex(item => item.id === productId);
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
                updateCartCount();
                showCartModal();
            }
        }
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            displayProducts(filteredProducts);
        });
    });

    document.getElementById('addReviewBtn').addEventListener('click', function () {
        document.getElementById('reviewModal').style.display = 'block';
    });

    document.getElementById('reviewForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const ratingValue = document.getElementById('ratingValue').value;
        const reviewText = this.querySelector('textarea').value;

        // Сохранение отзыва (можно дополнить с отправкой на сервер)
        alert(`Спасибо, ${name}! Ваш отзыв оставлен с оценкой ${ratingValue}.`);

        this.reset();
        document.getElementById('ratingValue').value = 0;
        document.querySelectorAll('.stars i').forEach(star => star.classList.remove('active'));
        closeModal(document.getElementById('reviewModal'));
    });

    document.querySelectorAll('.stars i').forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-rating');
            document.getElementById('ratingValue').value = rating;
            document.querySelectorAll('.stars i').forEach(star => {
                star.classList.remove('active');
                if (star.getAttribute('data-rating') <= rating) {
                    star.classList.add('active');
                }
            });
        });
    });

    document.getElementById('cartIcon').addEventListener('click', showCartModal);
    document.querySelector('.modal#cartModal .close').addEventListener('click', () => {
        closeModal(document.getElementById('cartModal'));
    });
    
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    };

    displayProducts(products);
});