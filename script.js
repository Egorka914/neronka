// База данных компонентов (добавьте в начало файла)
const components = {
    cpus: [
        { id: 1, name: 'Intel Core i5-12400F', type: 'cpu', socket: 'LGA1700', price: 15000, cores: 6, threads: 12 },
        { id: 2, name: 'AMD Ryzen 5 5600X', type: 'cpu', socket: 'AM4', price: 16000, cores: 6, threads: 12 },
        { id: 3, name: 'Intel Core i7-13700K', type: 'cpu', socket: 'LGA1700', price: 30000, cores: 16, threads: 24 },
        { id: 4, name: 'AMD Ryzen 7 7800X3D', type: 'cpu', socket: 'AM5', price: 35000, cores: 8, threads: 16 }
    ],
    motherboards: [
        { id: 1, name: 'ASUS PRIME B660-PLUS', type: 'motherboard', socket: 'LGA1700', price: 12000, ramType: 'DDR4' },
        { id: 2, name: 'MSI B550 TOMAHAWK', type: 'motherboard', socket: 'AM4', price: 13000, ramType: 'DDR4' },
        { id: 3, name: 'Gigabyte Z790 AORUS', type: 'motherboard', socket: 'LGA1700', price: 25000, ramType: 'DDR5' },
        { id: 4, name: 'ASUS ROG STRIX B650-E', type: 'motherboard', socket: 'AM5', price: 22000, ramType: 'DDR5' }
    ],
    gpus: [
        { id: 1, name: 'NVIDIA RTX 4060 8GB', type: 'gpu', price: 35000, vram: 8, power: 115 },
        { id: 2, name: 'AMD RX 7600 8GB', type: 'gpu', price: 30000, vram: 8, power: 165 },
        { id: 3, name: 'NVIDIA RTX 4070 12GB', type: 'gpu', price: 60000, vram: 12, power: 200 },
        { id: 4, name: 'AMD RX 7800 XT 16GB', type: 'gpu', price: 55000, vram: 16, power: 263 }
    ],
    ram: [
        { id: 1, name: 'Corsair Vengeance 16GB DDR4', type: 'ram', speed: '3200MHz', price: 4000, capacity: 16 },
        { id: 2, name: 'Kingston Fury 32GB DDR4', type: 'ram', speed: '3200MHz', price: 7000, capacity: 32 },
        { id: 3, name: 'G.Skill Trident Z 32GB DDR5', type: 'ram', speed: '6000MHz', price: 12000, capacity: 32 }
    ],
    storage: [
        { id: 1, name: 'Samsung 980 1TB NVMe', type: 'storage', price: 6000, capacity: 1000, type: 'NVMe' },
        { id: 2, name: 'WD Blue SN570 2TB NVMe', type: 'storage', price: 10000, capacity: 2000, type: 'NVMe' },
        { id: 3, name: 'Crucial MX500 1TB SATA', type: 'storage', price: 5000, capacity: 1000, type: 'SATA' }
    ],
    psus: [
        { id: 1, name: 'Seasonic Focus 650W', type: 'psu', wattage: 650, price: 7000, efficiency: '80+ Gold' },
        { id: 2, name: 'Corsair RM750e 750W', type: 'psu', wattage: 750, price: 9000, efficiency: '80+ Gold' },
        { id: 3, name: 'be quiet! Straight Power 850W', type: 'psu', wattage: 850, price: 12000, efficiency: '80+ Platinum' }
    ]
};

// База знаний для AI (работает без API)
const PC_KNOWLEDGE_BASE = {
    compatibility: {
        'LGA1700': ['Intel Core i5-12400F', 'Intel Core i7-13700K'],
        'AM4': ['AMD Ryzen 5 5600X'], 
        'AM5': ['AMD Ryzen 7 7800X3D'],
        'DDR4': ['ASUS PRIME B660-PLUS', 'MSI B550 TOMAHAWK'],
        'DDR5': ['Gigabyte Z790 AORUS', 'ASUS ROG STRIX B650-E']
    },
    recommendations: {
        gaming: {
            budget: 'Intel i5-12400F + RTX 4060 + 16GB DDR4',
            midrange: 'AMD Ryzen 5 5600X + RTX 4070 + 32GB DDR4', 
            highEnd: 'AMD Ryzen 7 7800X3D + RTX 4070 + 32GB DDR5'
        },
        work: {
            programming: 'Многоядерный CPU + 32GB RAM + быстрый SSD',
            videoEditing: 'Многоядерный CPU + 64GB RAM + мощная GPU',
            design: 'Хорошая GPU + цветокоррекция монитора'
        }
    },
    commonIssues: {
        'socket_mismatch': '❌ Несовместимость сокетов! Процессор и материнская плата должны иметь одинаковый сокет',
        'insufficient_psu': '⚠️ Слабый блок питания! Рекомендуется запас 20-30% от общего потребления',
        'ram_mismatch': '⚠️ Проверьте тип памяти (DDR4/DDR5) материнской платы'
    }
};

// Текущая сборка пользователя
let currentBuild = {
    cpu: null,
    motherboard: null, 
    gpu: null,
    ram: null,
    storage: null,
    psu: null
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    createPCSlots();
    updateBuildSummary();
    showWelcomeMessage();
});

function showWelcomeMessage() {
    addAIMessage(`🎮 Добро пожаловать в AI-помощник по сборке ПК!

Я помогу вам собрать компьютер мечты! Вот что я умею:

🔧 **Сборка ПК:**
• Перетаскивайте компоненты в корпус
• Автоматическая проверка совместимости  
• Расчет стоимости и энергопотребления

🤖 **AI-помощник:**
• Рекомендации по компонентам
• Анализ вашей сборки
• Ответы на вопросы о железе

💡 **Начните с:**
1. Перетащите процессор и материнскую плату
2. Или спросите "Собери ПК для игр за 80000 рублей"
3. Или "Какая видеокарта лучше для 4K?"

Готовы начать? 🚀`, 'ai');
}

// Инициализация компонентов
function initializeComponents() {
    for (const category in components) {
        const container = document.getElementById(category);
        if (container) {
            components[category].forEach(component => {
                const element = document.createElement('div');
                element.className = 'component-item';
                element.textContent = `${component.name} - ${component.price}₽`;
                element.draggable = true;
                element.setAttribute('data-component', JSON.stringify(component));
                element.addEventListener('dragstart', handleDragStart);
                container.appendChild(element);
            });
        }
    }
}

// Создание слотов в корпусе ПК
function createPCSlots() {
    const pcCase = document.getElementById('pcCase');
    const slots = [
        { id: 'cpu', name: '💻 Процессор', width: '30%', height: '15%', top: '10%', left: '35%' },
        { id: 'motherboard', name: '🔌 Мат.плата', width: '80%', height: '40%', top: '30%', left: '10%' },
        { id: 'gpu', name: '🎮 Видеокарта', width: '25%', height: '15%', top: '45%', left: '65%' },
        { id: 'ram', name: '💾 Память', width: '20%', height: '10%', top: '35%', left: '15%' },
        { id: 'storage', name: '💽 Накопитель', width: '25%', height: '10%', top: '75%', left: '10%' },
        { id: 'psu', name: '⚡ Блок питания', width: '25%', height: '15%', top: '75%', left: '65%' }
    ];

    slots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = 'component-slot';
        slotElement.id = `slot-${slot.id}`;
        slotElement.style.width = slot.width;
        slotElement.style.height = slot.height;
        slotElement.style.position = 'absolute';
        slotElement.style.top = slot.top;
        slotElement.style.left = slot.left;
        slotElement.textContent = slot.name;
        slotElement.setAttribute('data-slot', slot.id);
        
        slotElement.addEventListener('dragover', handleDragOver);
        slotElement.addEventListener('drop', handleDrop);
        slotElement.addEventListener('dragenter', handleDragEnter);
        slotElement.addEventListener('dragleave', handleDragLeave);
        
        pcCase.appendChild(slotElement);
    });
}

// Обработчики Drag & Drop
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-component'));
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.style.background = '#4a6572';
    e.target.style.borderColor = '#3498db';
}

function handleDragLeave(e) {
    e.target.style.background = '#34495e';
    e.target.style.borderColor = '#7f8c8d';
}

function handleDrop(e) {
    e.preventDefault();
    const componentData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const slotType = e.target.getAttribute('data-slot');
    
    // Проверка совместимости
    const compatibilityResult = checkCompatibility(componentData, slotType);
    
    if (compatibilityResult.compatible) {
        currentBuild[slotType] = componentData;
        e.target.classList.add('filled');
        e.target.innerHTML = `<strong>${componentData.name}</strong><br>${componentData.price}₽`;
        e.target.style.background = '#27ae60';
        e.target.style.borderColor = '#2ecc71';
        
        updateBuildSummary();
        addAIMessage(`✅ Добавлен: ${componentData.name}`, 'user');
        generateRecommendation();
    } else {
        e.target.style.background = '#e74c3c';
        e.target.style.borderColor = '#c0392b';
        setTimeout(() => {
            e.target.style.background = '#34495e';
            e.target.style.borderColor = '#7f8c8d';
        }, 1000);
        addAIMessage(`❌ ${compatibilityResult.reason}`, 'ai');
    }
}

// Проверка совместимости компонентов
function checkCompatibility(component, slotType) {
    let result = { compatible: true, reason: '' };

    // Проверка процессора и материнской платы
    if (slotType === 'cpu' && currentBuild.motherboard) {
        if (component.socket !== currentBuild.motherboard.socket) {
            result.compatible = false;
            result.reason = `Сокет процессора (${component.socket}) не совместим с материнской платой (${currentBuild.motherboard.socket})`;
        }
    }
    
    if (slotType === 'motherboard' && currentBuild.cpu) {
        if (component.socket !== currentBuild.cpu.socket) {
            result.compatible = false;
            result.reason = `Сокет материнской платы (${component.socket}) не совместим с процессором (${currentBuild.cpu.socket})`;
        }
    }

    // Проверка мощности БП
    if (slotType === 'psu') {
        const estimatedPower = calculatePowerConsumption();
        if (component.wattage < estimatedPower) {
            result.compatible = false;
            result.reason = `Блок питания ${component.wattage}W недостаточен. Нужно минимум ${estimatedPower + 100}W`;
        }
    }

    if (slotType === 'gpu' && currentBuild.psu) {
        const estimatedPower = calculatePowerConsumption();
        if (currentBuild.psu.wattage < estimatedPower) {
            result.compatible = false;
            result.reason = `БП ${currentBuild.psu.wattage}W слаб для этой видеокарты. Требуется ${estimatedPower + 100}W`;
        }
    }

    return result;
}

// Расчет энергопотребления
function calculatePowerConsumption() {
    let power = 0;
    if (currentBuild.cpu) power += currentBuild.cpu.cores * 15; // Примерный расчет
    if (currentBuild.gpu) power += currentBuild.gpu.power;
    if (currentBuild.motherboard) power += 50;
    if (currentBuild.ram) power += 10;
    if (currentBuild.storage) power += 5;
    
    return Math.ceil(power * 1.2); // +20% запас
}

// Обновление сводки сборки
function updateBuildSummary() {
    const summary = document.getElementById('buildSummary');
    let html = '<div class="build-details">';
    let totalPrice = 0;
    let hasComponents = false;
    
    for (const component in currentBuild) {
        if (currentBuild[component]) {
            hasComponents = true;
            html += `
                <div class="build-item">
                    <span class="component-name">${getComponentName(component)}:</span>
                    <span class="component-details">${currentBuild[component].name}</span>
                    <span class="component-price">${currentBuild[component].price}₽</span>
                </div>`;
            totalPrice += currentBuild[component].price;
        }
    }
    
    if (!hasComponents) {
        html = '<p>🎯 Перетащите компоненты в корпус чтобы начать сборку</p>';
    } else {
        const powerUsage = calculatePowerConsumption();
        html += `
            <div class="build-total">
                <strong>💰 Общая стоимость: ${totalPrice}₽</strong>
                <div class="power-consumption">⚡ Примерное потребление: ${powerUsage}W</div>
                ${currentBuild.psu ? `<div class="power-status">${currentBuild.psu.wattage >= powerUsage ? '✅ БП достаточен' : '⚠️ БП может быть слаб'}</div>` : ''}
            </div>`;
    }
    
    html += '</div>';
    summary.innerHTML = html;
}

function getComponentName(type) {
    const names = {
        cpu: '💻 Процессор',
        motherboard: '🔌 Мат.плата', 
        gpu: '🎮 Видеокарта',
        ram: '💾 Память',
        storage: '💽 Накопитель',
        psu: '⚡ БП'
    };
    return names[type] || type;
}

// Генерация рекомендаций (работает без API)
function generateRecommendation() {
    const recommendations = [];
    const buildContext = createBuildContext();
    
    // Проверка сокетов
    if (currentBuild.cpu && currentBuild.motherboard) {
        if (currentBuild.cpu.socket === currentBuild.motherboard.socket) {
            recommendations.push('✅ Процессор и мат.плата совместимы');
        } else {
            recommendations.push('❌ Несовместимость сокетов!');
        }
    }
    
    // Проверка БП
    if (currentBuild.psu) {
        const powerNeed = calculatePowerConsumption();
        if (currentBuild.psu.wattage >= powerNeed) {
            recommendations.push(`✅ Блок питания ${currentBuild.psu.wattage}W достаточен`);
        } else {
            recommendations.push(`⚠️ БП ${currentBuild.psu.wattage}W слабоват. Нужно ~${powerNeed}W`);
        }
    }
    
    // Общие рекомендации
    if (!currentBuild.cpu && !currentBuild.motherboard) {
        recommendations.push('💡 Начните с выбора процессора и материнской платы');
    } else if (currentBuild.cpu && currentBuild.motherboard && !currentBuild.gpu) {
        recommendations.push('🎮 Добавьте видеокарту для игр и работы с графикой');
    } else if (currentBuild.gpu && !currentBuild.psu) {
        recommendations.push('⚡ Не забудьте мощный блок питания для видеокарты');
    }
    
    const recommendationText = recommendations.length > 0 ? 
        recommendations.join('\n') : 'Продолжайте сборку!';
    
    document.getElementById('recommendations').innerHTML = 
        `<div class="message ai-message">${recommendationText}</div>`;
}

// Умный AI-помощник (работает без API)
function getAIResponse(userMessage) {
    return new Promise((resolve) => {
        // Имитация задержки как у реального AI
        setTimeout(() => {
            const response = generateSmartResponse(userMessage);
            resolve(response);
        }, 1000 + Math.random() * 2000);
    });
}

// Генерация умных ответов без API
function generateSmartResponse(message) {
    const lowerMessage = message.toLowerCase();
    const buildContext = createBuildContext();
    
    // Приветствие
    if (lowerMessage.includes('привет') || lowerMessage.includes('hello') || lowerMessage.includes('start')) {
        return `Привет! Я ваш AI-помощник по сборке ПК. Вижу вашу текущую сборку: ${buildContext}

Чем могу помочь? Можете:
• Спросить о совместимости компонентов
• Попросить собрать ПК под определенный бюджет
• Задать вопрос о конкретных комплектующих
• Попросить проанализировать текущую сборку`;
    }

    // Сборка под бюджет
    if (lowerMessage.includes('собер') || lowerMessage.includes('бюджет') || lowerMessage.includes('рубл')) {
        const budget = extractBudget(message);
        if (budget) {
            return generateBuildByBudget(budget);
        }
        return generateBuildByBudget(50000);
    }

    // Рекомендации по играм
    if (lowerMessage.includes('игр') || lowerMessage.includes('game')) {
        return generateGamingRecommendation();
    }

    // Рекомендации для работы
    if (lowerMessage.includes('работ') || lowerMessage.includes('офис') || lowerMessage.includes('работа')) {
        return generateWorkRecommendation();
    }

    // Анализ текущей сборки
    if (lowerMessage.includes('анализ') || lowerMessage.includes('провер') || lowerMessage.includes('совмест')) {
        return analyzeCurrentBuild();
    }

    // Вопросы о компонентах
    if (lowerMessage.includes('процессор') || lowerMessage.includes('cpu')) {
        return `**Процессоры - что важно:**\n• Для игр: высокая тактовая частота\n• Для работы: много ядер\n• Сокеты: LGA1700 (Intel), AM4/AM5 (AMD)\n• Рекомендую: i5-12400F для бюджета, Ryzen 7 7800X3D для игр`;
    }

    if (lowerMessage.includes('видеокарт') || lowerMessage.includes('gpu')) {
        return `**Видеокарты - что важно:**\n• Для 1080p: RTX 4060 / RX 7600\n• Для 1440p: RTX 4070 / RX 7800 XT\n• Память: 8GB минимум, 12GB+ для 1440p\n• Мощность: учитывайте блок питания!`;
    }

    if (lowerMessage.includes('памят') || lowerMessage.includes('ram')) {
        return `**Оперативная память:**\n• Игры: 16GB DDR4-3200 минимум\n• Стриминг/работа: 32GB\n• Тип: DDR4 (бюджет), DDR5 (будущее)\n• 2 модуля лучше чем 1 (dual-channel)`;
    }

    // Общие советы
    if (lowerMessage.includes('совет') || lowerMessage.includes('tip')) {
        return `**Советы по сборке:**\n\n1. **Совместимость** - проверяйте сокеты и размеры\n2. **БП** - берите на 20-30% мощнее расчетного\n3. **Охлаждение** - не экономьте на кулере процессора\n4. **Корпус** - хорошая вентиляция важнее красоты\n5. **SSD** - NVMe для системы, SATA для хранения`;
    }

    // Дефолтный ответ
    return `На основе вашей сборки: ${buildContext}

🤖 Я локальный AI-помощник! Задайте мне вопросы о:

• **Сборке ПК** - "Собери ПК для игр за 80000"
• **Компонентах** - "Какой процессор лучше?"  
• **Совместимости** - "Проверь мою сборку"
• **Бюджете** - "Варианты за 50000 рублей"

Или просто продолжайте перетаскивать компоненты - я буду давать советы по совместимости!`;
}

// Извлечение бюджета из сообщения
function extractBudget(message) {
    const budgetMatch = message.match(/(\d+)\s*(тыс|к|руб)/) || message.match(/\b(\d{4,5})\b/);
    if (budgetMatch) {
        let budget = parseInt(budgetMatch[1]);
        if (budgetMatch[2] === 'тыс' || budget < 1000) budget *= 1000;
        return budget;
    }
    return null;
}

// Генерация сборки по бюджету
function generateBuildByBudget(budget) {
    let builds = {
        50000: {
            name: "Бюджетный игровой",
            components: [
                "Процессор: Intel i3-12100F (8,000₽)",
                "Мат.плата: B660 DDR4 (9,000₽)", 
                "Видеокарта: RX 6600 (25,000₽)",
                "Память: 16GB DDR4 (4,000₽)",
                "SSD: 1TB NVMe (5,000₽)",
                "БП: 550W (5,000₽)",
                "Итого: ~56,000₽"
            ]
        },
        80000: {
            name: "Средний игровой", 
            components: [
                "Процессор: AMD Ryzen 5 5600X (16,000₽)",
                "Мат.плата: B550 (13,000₽)",
                "Видеокарта: RTX 4060 (35,000₽)",
                "Память: 32GB DDR4 (7,000₽)", 
                "SSD: 1TB NVMe (6,000₽)",
                "БП: 650W (7,000₽)",
                "Итого: ~84,000₽"
            ]
        },
        120000: {
            name: "Мощный игровой",
            components: [
                "Процессор: AMD Ryzen 7 7800X3D (35,000₽)",
                "Мат.плата: B650 (22,000₽)", 
                "Видеокарта: RTX 4070 (60,000₽)",
                "Память: 32GB DDR5 (12,000₽)",
                "SSD: 2TB NVMe (10,000₽)",
                "БП: 750W (9,000₽)",
                "Итого: ~148,000₽"
            ]
        }
    };

    // Находим ближайший бюджет
    const budgets = Object.keys(builds).map(Number).sort((a,b) => a-b);
    const targetBudget = budgets.find(b => b >= budget) || budgets[budgets.length-1];
    const build = builds[targetBudget];

    return `💡 **${build.name} за ~${targetBudget}₽:**\n\n${build.components.join('\n')}\n\n💬 *Это примерная сборка. Компоненты можно заменять на аналоги!*`;
}

// Рекомендации для игр
function generateGamingRecommendation() {
    return `🎮 **Игровой ПК - рекомендации:**

**Бюджет до 60,000₽:**
• Процессор: Intel i3-12100F / AMD Ryzen 5 5600
• Видеокарта: RX 6600 / RTX 3060
• Память: 16GB DDR4
• Результат: 1080p @ 60fps в большинстве игр

**Средний до 100,000₽:**
• Процессор: AMD Ryzen 5 7600X / Intel i5-13400F  
• Видеокарта: RTX 4060 Ti / RX 7700 XT
• Память: 32GB DDR5
• Результат: 1440p @ 100fps

**Высокий от 150,000₽:**
• Процессор: AMD Ryzen 7 7800X3D
• Видеокарта: RTX 4070 Ti / RX 7900 XT
• Память: 32GB DDR5
• Результат: 4K @ 60fps / 1440p @ 144fps

💡 **Совет:** В играх видеокарта - самый важный компонент!`;
}

// Рекомендации для работы
function generateWorkRecommendation() {
    return `💼 **Рабочий ПК - рекомендации:**

**Офисный (до 40,000₽):**
• Процессор: Intel i3 / AMD Ryzen 3 с iGPU
• Память: 16GB DDR4
• SSD: 512GB NVMe
• Видеокарта: встроенная

**Для программирования (до 80,000₽):**
• Процессор: AMD Ryzen 7 / Intel i7 (8+ ядер)
• Память: 32GB DDR4/DDR5  
• SSD: 1TB NVMe + 2TB HDD
• Монитор: 27" 1440p

**Для монтажа видео (от 120,000₽):**
• Процессор: AMD Ryzen 9 / Intel i9 (12+ ядер)
• Память: 64GB+ DDR5
• Видеокарта: RTX 4070+ с 12GB+ памяти
• SSD: 2TB NVMe для проектов

💡 **Совет:** Для работы важны процессор и много оперативной памяти!`;
}

// Анализ текущей сборки
function analyzeCurrentBuild() {
    const issues = [];
    const warnings = [];
    const good = [];
    
    // Проверка сокетов
    if (currentBuild.cpu && currentBuild.motherboard) {
        if (currentBuild.cpu.socket === currentBuild.motherboard.socket) {
            good.push(`✅ Процессор и мат.плата совместимы (${currentBuild.cpu.socket})`);
        } else {
            issues.push(`❌ Несовместимость сокетов: ${currentBuild.cpu.socket} ≠ ${currentBuild.motherboard.socket}`);
        }
    }
    
    // Проверка БП
    if (currentBuild.psu) {
        const powerNeed = calculatePowerConsumption();
        if (currentBuild.psu.wattage >= powerNeed) {
            good.push(`✅ БП ${currentBuild.psu.wattage}W достаточен (нужно ~${powerNeed}W)`);
        } else {
            warnings.push(`⚠️ БП ${currentBuild.psu.wattage}W слабоват. Рекомендуется ${powerNeed + 100}W`);
        }
    }
    
    // Общий анализ
    const componentCount = Object.values(currentBuild).filter(Boolean).length;
    if (componentCount < 3) {
        warnings.push('🔧 Сборка не завершена. Добавьте основные компоненты');
    }
    
    let response = `🔍 **Анализ вашей сборки:**\n\n`;
    
    if (issues.length > 0) {
        response += `**Критические проблемы:**\n${issues.join('\n')}\n\n`;
    }
    
    if (warnings.length > 0) {
        response += `**Рекомендации:**\n${warnings.join('\n')}\n\n`;
    }
    
    if (good.length > 0) {
        response += `**Все хорошо:**\n${good.join('\n')}\n\n`;
    }
    
    if (issues.length === 0 && warnings.length === 0 && good.length === 0) {
        response += `📝 Сборка пуста. Начните добавлять компоненты!\n\n`;
    }
    
    response += `💡 *Продолжайте сборку - я буду подсказывать!*`;
    
    return response;
}

function createBuildContext() {
    let context = '';
    let componentCount = 0;
    
    for (const component in currentBuild) {
        if (currentBuild[component]) {
            componentCount++;
            context += `${getComponentName(component)}: ${currentBuild[component].name}. `;
        }
    }
    
    if (componentCount === 0) return 'пока нет компонентов';
    return context;
}

// Работа с чатом
async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addAIMessage(message, 'user');
    input.value = '';
    
    // Показываем индикатор загрузки
    const loadingId = showLoadingIndicator();
    
    try {
        const response = await getAIResponse(message);
        removeLoadingIndicator(loadingId);
        addAIMessage(response, 'ai');
    } catch (error) {
        removeLoadingIndicator(loadingId);
        // Резервный ответ при ошибках
        const fallbackResponse = `На основе вашей сборки: ${createBuildContext()}

🤖 Задайте вопрос о сборке ПК, компонентах или совместимости!
Например: "Собери игровой ПК за 70000" или "Какой процессор лучше?"`;
        addAIMessage(fallbackResponse, 'ai');
    }
}

// Индикатор загрузки
function showLoadingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message loading';
    loadingDiv.id = 'loading-' + Date.now();
    loadingDiv.textContent = '🤔 Думаю...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingDiv.id;
}

function removeLoadingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

function addAIMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Сохраняем переносы строк
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Анализ сборки по кнопке
async function analyzeBuild() {
    const buildContext = createBuildContext();
    
    if (buildContext === 'пока нет компонентов') {
        addAIMessage('Сначала добавьте компоненты в сборку для анализа', 'ai');
        return;
    }
    
    addAIMessage('🔍 Анализирую вашу сборку...', 'user');
    
    try {
        const response = analyzeCurrentBuild();
        addAIMessage(response, 'ai');
    } catch (error) {
        addAIMessage('Ошибка при анализе сборки', 'ai');
    }
}

// Обработка нажатия Enter в поле ввода
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Добавляем CSS для улучшенного интерфейса
const additionalCSS = `
.build-details {
    font-size: 14px;
}
.build-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 8px;
    align-items: center;
}
.component-name {
    font-weight: bold;
    width: 120px;
    color: #2c3e50;
}
.component-details {
    flex: 1;
    text-align: left;
    padding: 0 10px;
}
.component-price {
    font-weight: bold;
    color: #27ae60;
    min-width: 80px;
    text-align: right;
}
.build-total {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 2px solid #bdc3c7;
    background: #ecf0f1;
    padding: 15px;
    border-radius: 8px;
}
.power-consumption {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 5px;
}
.power-status {
    font-size: 12px;
    margin-top: 5px;
    font-weight: bold;
}
.message.loading {
    background: #95a5a6 !important;
    font-style: italic;
}
.ai-message {
    white-space: pre-line;
}
`;

// Добавляем дополнительные стили
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);