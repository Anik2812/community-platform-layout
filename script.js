document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('nav button');
    const communityList = document.getElementById('communityList');
    const exploreList = document.getElementById('exploreList');
    const eventsList = document.getElementById('eventsList');
    const searchInput = document.getElementById('searchCommunities');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const switchToRegisterLink = document.getElementById('switchToRegister');
    const switchToLoginLink = document.getElementById('switchToLogin');

    // Mock data for communities
    const mockCommunities = [
        { id: 1, name: 'Programming Study Group', description: 'A group for learning programming together.', tags: ['technology', 'learning'], image: 'https://source.unsplash.com/random/300x300/?programming', members: 120 },
        { id: 2, name: 'Book Club', description: 'Discuss your favorite books with fellow readers.', tags: ['arts', 'reading'], image: 'https://source.unsplash.com/random/300x300/?books', members: 85 },
        { id: 3, name: 'Fitness Enthusiasts', description: 'Share tips and motivation for staying fit.', tags: ['lifestyle', 'health'], image: 'https://source.unsplash.com/random/300x300/?fitness', members: 200 },
        { id: 4, name: 'Amateur Photographers', description: 'Show off your best shots and get feedback.', tags: ['arts', 'photography'], image: 'https://source.unsplash.com/random/300x300/?photography', members: 150 },
        { id: 5, name: 'Culinary Adventures', description: 'Explore new recipes and cooking techniques.', tags: ['lifestyle', 'food'], image: 'https://source.unsplash.com/random/300x300/?cooking', members: 95 },
        { id: 6, name: 'Language Exchange', description: 'Practice speaking new languages with native speakers.', tags: ['technology', 'learning'], image: 'https://source.unsplash.com/random/300x300/?language', members: 110 }
    ];

    // Mock data for events
    const mockEvents = [
        { id: 1, name: 'Web Development Workshop', description: 'Learn the basics of web development.', date: '2024-08-15', image: 'https://source.unsplash.com/random/300x300/?webdevelopment', attendees: 50 },
        { id: 2, name: 'Book Reading: Classic Literature', description: 'Join us for a reading of classic literature.', date: '2024-08-20', image: 'https://source.unsplash.com/random/300x300/?literature', attendees: 30 },
        { id: 3, name: 'Community Fitness Challenge', description: 'A 30-day fitness challenge for all levels.', date: '2024-09-01', image: 'https://source.unsplash.com/random/300x300/?exercise', attendees: 100 }
    ];

    // Navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.id.replace('Btn', '');
            sections.forEach(section => {
                section.classList.remove('active');
                section.style.opacity = 0;
            });
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            setTimeout(() => {
                targetSection.style.opacity = 1;
            }, 50);
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Display communities
    function displayCommunities(container, communities) {
        container.innerHTML = '';
        communities.forEach(community => {
            const card = document.createElement('div');
            card.classList.add('swiper-slide');
            card.innerHTML = `
                <div class="community-card" style="background-image: url('${community.image}');">
                    <div class="card-content">
                        <h3>${community.name}</h3>
                        <p>${community.description}</p>
                        <div class="tags">
                            ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <p class="members"><i class="fas fa-users"></i> ${community.members} members</p>
                        <button class="join-btn" data-id="${community.id}">Join</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Initialize Swiper
        new Swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Add join button functionality
        container.querySelectorAll('.join-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const communityId = e.target.dataset.id;
                joinCommunity(communityId);
            });
        });
    }

    // Display events
    function displayEvents(container, events) {
        container.innerHTML = '';
        events.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('event-card');
            card.style.backgroundImage = `url('${event.image}')`;
            card.innerHTML = `
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

        // Add RSVP button functionality
        container.querySelectorAll('.rsvp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.dataset.id;
                rsvpEvent(eventId);
            });
        });
    }

    // Initial display
    displayCommunities(communityList, mockCommunities);
    displayCommunities(exploreList, mockCommunities);
    displayEvents(eventsList, mockEvents);

    // Search functionality
    function searchCommunities() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCommunities = mockCommunities.filter(community => 
            community.name.toLowerCase().includes(searchTerm) || 
            community.description.toLowerCase().includes(searchTerm) ||
            community.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        displayCommunities(exploreList, filteredCommunities);
    }

    searchInput.addEventListener('input', searchCommunities);
    searchBtn.addEventListener('click', searchCommunities);

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

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Login successful!');
            e.target.reset();
        } catch (error) {
            showNotification('Login failed. Please try again.', 'error');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target.elements[0].value;
        const email = e.target.elements[1].value;
        const password = e.target.elements[2].value;
        const confirmPassword = e.target.elements[3].value;

        if (password !== confirmPassword) {
            showNotification('Passwords do not match.', 'error');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Registration successful!');
            e.target.reset();
        } catch (error) {
            showNotification('Registration failed. Please try again.', 'error');
        }
    });

    document.getElementById('createCommunityForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = e.target.elements[0].value;
        const description = e.target.elements[1].value;
        const tags = e.target.elements[2].value.split(',').map(tag => tag.trim());
        const imageFile = e.target.elements[3].files[0];

        try {
            // Simulate image upload and API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            const imageUrl = URL.createObjectURL(imageFile);
            
            const newCommunity = {
                id: mockCommunities.length + 1,
                name,
                description,
                tags,
                image: imageUrl,
                members: 1
            };
            
            mockCommunities.push(newCommunity);
            displayCommunities(exploreList, mockCommunities);
            showNotification('Community created successfully!');
            e.target.reset();
        } catch (error) {
            showNotification('Failed to create community. Please try again.', 'error');
        }
    });

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Switch between login and register forms
    switchToRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login').classList.remove('active');
        document.getElementById('register').classList.add('active');
    });

    switchToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register').classList.remove('active');
        document.getElementById('login').classList.add('active');
    });

    // Get Started button
    getStartedBtn.addEventListener('click', () => {
        document.getElementById('exploreBtn').click();
    });

    // Join community function
    function joinCommunity(communityId) {
        const community = mockCommunities.find(c => c.id === parseInt(communityId));
        if (community) {
            community.members++;
            showNotification(`You've joined ${community.name}!`);
            displayCommunities(communityList, mockCommunities);
            displayCommunities(exploreList, mockCommunities);
        }
    }

    // RSVP event function
    function rsvpEvent(eventId) {
        const event = mockEvents.find(e => e.id === parseInt(eventId));
        if (event) {
            event.attendees++;
            showNotification(`You've RSVP'd to ${event.name}!`);
            displayEvents(eventsList, mockEvents);
        }
    }

    // Add animation to community cards and event cards on scroll
    function animateOnScroll() {
        const cards = document.querySelectorAll('.community-card, .event-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            if (cardTop < window.innerHeight && cardBottom > 0) {
                card.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Call once on load to check for visible elements

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Add hover effect to community and event cards
    document.querySelectorAll('.community-card, .event-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add loading animation
    function showLoading() {
        const loading = document.createElement('div');
        loading.classList.add('loading');
        loading.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loading);
    }

    function hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    // Simulate loading when switching sections
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            showLoading();
            setTimeout(hideLoading, 500);
        });
    });
});