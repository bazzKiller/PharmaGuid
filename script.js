// 1. База данных (Массив объектов)
// В реальном проекте эти данные приходят с сервера (API)
const drugsData = [
    {
        id: 1,
        title: "Нурофен",
        category: "painkillers",
        activeSubstance: "Ибупрофен",
        description: "Обезболивающее, жаропонижающее и противовоспалительное средство. Применяется при головной, зубной боли, болях в спине.",
        usage: "Взрослым по 200-400 мг. Не более 3 раз в сутки.",
        price: 250,
        img: "https://placehold.co/300x200/e3f2fd/007bff?text=Nurofen"
    },
    {
        id: 2,
        title: "Амоксиклав",
        category: "антибиотики",
        activeSubstance: "Амоксициллин + Клавулановая кислота",
        description: "Антибиотик широкого спектра действия. Эффективен при инфекциях дыхательных путей.",
        usage: "Строго по назначению врача. Обычно каждые 8 часов.",
        price: 450,
        img: "https://placehold.co/300x200/ffebee/d32f2f?text=Amoksiklav"
    },
    {
        id: 3,
        title: "Витамин C",
        category: "витамины",
        activeSubstance: "Аскорбиновая кислота",
        description: "Укрепляет иммунитет, участвует в синтезе коллагена. Шипучие таблетки.",
        usage: "1 таблетка в день после еды, растворить в воде.",
        price: 120,
        img: "https://placehold.co/300x200/fff3e0/f57c00?text=Vitamin+C"
    },
    {
        id: 4,
        title: "Терафлю",
        category: "от простуды",
        activeSubstance: "Парацетамол + Фенилэфрин",
        description: "Комбинированное средство от простуды и гриппа. Снимает жар и заложенность носа.",
        usage: "Растворить содержимое пакетика в горячей воде. Каждые 4-6 часов.",
        price: 600,
        img: "https://placehold.co/300x200/e8f5e9/388e3c?text=Teraflu"
    },
    {
        id: 5,
        title: "Пенталгин",
        category: "обезболивающие препараты",
        activeSubstance: "Парацетамол, Напроксен, Кофеин",
        description: "Комбинированный анальгетик. Помогает при сильных болях и спазмах.",
        usage: "По 1 таблетке 1-3 раза в день.",
        price: 300,
        img: "https://placehold.co/300x200/e3f2fd/007bff?text=Pentalgin"
    },
    {
        id: 6,
        title: "Супрадин",
        category: "витамины",
        activeSubstance: "Мультивитаминный комплекс",
        description: "Содержит 12 витаминов и 8 минералов. Для активного образа жизни.",
        usage: "1 таблетка в день во время еды.",
        price: 950,
        img: "https://placehold.co/300x200/fff3e0/f57c00?text=Supradin"
    }
];

// 2. DOM элементы
const grid = document.getElementById('drugGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('noResults');

// Элементы модального окна
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalSubstance = document.querySelector('#modalActiveSubstance span');
const modalDesc = document.getElementById('modalDescription');
const modalUsage = document.getElementById('modalUsage');
const modalPrice = document.getElementById('modalPrice');

// 3. Функция отрисовки карточек
function renderCards(data) {
    grid.innerHTML = ''; // Очищаем сетку

    if (data.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    data.forEach(drug => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Формируем HTML карточки
        card.innerHTML = `
            <img src="${drug.img}" alt="${drug.title}" class="card-image">
            <div class="card-content">
                <span class="badge">${getCategoryName(drug.category)}</span>
                <h3>${drug.title}</h3>
                <p>${drug.description.substring(0, 60)}...</p>
                <div class="card-footer">
                    <span class="price">${drug.price} ₽</span>
                    <button class="details-btn" onclick="openModal(${drug.id})">Подробнее</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Вспомогательная функция для перевода категорий
function getCategoryName(cat) {
    const names = {
        'painkillers': 'Обезболивающее',
        'antibiotics': 'Антибиотик',
        'vitamins': 'Витамины',
        'cold': 'От простуды'
    };
    return names[cat] || cat;
}

// 4. Логика фильтрации и поиска
function filterDrugs() {
    const query = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

    const filtered = drugsData.filter(drug => {
        const matchesSearch = drug.title.toLowerCase().includes(query);
        const matchesCategory = activeCategory === 'all' || drug.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    renderCards(filtered);
}

// Слушатели событий (Event Listeners)
searchInput.addEventListener('input', filterDrugs);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убираем класс active у всех и добавляем нажатой
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterDrugs();
    });
});

// 5. Логика модального окна
window.openModal = function(id) {
    const drug = drugsData.find(d => d.id === id);
    if (!drug) return;

    modalTitle.textContent = drug.title;
    modalImage.src = drug.img;
    modalCategory.textContent = getCategoryName(drug.category);
    modalSubstance.textContent = drug.activeSubstance;
    modalDesc.textContent = drug.description;
    modalUsage.textContent = drug.usage;
    modalPrice.textContent = `${drug.price} ₽`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
};

closeBtn.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// 6. Инициализация при загрузке
renderCards(drugsData);
