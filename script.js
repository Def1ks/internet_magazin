document.addEventListener('DOMContentLoaded', () => {
  // Выпадающий список
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu.querySelectorAll('li');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        toggle.textContent = item.textContent.trim();
        dropdown.classList.remove('show');
      });
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  }

  // === После подключения бэка изменить скрипт отображения товара
  // === Генерация карточек товаров ===
const productsData = [
  {
    id: 1,
    name: "iPhone 16",
    brand: "Apple",
    price: "109 999 ₽",
    colors: "Silver",
    memory: "256 GB",
    image: "img/products_image/iphone_16_silver.png"
  },
  {
    id: 2,
    name: "Galaxy S24 FE",
    brand: "Samsung",
    price: "89 999 ₽",
    colors: "Silver",
    memory: "512 GB",
    image: "img/products_image/samsung_s24_fe_silver.png"
  },
  {
    id: 3,
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: "129 999 ₽",
    colors: "Black",
    memory: "1 TB",
    image: "img/products_image/samsung_s25_ultra_black.png"
  },
  {
    id: 4,
    name: "iPhone 15",
    brand: "Apple",
    price: "69 999 ₽",
    colors: "Black",
    memory: "512 GB",
    image: "img/products_image/iphone_15_black.png"
  },
  {
    id: 5,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: "129 999 ₽",
    colors: "Silver",
    memory: "256 GB",
    image: "img/products_image/iphone_16_pro_max.png"
  },
  {
    id: 6,
    name: "Galaxy S24",
    brand: "Samsung",
    price: "79 999 ₽",
    colors: "Lavender",
    memory: "256 GB",
    image: "img/products_image/samsung_s24_lavender.png"
  },
];
function renderProducts(productsList) {
  const container = document.querySelector('.products');
  if (!container) return; 

  container.innerHTML = ''; 

  productsList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class = "model_name">
        <h4>${product.name}</h4>
        <h5>${product.brand}</h5>
      </div>
      <div class="product_info">
        <p class="price">${product.price}</p>
        <p class="color_product">Цвет:</p>
        <p class="colors_product">${product.colors}</p>
        <p class="memory">Объем памяти:</p>
        <p class="memorys">${product.memory}</p>
      </div>
      <button class="buy" data-id="${product.id}">Положить в корзину</button>
      </div>
    `;
    container.appendChild(card);
  });
}

  // Изначально отображаем все товары
  renderProducts(productsData);



  // === После подключения бэка изменить скрипт фильтрации
  // Обработчик фильтрации
  document.querySelectorAll('.filter_button button').forEach(button => {
  button.addEventListener('click', function () {
    // Убираем класс filter-active у всех кнопок фильтра
    document.querySelectorAll('.filter_button button').forEach(btn => {
      btn.classList.remove('filter-active');
    });

    // Добавляем filter-active текущей кнопке
    this.classList.add('filter-active');

    const filterValue = this.getAttribute('data-filter');

    let filteredProducts;
    if (filterValue === 'all') {
      filteredProducts = productsData;
    } else {
      filteredProducts = productsData.filter(product => product.brand.toLowerCase() === filterValue.toLowerCase());
    }

    renderProducts(filteredProducts);
  });
  });


 
  // Модальное окно (вход/регистрация)
  const modal = document.getElementById('authModal');
  const btn = document.querySelector('header button');
  const span = document.querySelector('.close');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toRegister = document.getElementById('toRegister');
  const toLogin = document.getElementById('toLogin');

  if (btn) {
    btn.onclick = () => modal.style.display = 'block';
  }
  if (span) {
    span.onclick = () => modal.style.display = 'none';
  }
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  if (toRegister) {
    toRegister.onclick = (e) => {
      e.preventDefault();
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    };
  }
  if (toLogin) {
    toLogin.onclick = (e) => {
      e.preventDefault();
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    };
  }

  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      alert('Вы вошли!');
      modal.style.display = 'none';
      if (btn) btn.innerHTML = '<img src="img/icon/profile.png"> Профиль';
    };
  }
  if (registerForm) {
    registerForm.onsubmit = (e) => {
      e.preventDefault();
      alert('Вы зарегистрировались!');
      modal.style.display = 'none';
      if (btn) btn.innerHTML = '<img src="img/icon/profile.png"> Профиль';
    };
  }

// Эффект наклона для всех картинок с классом .img_1 внутри .section-2
document.querySelectorAll('.section-2 .img_1').forEach(container => {
  const img = container.querySelector('.img_shop');
  if (!container || !img) return;

  let rect = null;
  const maxRotate = 12;
  const ease = 0.12;
  let pointerX = 0, pointerY = 0;
  let currentRX = 0, currentRY = 0;
  let rafId = null;

  function updateRect() {
    rect = container.getBoundingClientRect();
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function onMouseMove(e) {
    if (!rect) updateRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    pointerX = clamp(dx, -1, 1);
    pointerY = clamp(dy, -1, 1);

    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  function animate() {
    rafId = null;

    const targetRY = pointerX * maxRotate;
    const targetRX = -pointerY * maxRotate;

    currentRX += (targetRX - currentRX) * ease;
    currentRY += (targetRY - currentRY) * ease;

    img.style.transform = `rotateX(${currentRX.toFixed(3)}deg) rotateY(${currentRY.toFixed(3)}deg)`;
  }

  function reset() {
    pointerX = pointerY = 0;
    img.style.transition = 'transform 360ms cubic-bezier(.2,.8,.2,1)';
    img.style.transform = 'rotateX(0deg) rotateY(0deg)';

    clearTimeout(reset._t);
    reset._t = setTimeout(() => {
      img.style.transition = 'transform 120ms ease-out';
    }, 380);
  }

  container.addEventListener('mouseenter', () => {
    updateRect();
    img.style.transition = 'transform 120ms ease-out';
  });

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', reset);

  updateRect(); // инициализация
});
});