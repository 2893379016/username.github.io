// Update time and date function
function updateDateTime() {
    const now = new Date();
    
    // Format date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];
    
    const dateString = `${year} 年 ${month} 月 ${day} 日 ${weekday}`;
    
    // Format time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Update DOM elements
    document.getElementById('date').textContent = dateString;
    document.getElementById('time').textContent = timeString;
}

// Update time every second
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();

// Background image parallax effect
document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background');
    const xPos = e.clientX / window.innerWidth;
    const yPos = e.clientY / window.innerHeight;
    
    background.style.transform = `translate(${-xPos * 15}px, ${-yPos * 15}px)`;
});

// Adjust card hover effects
const cards = document.querySelectorAll('.quote-card, .netease-card, .time-card, .nav-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
});

// Add a custom cursor effect (optional)
const container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-effect');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add stylesheet for custom cursor effect
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .cursor-effect {
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            animation: cursorFade 1s forwards;
        }
        
        @keyframes cursorFade {
            0% {
                opacity: 1;
                width: 5px;
                height: 5px;
            }
            100% {
                opacity: 0;
                width: 25px;
                height: 25px;
            }
        }
    </style>
`);

// Add dynamic quote loading (simulated)
const quotes = [
    { text: "Hello World!", subtext: "一场秋雨一场凉，秋心韵满泪为霜" },
    { text: "生活明朗，万物可爱", subtext: "人间值得，未来可期" },
    { text: "山河远阔，人间烟火", subtext: "无一是你，无一不是你" },
    { text: "温柔且坚定", subtext: "勇敢且自由" }
];

// Change quote every 30 seconds
function updateQuote() {
    const quoteElement = document.querySelector('.quote-content h2');
    const subtextElement = document.querySelector('.quote-content p');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Fade out
    quoteElement.style.opacity = 0;
    subtextElement.style.opacity = 0;
    
    setTimeout(() => {
        // Update content
        quoteElement.textContent = quotes[randomIndex].text;
        subtextElement.textContent = quotes[randomIndex].subtext;
        
        // Fade in
        quoteElement.style.opacity = 1;
        subtextElement.style.opacity = 0.9;
    }, 500);
}

// Initial styles for fade transition
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .quote-content h2, .quote-content p {
            transition: opacity 0.5s ease;
        }
    </style>
`);

// Change quote every 30 seconds
setInterval(updateQuote, 30000);

// Load custom fonts
document.head.insertAdjacentHTML('beforeend', `
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
`);

// Optional: Add console message
console.log('%c Welcome to My Personal Page! ', 'background: #222; color: #bada55; font-size: 24px;'); 