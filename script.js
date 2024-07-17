document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const featuredCommunities = document.getElementById('featuredCommunities');
    const exploreList = document.getElementById('exploreList');
    const eventsList = document.getElementById('eventsList');
    const searchInput = document.getElementById('searchCommunities');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Mock data for communities
    const mockCommunities = [
        { id: 1, name: 'Tech Innovators', description: 'A hub for tech enthusiasts and innovators.', tags: ['technology', 'innovation'], image: 'https://source.unsplash.com/random/300x200/?technology', members: 1520 },
        { id: 2, name: 'Creative Arts Collective', description: 'Bringing together artists from all disciplines.', tags: ['arts', 'creativity'], image: 'https://source.unsplash.com/random/300x200/?art', members: 985 },
        { id: 3, name: 'Fitness Fanatics', description: 'Motivate and support each other in fitness journeys.', tags: ['lifestyle', 'fitness'], image: 'https://source.unsplash.com/random/300x200/?fitness', members: 2150 },
        { id: 4, name: 'Bookworms Unite', description: 'Discuss and discover great books together.', tags: ['arts', 'literature'], image: 'https://source.unsplash.com/random/300x200/?books', members: 1320 },
        { id: 5, name: 'Green Earth Initiative', description: 'Working together for a sustainable future.', tags: ['lifestyle', 'environment'], image: 'https://source.unsplash.com/random/300x200/?nature', members: 1750 },
        { id: 6, name: 'Culinary Explorers', description: 'Embark on gastronomic adventures around the world.', tags: ['lifestyle', 'food'], image: 'https://source.unsplash.com/random/300x200/?food', members: 890 },
        { id: 7, name: 'Digital Nomads', description: 'Connect with fellow remote workers and travelers.', tags: ['lifestyle', 'travel'], image: 'https://source.unsplash.com/random/300x200/?travel', members: 1630 },
        { id: 8, name: 'AI Enthusiasts', description: 'Explore the fascinating world of artificial intelligence.', tags: ['technology', 'AI'], image: 'https://source.unsplash.com/random/300x200/?robot', members: 1280 },
    ];

    // Mock data for events
    const mockEvents = [
        { id: 1, name: 'Tech Conference 2024', description: 'Annual gathering of tech innovators and enthusiasts.', date: '2024-09-15', image: 'https://source.unsplash.com/random/300x200/?conference', attendees: 500 },
        { id: 2, name: 'Art Exhibition: Urban Perspectives', description: 'Showcasing urban-inspired artworks from local artists.', date: '2024-08-20', image: 'https://source.unsplash.com/random/300x200/?exhibition', attendees: 250 },
        { id: 3, name: 'Fitness Bootcamp', description: 'Intensive 3-day fitness bootcamp for all levels.', date: '2024-07-01', image: 'https://source.unsplash.com/random/300x200/?bootcamp', attendees: 100 },
    ];

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Display communities
    function displayCommunities(container, communities) {
        container.innerHTML = '';
        communities.forEach(community => {
            const card = document.createElement('div');
            card.classList.add('swiper-slide');
            card.innerHTML = `
                <div class="community-card">
                    <img src="${community.image}" alt="${community.name}">
                    <div class="card-content">
                        <h3>${community.name}</h3>
                        <p>${community.description}</p>
                        <div class="tags">
                            ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <p class="members"><i class="fas fa-users"></i> ${community.members} members</p>
                        <button class="join-btn" data-id="${community.id}">Join Community</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Initialize Swiper for featured communities
        if (container === featuredCommunities) {
            new Swiper('.featured-communities', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    968: {
                        slidesPerView: 3,
                    }
                }
            });
        }
    }

    // Display events
    function displayEvents(container, events) {
        container.innerHTML = '';
        events.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('event-card');
            card.innerHTML = `
                <img src="${event.image}" alt="${event.name}">
                <div class="card-content">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p class="date"><i class="fas fa-calendar-alt"></i> ${event.date}</p>
                    <p class="attendees"><i class="fas fa-user-friends"></i> ${event.attendees} attending</p>
                    <button class="rsvp-btn" data-id="${event.id}">RSVP</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Initial display
    displayCommunities(featuredCommunities, mockCommunities.slice(0, 6));
    displayCommunities(exploreList, mockCommunities);
    displayEvents(eventsList, mockEvents);

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCommunities = mockCommunities.filter(community => 
            community.name.toLowerCase().includes(searchTerm) || 
            community.description.toLowerCase().includes(searchTerm) ||
            community.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        displayCommunities(exploreList, filteredCommunities);
    });

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            let filteredCommunities;
            if (filter === 'all') {
                filteredCommunities = mockCommunities;
            } else {
                filteredCommunities = mockCommunities.filter(community =>
                    community.tags.includes(filter)
                );
            }
            displayCommunities(exploreList, filteredCommunities);
        });
    });

    // Load more functionality
    let currentPage = 1;
    const communitiesPerPage = 6;
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        const startIndex = (currentPage - 1) * communitiesPerPage;
        const endIndex = startIndex + communitiesPerPage;
        const newCommunities = mockCommunities.slice(startIndex, endIndex);
        displayCommunities(exploreList, [...exploreList.children, ...newCommunities]);

        if (endIndex >= mockCommunities.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Modal functionality
    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    loginBtn.addEventListener('click', () => openModal(loginModal));
    registerBtn.addEventListener('click', () => openModal(registerModal));

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal'));
        });
    });

    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add login logic here
        showNotification('Login successful!');
        closeModal(loginModal);
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add registration logic here
        showNotification('Registration successful!');
        closeModal(registerModal);
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Chat functionality
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage('You', message);
            chatInput.value = '';
            // Simulate a response after a short delay
            setTimeout(() => {
                addChatMessage('Bot', 'Thank you for your message. This is a simulated response.');
            }, 1000);
        }
    });

    function addChatMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Typing effect for hero text
    const heroText = "Connect, Share, and Grow Together";
    const heroElement = document.querySelector('.typing-effect');
    let i = 0;

    function typeWriter() {
        if (i < heroText.length) {
            heroElement.innerHTML += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
});