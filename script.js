document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('nav button');
    const communityList = document.getElementById('communityList');
    const exploreList = document.getElementById('exploreList');
    const searchInput = document.getElementById('searchCommunities');

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
        { name: 'Programming Study Group', description: 'A group for learning programming together.', tags: ['programming', 'learning'] },
        { name: 'Book Club', description: 'Discuss your favorite books with fellow readers.', tags: ['books', 'reading'] },
        { name: 'Fitness Enthusiasts', description: 'Share tips and motivation for staying fit.', tags: ['fitness', 'health'] },
        { name: 'Amateur Photographers', description: 'Show off your best shots and get feedback.', tags: ['photography', 'art'] },
        { name: 'Culinary Adventures', description: 'Explore new recipes and cooking techniques.', tags: ['cooking', 'food'] },
        { name: 'Language Exchange', description: 'Practice speaking new languages with native speakers.', tags: ['languages', 'culture'] }
    ];

    // Display communities
    function displayCommunities(container, communities) {
        container.innerHTML = '';
        communities.forEach(community => {
            const card = document.createElement('div');
            card.classList.add('community-card');
            card.innerHTML = `
                <h3>${community.name}</h3>
                <p>${community.description}</p>
                <div class="tags">
                    ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="join-btn">Join</button>
            `;
            container.appendChild(card);
        });

        // Add event listeners to join buttons
        container.querySelectorAll('.join-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showNotification('Joined community successfully!');
            });
        });
    }

    displayCommunities(communityList, mockCommunities.slice(0, 4)); // Display only 4 featured communities
    displayCommunities(exploreList, mockCommunities);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCommunities = mockCommunities.filter(community => 
            community.name.toLowerCase().includes(searchTerm) || 
            community.description.toLowerCase().includes(searchTerm) ||
            community.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        displayCommunities(exploreList, filteredCommunities);
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

        try {
            // Replace with actual API call when backend is ready
            // const response = await axios.post('/api/communities', { name, description, tags });
            mockCommunities.push({ name, description, tags });
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

        // Add animation class
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to community cards on scroll
    function animateOnScroll() {
        const cards = document.querySelectorAll('.community-card');
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