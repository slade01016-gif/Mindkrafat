// script.js for Atlantis Empire Minecraft Clan Website

// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav a');
const joinBtn = document.getElementById('join-clan-btn');
const sections = document.querySelectorAll('section');
const emblem3D = document.getElementById('emblem-3d');
const form = document.getElementById('join-form');
const pendingPage = document.getElementById('pending-page');
const adminPage = document.getElementById('admin-page');

// Clan Data (dynamically generated)
const clanInfo = {
    name: "Atlantis Empire",
    motto: "Conquer the Depths, Rule the World",
    members: [
        { name: "Poseidon", role: "Leader", skill: "PvP & Strategy" },
        { name: "Neptune", role: "Co-Leader", skill: "Building & Redstone" },
        { name: "Triton", role: "Moderator", skill: "Combat" },
        { name: "Nereus", role: "Veteran", skill: "Exploration" }
    ],
    about: "We are Atlantis Empire, a dominant Minecraft clan specializing in PvP, building, and strategic conquest. Founded in the depths of the ocean, we rise to claim victory in every server we join."
};

// Initialize 3D Emblem (using Three.js for simplicity)
function init3DEmblem() {
    if (!emblem3D) return;

    // Simplified 3D setup (full Three.js would require additional imports)
    emblem3D.innerHTML = `
        <div class="emblem-container">
            <div class="emblem" style="background: linear-gradient(135deg, #ff0000, #0000ff);"></div>
        </div>
    `;

    // Rotation animation
    let angle = 0;
    setInterval(() => {
        angle += 0.5;
        emblem3D.querySelector('.emblem').style.transform = `rotateY(${angle}deg)`;
    }, 30);
}

// Smooth Scrolling with Intersection Observer
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// Form Handling
function handleFormSubmission() {
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            nickname: form.querySelector('#nickname').value,
            discord: form.querySelector('#discord').value,
            skills: form.querySelector('#skills').value
        };

        // Store in localStorage (simulated backend)
        localStorage.setItem('pendingRequest', JSON.stringify(formData));
        window.location.href = 'pending.html';
    });
}

// Admin Approval System (simulated)
function setupAdminControls() {
    if (!adminPage) return;

    const request = JSON.parse(localStorage.getItem('pendingRequest'));
    if (request) {
        adminPage.innerHTML = `
            <h2>New Join Request</h2>
            <p><strong>Nickname:</strong> ${request.nickname}</p>
            <p><strong>Discord:</strong> ${request.discord}</p>
            <p><strong>Skills:</strong> ${request.skills}</p>
            <div class="admin-actions">
                <button id="approve-btn">Approve</button>
                <button id="decline-btn">Decline</button>
            </div>
        `;

        document.getElementById('approve-btn').addEventListener('click', () => {
            alert(`${request.nickname} has been approved!`);
            localStorage.removeItem('pendingRequest');
        });

        document.getElementById('decline-btn').addEventListener('click', () => {
            alert(`${request.nickname} has been declined.`);
            localStorage.removeItem('pendingRequest');
        });
    }
}

// Dynamic Clan Info Loading
function loadClanInfo() {
    const aboutSection = document.getElementById('about');
    const membersSection = document.getElementById('members');

    if (aboutSection) {
        aboutSection.innerHTML = `
            <h2>About ${clanInfo.name}</h2>
            <p>${clanInfo.about}</p>
            <p><em>${clanInfo.motto}</em></p>
        `;
    }

    if (membersSection) {
        membersSection.innerHTML = `
            <h2>Our Elite</h2>
            <div class="members-grid">
                ${clanInfo.members.map(member => `
                    <div class="member-card">
                        <h3>${member.name}</h3>
                        <p>${member.role}</p>
                        <p>${member.skill}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    init3DEmblem();
    setupScrollAnimations();
    loadClanInfo();
    handleFormSubmission();
    setupAdminControls();

    // Join Button Redirect
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            window.location.href = 'form.html';
        });
    }

    // Nav Link Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Parallax Effect for Header
window.addEventListener('scroll', () => {
    if (header) {
        const scrollY = window.scrollY;
        header.style.backgroundPositionY = `${scrollY * 0.5}px`;
    }
});