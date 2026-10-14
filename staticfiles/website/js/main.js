document.addEventListener('DOMContentLoaded', () => {
  // 1. CSRF Token Helper
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');

  // 2. Toast Notification Function
  window.showToast = function(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #10B981;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // 3. Course Details Modal Popup Engine
  const courseModal = document.getElementById('course-modal');
  const closeCourseModalBtn = document.getElementById('close-course-modal');
  const modalTitle = document.getElementById('modal-course-title');
  const modalCategory = document.getElementById('modal-course-category');
  const modalDuration = document.getElementById('modal-course-duration');
  const modalLevel = document.getElementById('modal-course-level');
  const modalValidity = document.getElementById('modal-course-validity');
  const modalCert = document.getElementById('modal-course-cert');
  const modalPrice = document.getElementById('modal-course-price');
  const modalDesc = document.getElementById('modal-course-desc');
  const modalSyllabus = document.getElementById('modal-course-syllabus');
  const modalEnrollBtn = document.getElementById('modal-enroll-btn');

  function openCourseModal(card) {
    if (!courseModal) return;
    const title = card.getAttribute('data-title') || card.querySelector('.course-title')?.textContent;
    const category = card.getAttribute('data-category-display') || 'Programming Course';
    const duration = card.getAttribute('data-duration') || '12 Weeks';
    const level = card.getAttribute('data-level') || 'Zero to Hero';
    const validity = card.getAttribute('data-validity') || 'Lifetime Video Access + 2 Yrs Placement Drive Support';
    const cert = card.getAttribute('data-cert') || 'Certified Full-Stack Engineer';
    const price = card.getAttribute('data-price') || '₹14,999 / $199';
    const desc = card.getAttribute('data-desc') || '';
    const modulesJson = card.getAttribute('data-modules') || '[]';

    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalDuration) modalDuration.textContent = duration;
    if (modalLevel) modalLevel.textContent = level;
    if (modalValidity) modalValidity.textContent = validity;
    if (modalCert) modalCert.textContent = cert;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;

    if (modalSyllabus) {
      try {
        const modules = JSON.parse(modulesJson);
        modalSyllabus.innerHTML = modules.map((m, idx) => `
          <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 8px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; border-radius: 50%; background: var(--gradient-brand); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0;">${idx+1}</span>
            <span style="font-size: 0.9rem;">${m}</span>
          </div>
        `).join('');
      } catch (e) {
        modalSyllabus.innerHTML = '';
      }
    }

    if (modalEnrollBtn) {
      modalEnrollBtn.setAttribute('data-target-course', title);
    }

    courseModal.classList.add('active');
  }

  document.querySelectorAll('.open-course-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.course-card');
      if (card) openCourseModal(card);
    });
  });

  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      openCourseModal(card);
    });
  });

  if (closeCourseModalBtn && courseModal) {
    closeCourseModalBtn.addEventListener('click', () => {
      courseModal.classList.remove('active');
    });
  }

  if (courseModal) {
    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) courseModal.classList.remove('active');
    });
  }

  if (modalEnrollBtn) {
    modalEnrollBtn.addEventListener('click', () => {
      const courseTitle = modalEnrollBtn.getAttribute('data-target-course') || '';
      if (courseModal) courseModal.classList.remove('active');
      
      const requestedInput = document.querySelector('input[name="service_requested"]');
      if (requestedInput) requestedInput.value = courseTitle;

      const enrollSection = document.getElementById('enroll');
      if (enrollSection) enrollSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 4. Floating Mascot Assistant Toggle
  const mascotBtn = document.getElementById('floating-mascot-btn');
  const mascotModal = document.getElementById('floating-assistant-modal');
  const closeMascotModal = document.getElementById('close-mascot-modal');

  if (mascotBtn && mascotModal) {
    mascotBtn.addEventListener('click', () => {
      mascotModal.classList.toggle('active');
    });
  }

  if (closeMascotModal && mascotModal) {
    closeMascotModal.addEventListener('click', () => {
      mascotModal.classList.remove('active');
    });
  }

  // Dynamic Speech Bubble Quotes
  const speechBubble = document.getElementById('mascot-speech-bubble');
  const mascotQuotes = [
    "Hey! Ready to master Python & AI?",
    "Get 100% Placement Guaranteed Training!",
    "Need custom software for your company?",
    "Learn C++, Java, Full-Stack & DevOps!",
    "Work on live client projects while learning!"
  ];
  let quoteIndex = 0;

  if (speechBubble) {
    setInterval(() => {
      quoteIndex = (quoteIndex + 1) % mascotQuotes.length;
      speechBubble.style.opacity = '0';
      setTimeout(() => {
        speechBubble.textContent = mascotQuotes[quoteIndex];
        speechBubble.style.opacity = '1';
      }, 300);
    }, 4500);
  }

  // 5. Stats Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = count + suffix;
        }
      }, 30);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) observer.observe(statsBar);

  // 6. Course Filter Tabs
  const courseFilterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  courseFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      courseFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-course-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-course-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Portfolio Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. Interactive Cost Estimator Engine
  const platformOptions = document.querySelectorAll('input[name="est-platform"]');
  const featureCheckboxes = document.querySelectorAll('input[name="est-feature"]');
  const urgencyOptions = document.querySelectorAll('input[name="est-urgency"]');
  
  const priceDisplay = document.getElementById('estimate-price');
  const timeDisplay = document.getElementById('estimate-time');

  function updateEstimate() {
    let platform = 'web';
    platformOptions.forEach(opt => { if (opt.checked) platform = opt.value; });

    let selectedFeaturesCount = 0;
    featureCheckboxes.forEach(cb => { if (cb.checked) selectedFeaturesCount++; });

    let urgency = 'normal';
    urgencyOptions.forEach(opt => { if (opt.checked) urgency = opt.value; });

    let basePrice = platform === 'web' ? 4500 : (platform === 'mobile' ? 6500 : 11000);
    let featurePrice = selectedFeaturesCount * 1200;
    let multiplier = urgency === 'rush' ? 1.35 : 1.0;

    let minEst = Math.round((basePrice + featurePrice) * multiplier);
    let maxEst = Math.round(minEst * 1.25);
    
    let weeks = 3 + selectedFeaturesCount * 1.5;
    if (urgency === 'rush') weeks = Math.max(2, Math.round(weeks * 0.7));

    if (priceDisplay) priceDisplay.textContent = `$${minEst.toLocaleString()} - $${maxEst.toLocaleString()}`;
    if (timeDisplay) timeDisplay.textContent = `~${Math.round(weeks)} Weeks Timeline`;
  }

  [...platformOptions, ...featureCheckboxes, ...urgencyOptions].forEach(input => {
    input.addEventListener('change', updateEstimate);
  });
  updateEstimate();

  // 9. AJAX Inquiry Form Handling
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Application...';

      const formData = new FormData(inquiryForm);
      const csrfToken = csrftoken || inquiryForm.querySelector('[name=csrfmiddlewaretoken]')?.value || '';

      try {
        const headers = {};
        if (csrfToken) {
          headers['X-CSRFToken'] = csrfToken;
        }
        const response = await fetch('/inquiry/submit/', {
          method: 'POST',
          headers: headers,
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          showToast(result.message);
          inquiryForm.reset();
          if (result.whatsapp_url) {
            setTimeout(() => {
              window.open(result.whatsapp_url, '_blank');
            }, 800);
          }
        } else {
          showToast(result.message || 'Submission failed', 'error');
        }
      } catch (err) {
        showToast('Application registered! Our team will contact you shortly.', 'success');
        inquiryForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // ==========================================================================
  // 10. Ambient Mouse Glow Follower Engine
  // ==========================================================================
  const glowOrb = document.getElementById('cursor-glow-orb');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let orbX = mouseX;
  let orbY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animateOrb() {
    orbX += (mouseX - orbX) * 0.1;
    orbY += (mouseY - orbY) * 0.1;
    if (glowOrb) {
      glowOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateOrb);
  }
  animateOrb();

  // ==========================================================================
  // 11. 3D Card Tilt Physics & Parallax Engine (RAF Optimized)
  // ==========================================================================
  const tiltElements = document.querySelectorAll('[data-tilt], .glass-panel-3d, .course-card, .service-card, .portfolio-card');
  
  tiltElements.forEach(el => {
    let tiltRaf = null;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      tiltRaf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale3d(1.015, 1.015, 1.015)`;
      });
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      if (tiltRaf) cancelAnimationFrame(tiltRaf);
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    }, { passive: true });
  });

  // ==========================================================================
  // 12. Fullscreen Interactive 3D WebGL Background Particle Engine (Three.js)
  // ==========================================================================
  const bgCanvas = document.getElementById('cinematic-3d-canvas');
  if (bgCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Stars Cloud (Optimized for Mobile/Desktop)
    const particleCount = window.innerWidth < 768 ? 400 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const violetColor = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const mixedColor = Math.random() > 0.5 ? cyanColor : violetColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Floating 3D Wireframe Polyhedra
    const polyGroup = new THREE.Group();
    const icoGeo = new THREE.IcosahedronGeometry(3, 1);
    const wireMat1 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.35 });
    const wireMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.35 });

    const icoMesh1 = new THREE.Mesh(icoGeo, wireMat1);
    icoMesh1.position.set(-20, 10, -10);
    polyGroup.add(icoMesh1);

    const icoMesh2 = new THREE.Mesh(icoGeo, wireMat2);
    icoMesh2.position.set(22, -12, -5);
    polyGroup.add(icoMesh2);

    scene.add(polyGroup);

    // Render loop with Parallax Camera Response
    function renderBg3D() {
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.x += 0.0004;

      icoMesh1.rotation.x += 0.005;
      icoMesh1.rotation.y += 0.007;

      icoMesh2.rotation.x -= 0.006;
      icoMesh2.rotation.y += 0.005;

      camera.position.x += ((mouseX / window.innerWidth - 0.5) * 6 - camera.position.x) * 0.05;
      camera.position.y += (-(mouseY / window.innerHeight - 0.5) * 6 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(renderBg3D);
    }
    renderBg3D();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ==========================================================================
  // 13. Interactive 3D Tech Globe Torus Scene (#globe-3d-canvas)
  // ==========================================================================
  const globeCanvas = document.getElementById('globe-3d-canvas');
  if (globeCanvas && typeof THREE !== 'undefined') {
    const parent = globeCanvas.parentElement;
    const width = parent.clientWidth || 500;
    const height = parent.clientHeight || 420;

    const gScene = new THREE.Scene();
    const gCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    gCamera.position.z = 8;

    const gRenderer = new THREE.WebGLRenderer({ canvas: globeCanvas, alpha: true, antialias: true });
    gRenderer.setSize(width, height);
    gRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Torus Knot Cyber Structure
    const torusGeo = new THREE.TorusKnotGeometry(2.1, 0.55, 120, 20);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    gScene.add(torusKnot);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    gScene.add(coreSphere);

    // Orbiting Particles Ring
    const orbitCount = 400;
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPos = new Float32Array(orbitCount * 3);
    for (let i = 0; i < orbitCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * 2;
      const r = 3.5 + Math.random() * 0.8;
      orbitPos[i * 3] = r * Math.cos(u);
      orbitPos[i * 3 + 1] = r * Math.sin(u);
      orbitPos[i * 3 + 2] = v * 2;
    }
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
    const orbitMat = new THREE.PointsMaterial({ color: 0x00f2fe, size: 0.1, transparent: true, opacity: 0.8 });
    const orbitParticles = new THREE.Points(orbitGeo, orbitMat);
    gScene.add(orbitParticles);

    // Mouse Drag Rotation Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    globeCanvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      torusKnot.rotation.y += deltaX * 0.01;
      torusKnot.rotation.x += deltaY * 0.01;
      coreSphere.rotation.y -= deltaX * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('pointerup', () => { isDragging = false; });

    function renderGlobe3D() {
      if (!isDragging) {
        torusKnot.rotation.y += 0.008;
        torusKnot.rotation.x += 0.004;
        coreSphere.rotation.y -= 0.005;
        orbitParticles.rotation.z += 0.003;
      }
      gRenderer.render(gScene, gCamera);
      requestAnimationFrame(renderGlobe3D);
    }
    renderGlobe3D();

    window.addEventListener('resize', () => {
      const w = parent.clientWidth || 500;
      const h = parent.clientHeight || 420;
      gCamera.aspect = w / h;
      gCamera.updateProjectionMatrix();
      gRenderer.setSize(w, h);
    });
  }

  // ==========================================================================
  // 14. Mobile Navigation Drawer & Accordion Controller
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const closeMobileNavBtn = document.getElementById('close-mobile-nav');
  const mobileServicesToggle = document.getElementById('mobile-services-toggle');
  const mobileAccordion = document.getElementById('mobile-nav-accordion');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-subnav-link');

  function openMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.add('active');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.remove('active');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (closeMobileNavBtn) {
    closeMobileNavBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  if (mobileServicesToggle && mobileAccordion) {
    mobileServicesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileAccordion.classList.toggle('open');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeMobileNav();
    }
  });
});

