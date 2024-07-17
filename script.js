document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('nav button');
    const communityList = document.getElementById('communityList');

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
        { name: 'Programming Study Group', description: 'A group for learning programming together.' },
        { name: 'Book Club', description: 'Discuss your favorite books with fellow readers.' },
        { name: 'Fitness Enthusiasts', description: 'Share tips and motivation for staying fit.' },
        { name: 'Amateur Photographers', description: 'Show off your best shots and get feedback.' }
    ];

    // Display mock communities
    function displayCommunities() {
        communityList.innerHTML = '';
        mockCommunities.forEach(community => {
            const card = document.createElement('div');
            card.classList.add('community-card');
            card.innerHTML = `
                <h3>${community.name}</h3>
                <p>${community.description}</p>
                <button>Join</button>
            `;
            communityList.appendChild(card);
        });
    }

    displayCommunities();

    // Form submissions (mock functionality)
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented here.');
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration functionality would be implemented here.');
    });

    document.getElementById('createCommunityForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.elements[0].value;
        const description = e.target.elements[1].value;
        mockCommunities.push({ name, description });
        displayCommunities();
        alert('Community created successfully!');
        e.target.reset();
    });
});