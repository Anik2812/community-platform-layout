document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('nav button');
    const communityList = document.getElementById('communityList');
    const exploreList = document.getElementById('exploreList');
    const eventsList = document.getElementById('eventsList');
    const searchInput = document.getElementById('searchCommunities');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.id.replace('Btn', '');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Mock data for communities
    const mockCommunities = [
        { name: 'Programming Study Group', description: 'A group for learning programming together.', tags: ['technology', 'learning'], image: 'https://source.unsplash.com/random/300x300/?programming' },
        { name: 'Book Club', description: 'Discuss your favorite books with fellow readers.', tags: ['arts', 'reading'], image: 'https://source.unsplash.com/random/300x300/?books' },
        { name: 'Fitness Enthusiasts', description: 'Share tips and motivation for staying fit.', tags: ['lifestyle', 'health'], image: 'https://source.unsplash.com/random/300x300/?fitness' },
        { name: 'Amateur Photographers', description: 'Show off your best shots and get feedback.', tags: ['arts', 'photography'], image: 'https://source.unsplash.com/random/300x300/?photography' },
        { name: 'Culinary Adventures', description: 'Explore new recipes and cooking techniques.', tags: ['lifestyle', 'food'], image: 'https://source.unsplash.com/random/300x300/?cooking' },
        { name: 'Language Exchange', description: 'Practice speaking new languages with native speakers.', tags: ['technology', 'learning'], image: 'https://source.unsplash.com/random/300x300/?language' }
    ];

    // Mock data for events
    const mockEvents = [
        { name: 'Web Development Workshop', description: 'Learn the basics of web development.', date: '2024-08-15', image: 'https://source.unsplash.com/random/300x300/?webdevelopment' },
        { name: 'Book Reading: Classic Literature', description: 'Join us for a reading of classic literature.', date: '2024-08-20', image: 'https://source.unsplash.com/random/300x300/?literature' },
        { name: 'Community Fitness Challenge', description: 'A 30-day fitness challenge for all levels.', date: '2024-09-01', image: 'https://source.unsplash.com/random/300x300/?exercise' }
    ];

    // Display communities
    function displayCommunities(container, communities) {
        container.innerHTML = '';
        communities.forEach(community => {
            const card = document.createElement('div');
            card.classList.add('swiper-slide');
            card.innerHTML = `
                <div class="community-card" style="background-image: url('${community.image}');">
                    <h3>${community.name}</h3>
                    <p>${community.description}</p>
                    <div class="tags">
                        ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="join-btn">Join</button>
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
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
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
                <h3>${event.name}</h3>
                <p>${event.description}</p>
                <p>Date: ${event.date}</p>
                <button class="rsvp-btn">RSVP</button>
            `;
            container.appendChild(card);
        });
    }

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

            if (filter === 'all') {
                displayCommunities(exploreList, mockCommunities);
            } else {
                const filteredCommunities = mockCommunities.filter(community =>
                    community.tags.includes(filter)
                );
                displayCommunities(exploreList, filteredCommunities);
            }
        });
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        try {
            // Replace with actual API call when backend is ready
            // const response = await axios.post('/api/auth/login', { email, password });
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
            // Replace with actual API call when backend is ready
            // const response = await axios.post('/api/auth/register', { username, email, password });
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
            // In a real application, you would upload the image file to a server or cloud storage
            const imageUrl = URL.createObjectURL(imageFile);
            
            // Replace with actual API call when backend is ready
            // const response = await axios.post('/api/communities', { name, description, tags, imageUrl });
            mockCommunities.push({ name, description, tags, image: imageUrl });
            displayCommunities(exploreList, mockCommunities);
            showNotification('Community created successfully!');
            e.target.reset();
        } catch (error) {
            showNotification('Failed to create community. Please try again.', 'error');
        }
    });

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
    document.getElementById('switchToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login').classList.remove('active');
        document.getElementById('register').classList.add('active');
    });

    document.getElementById('switchToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register').classList.remove('active');
        document.getElementById('login').classList.add('active');
    });

    // Get Started button
    document.getElementById('getStartedBtn').addEventListener('click', () => {
        document.getElementById('exploreBtn').click();
    });

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
});