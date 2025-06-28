// Hero Section 3D Background
let heroScene, heroCamera, heroRenderer;
let particles = [];

function initHero() {
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#heroCanvas'),
        alpha: true
    });
    
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroCamera.position.z = 5;

    // Create particles
    const particleGeometry = new THREE.SphereGeometry(0.1, 24, 24);
    const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.7
    });

    for(let i = 0; i < 100; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.x = (Math.random() - 0.5) * 10;
        particle.position.y = (Math.random() - 0.5) * 10;
        particle.position.z = (Math.random() - 0.5) * 10;
        particle.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
        );
        particles.push(particle);
        heroScene.add(particle);
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Update particles
    particles.forEach(particle => {
        particle.position.add(particle.velocity);
        
        // Bounce off boundaries
        if(Math.abs(particle.position.x) > 5) particle.velocity.x *= -1;
        if(Math.abs(particle.position.y) > 5) particle.velocity.y *= -1;
        if(Math.abs(particle.position.z) > 5) particle.velocity.z *= -1;
    });

    // Rotate entire scene
    heroScene.rotation.y += 0.001;
    
    heroRenderer.render(heroScene, heroCamera);
}

// Skills Sphere
let skillsScene, skillsCamera, skillsRenderer;
let skillsSphere;

function initSkillsSphere() {
    skillsScene = new THREE.Scene();
    skillsCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    skillsRenderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#skillsSphere'),
        alpha: true
    });
    
    const size = Math.min(300, window.innerWidth * 0.3);
    skillsRenderer.setSize(size, size);
    skillsCamera.position.z = 5;

    // Create sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true
    });
    skillsSphere = new THREE.Mesh(geometry, material);
    skillsScene.add(skillsSphere);

    animateSkills();
}

function animateSkills() {
    requestAnimationFrame(animateSkills);
    
    skillsSphere.rotation.x += 0.005;
    skillsSphere.rotation.y += 0.005;
    
    skillsRenderer.render(skillsScene, skillsCamera);
}

// Initialize everything when the window loads
window.addEventListener('load', () => {
    initHero();
    initSkillsSphere();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Update hero
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update skills sphere
        const size = Math.min(300, window.innerWidth * 0.3);
        skillsRenderer.setSize(size, size);
    });
});
