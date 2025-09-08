// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .experience-item, .project-card, .publication-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Simple 3D molecule visualization
const canvas = document.getElementById('moleculeCanvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.6 }),
        new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.6 }),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 })
    ];

    const spheres = [];
    for (let i = 0; i < 15; i++) {
        const sphere = new THREE.Mesh(geometry, materials[i % 3]);
        sphere.position.x = (Math.random() - 0.5) * 20;
        sphere.position.y = (Math.random() - 0.5) * 20;
        sphere.position.z = (Math.random() - 0.5) * 20;
        scene.add(sphere);
        spheres.push(sphere);
    }

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        spheres.forEach((sphere, index) => {
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        });
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Load news from backend JSON
fetch("news.json")
  .then(response => response.json())
  .then(data => {
    const newsFeed = document.getElementById("newsFeed");
    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `
        <img src="${item.image}" alt="News image">
        <div class="news-caption">${item.caption}</div>
      `;
      newsFeed.appendChild(card);
    });
  })
  .catch(err => console.error("Failed to load news:", err));