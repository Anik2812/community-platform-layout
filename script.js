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
        { id: 1, name: 'AI Innovators', description: 'A hub for AI enthusiasts and innovators.', tags: ['technology', 'AI'], image: 'https://images.pexels.com/photos/18069859/pexels-photo-18069859/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-explores-how-humans-can-creatively-collaborate-with-artificial-general-intelligence-agi-in-the-future-and-how-it-can.png', members: 1520 },
        { id: 2, name: 'Digital Art Collective', description: 'Bringing together digital artists from all disciplines.', tags: ['arts', 'digital'], image: 'https://images.pexels.com/photos/4008890/pexels-photo-4008890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: 985 },
        { id: 3, name: 'Tech Fitness', description: 'Where technology meets fitness and wellness.', tags: ['lifestyle', 'tech', 'fitness'], image: 'https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: 2150 },
        { id: 4, name: 'Future Readers', description: 'Explore the future of literature and digital reading.', tags: ['arts', 'technology', 'literature'], image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: 1320 },
        { id: 5, name: 'Green Tech Initiative', description: 'Innovating for a sustainable future through technology.', tags: ['technology', 'environment'], image: 'https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg', members: 1750 },
        { id: 6, name: 'Virtual Gastronomy', description: 'Explore culinary innovations in the digital age.', tags: ['lifestyle', 'food', 'technology'], image: 'https://images.pexels.com/photos/27061057/pexels-photo-27061057/free-photo-of-pasta-and-bread-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: 890 },
        { id: 7, name: 'Digital Nomads Unite', description: 'Connect with fellow tech-savvy remote workers and travelers.', tags: ['lifestyle', 'travel', 'technology'], image: 'https://images.pexels.com/photos/5717640/pexels-photo-5717640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: 1630 },
        { id: 8, name: 'Quantum Computing Explorers', description: 'Dive into the fascinating world of quantum computing.', tags: ['technology', 'science'], image: 'https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: 1280 },
    ];

    // Mock data for events
    const mockEvents = [
        { id: 1, name: 'AI & Ethics Symposium 2024', description: 'Exploring the ethical implications of AI advancements.', date: '2024-09-15', image: 'https://images.pexels.com/photos/17485607/pexels-photo-17485607/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-ai-assitance-in-the-control-systems-needed-to-create-fusion-energy-it-was-created-by-khyati-trehan-as-part.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', attendees: 500 },
        { id: 2, name: 'Virtual Reality Art Exhibition', description: 'Showcasing cutting-edge artworks in virtual reality.', date: '2024-08-20', image: 'https://images.pexels.com/photos/532559/pexels-photo-532559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', attendees: 250 },
        { id: 3, name: 'Tech-Enhanced Wellness Retreat', description: 'A 3-day retreat combining technology and wellness practices.', date: '2024-07-01', image: 'https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', attendees: 100 },
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
                    <img src="${community.image}" alt="${community.name}" loading="lazy">
                    <div class="card-content">
                        <h3>${community.name}</h3>
                        <p>${community.description}</p>
                        <div class="tags">
                            ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <p class="members"><i class="fas fa-users"></i> ${community.members.toLocaleString()} members</p>
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
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
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
                <img src="${event.image}" alt="${event.name}" loading="lazy">
                <div class="event-content">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p class="event-date"><i class="fas fa-calendar-alt"></i> ${formatDate(event.date)}</p>
                    <p class="event-attendees"><i class="fas fa-user-friends"></i> ${event.attendees} attending</p>
                    <button class="rsvp-btn" data-id="${event.id}">RSVP</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Initial display
    displayCommunities(featuredCommunities, mockCommunities.slice(0, 6));
    displayCommunities(exploreList, mockCommunities);
    displayEvents(eventsList, mockEvents);

    // Search functionality
    searchInput.addEventListener('input', debounce(() => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCommunities = mockCommunities.filter(community => 
            community.name.toLowerCase().includes(searchTerm) || 
            community.description.toLowerCase().includes(searchTerm) ||
            community.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        displayCommunities(exploreList, filteredCommunities);
    }, 300));

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

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
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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
            // Simulate AI response after a short delay
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                addChatMessage('AI Assistant', aiResponse);
            }, 1000);
        }
    });

    function addChatMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        if (sender === 'You') messageElement.classList.add('user');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simple AI response generator (for demonstration purposes)
    function generateAIResponse(message) {
        const responses = [
            "That's an interesting point about communities. Can you elaborate?",
            "I understand your perspective on that topic. Have you considered joining a related community?",
            "Your insights are valuable. How do you think we can improve the platform based on that?",
            "Thanks for sharing. Are there any specific features you'd like to see in our communities?",
            "I appreciate your input. How has your experience been with similar communities elsewhere?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Typing effect for hero text
    const heroText = "Connect, Share, and Grow with AI-Powered Communities";
    const heroElement = document.querySelector('.typing-effect');
    let i = 0;

    function typeWriter() {
        if (i < heroText.length) {
            heroElement.innerHTML += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add intersection observer for fade-in effect
    const fadeElems = document.querySelectorAll('.community-card, .event-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        elem.style.opacity = 0;
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(elem);
    });
});