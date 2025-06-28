// Project data
const projects = [
    {
        title: "Desktop Application",
        description: "Advanced C# .NET desktop application with modern UI and powerful features. Built using WPF with MVVM architecture.",
        technologies: ["C#", ".NET", "WPF", "SQL Server"],
        features: [
            "Real-time data processing",
            "Custom UI controls",
            "Advanced data visualization",
            "Automated reporting system"
        ],
        image: "project1.jpg",
        category: "Desktop"
    },
    {
        title: "Enterprise Web Platform",
        description: "Full-stack web application with responsive design and real-time features. Built with ASP.NET Core and React.",
        technologies: ["ASP.NET Core", "React", "SQL Server", "SignalR"],
        features: [
            "Real-time notifications",
            "Advanced dashboard",
            "Role-based access control",
            "RESTful API architecture"
        ],
        image: "project2.jpg",
        category: "Web"
    },
    {
        title: "Cross-Platform Mobile App",
        description: "Feature-rich mobile application with native performance and elegant UI. Developed using Xamarin.",
        technologies: ["Xamarin", "C#", "SQLite", "Azure"],
        features: [
            "Offline-first architecture",
            "Push notifications",
            "Location-based services",
            "Biometric authentication"
        ],
        image: "project3.jpg",
        category: "Mobile"
    },
    {
        title: "AI-Powered Analytics",
        description: "Machine learning application for predictive analytics and data visualization using Python.",
        technologies: ["Python", "TensorFlow", "scikit-learn", "pandas"],
        features: [
            "Predictive modeling",
            "Natural Language Processing",
            "Interactive visualizations",
            "Automated ML pipeline"
        ],
        image: "project4.jpg",
        category: "AI"
    }
];

// Populate projects with 3D tilt effect
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-category', project.category);
        
        card.innerHTML = `
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <div class="project-category">
                        <i class="fas ${getCategoryIcon(project.category)}"></i>
                        <span>${project.category}</span>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-features">
                    ${project.features.map(feature => `
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="technologies">
                    ${project.technologies.map(tech => `
                        <span class="tech-badge">
                            <i class="fas ${getTechIcon(tech)}"></i>
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                <div class="project-links">
                    <a href="#" class="project-link">
                        <i class="fas fa-eye"></i>
                        View Project
                    </a>
                    <a href="#" class="project-link">
                        <i class="fab fa-github"></i>
                        Source Code
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });

    // Initialize tilt effect for project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.02
    });
}

// Get icon for project category
function getCategoryIcon(category) {
    const icons = {
        'Desktop': 'fa-desktop',
        'Web': 'fa-globe',
        'Mobile': 'fa-mobile-alt',
        'AI': 'fa-brain'
    };
    return icons[category] || 'fa-code';
}

// Get icon for technology
function getTechIcon(tech) {
    const icons = {
        'C#': 'fa-windows',
        '.NET': 'fa-microsoft',
        'WPF': 'fa-window-maximize',
        'SQL Server': 'fa-database',
        'React': 'fa-react',
        'Python': 'fa-python',
        'TensorFlow': 'fa-brain',
        'Xamarin': 'fa-mobile-alt',
        'Azure': 'fa-cloud'
    };
    return icons[tech] || 'fa-code';
}

// Handle contact form submission with animation
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        
        // Show sending animation
        button.innerHTML = `
            <span>Sending</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        button.disabled = true;
        
        // Simulate sending (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success animation
        button.innerHTML = `
            <span>Sent Successfully!</span>
            <i class="fas fa-check"></i>
        `;
        button.style.backgroundColor = '#00ff88';
        
        // Reset form after delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
            button.disabled = false;
            form.reset();
        }, 3000);
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const parallaxElements = document.querySelectorAll('.parallax');
        
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.2;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateProjects();
    initContactForm();
    initParallax();
    
    // Add scroll-based navbar background
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
});
