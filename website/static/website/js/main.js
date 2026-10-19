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
    const toastType = (type || 'success').toLowerCase();
    toast.className = `toast toast-${toastType}`;

    let iconSvg = '';
    if (toastType === 'error') {
      iconSvg = `
        <svg class="toast-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #EF4444;">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    } else if (toastType === 'warning') {
      iconSvg = `
        <svg class="toast-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #F59E0B;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      `;
    } else if (toastType === 'info') {
      iconSvg = `
        <svg class="toast-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #00F2FE;">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <line x1="12" y1="16" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg class="toast-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #10B981;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      `;
    }

    toast.innerHTML = `
      ${iconSvg}
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
    document.body.style.overflow = 'hidden';
    const courseDialog = courseModal.querySelector('.course-modal-dialog');
    if (courseDialog) courseDialog.scrollTop = 0;
  }

  function closeCourseModal() {
    if (!courseModal) return;
    courseModal.classList.remove('active');
    document.body.style.overflow = '';
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

  if (closeCourseModalBtn) {
    closeCourseModalBtn.addEventListener('click', closeCourseModal);
  }

  if (courseModal) {
    courseModal.addEventListener('click', (e) => {
      if (e.target === courseModal) closeCourseModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && courseModal && courseModal.classList.contains('active')) {
      closeCourseModal();
    }
  });

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

  // 9. AJAX Inquiry Form Handling with Precise Field Error Indicators
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    // Message Textarea Expand/Collapse Controller
    const messageTextarea = inquiryForm.querySelector('textarea[name="message"]');
    const resizeBtn = document.getElementById('toggle-message-expand');
    if (messageTextarea && resizeBtn) {
      const expandSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
      const compressSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg>`;
      
      let isManuallyExpanded = false;

      function setExpandState(expanded) {
        isManuallyExpanded = expanded;
        if (expanded) {
          messageTextarea.style.height = '230px';
          resizeBtn.classList.add('expanded');
          resizeBtn.innerHTML = `${compressSvg}<span class="resize-btn-text">Compact</span>`;
          resizeBtn.setAttribute('title', 'Collapse message field back to normal size');
        } else {
          messageTextarea.style.height = '110px';
          resizeBtn.classList.remove('expanded');
          resizeBtn.innerHTML = `${expandSvg}<span class="resize-btn-text">Expand</span>`;
          resizeBtn.setAttribute('title', 'Expand message field for more writing space');
        }
      }

      resizeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setExpandState(!isManuallyExpanded);
      });

      // Synchronize resize button state if user drags the corner resize handle
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            const height = entry.contentRect.height;
            if (height > 170 && !isManuallyExpanded) {
              isManuallyExpanded = true;
              resizeBtn.classList.add('expanded');
              resizeBtn.innerHTML = `${compressSvg}<span class="resize-btn-text">Compact</span>`;
              resizeBtn.setAttribute('title', 'Collapse message field back to normal size');
            } else if (height <= 130 && isManuallyExpanded) {
              isManuallyExpanded = false;
              resizeBtn.classList.remove('expanded');
              resizeBtn.innerHTML = `${expandSvg}<span class="resize-btn-text">Expand</span>`;
              resizeBtn.setAttribute('title', 'Expand message field for more writing space');
            }
          }
        });
        resizeObserver.observe(messageTextarea);
      }
    }

    const errorSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    function setFieldError(fieldName, message) {
      const fieldInput = inquiryForm.querySelector(`[name="${fieldName}"]`);
      if (!fieldInput) return;

      fieldInput.classList.add('is-invalid');
      fieldInput.classList.remove('shake-field');
      // Trigger reflow to restart animation if already added
      void fieldInput.offsetWidth;
      fieldInput.classList.add('shake-field');
      setTimeout(() => fieldInput.classList.remove('shake-field'), 450);

      const formGroup = fieldInput.closest('.form-group') || fieldInput.parentElement;
      if (formGroup) {
        formGroup.classList.add('has-error');
        let errorContainer = formGroup.querySelector('.field-error-msg') || formGroup.querySelector(`#error-${fieldName}`);
        if (!errorContainer) {
          errorContainer = document.createElement('div');
          errorContainer.className = 'field-error-msg';
          errorContainer.id = `error-${fieldName}`;
          formGroup.appendChild(errorContainer);
        }
        errorContainer.innerHTML = `${errorSvg} <span class="error-text">${message}</span>`;
        errorContainer.style.display = 'flex';
      }
    }

    function clearFieldError(fieldInput) {
      if (!fieldInput) return;
      fieldInput.classList.remove('is-invalid');
      const formGroup = fieldInput.closest('.form-group') || fieldInput.parentElement;
      if (formGroup) {
        formGroup.classList.remove('has-error');
        const errorContainer = formGroup.querySelector('.field-error-msg');
        if (errorContainer) {
          errorContainer.style.display = 'none';
          const textSpan = errorContainer.querySelector('.error-text');
          if (textSpan) textSpan.textContent = '';
        }
      }
    }

    function clearAllErrors() {
      inquiryForm.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
      inquiryForm.querySelectorAll('.has-error').forEach(group => group.classList.remove('has-error'));
      inquiryForm.querySelectorAll('.field-error-msg').forEach(msg => {
        msg.style.display = 'none';
        const textSpan = msg.querySelector('.error-text');
        if (textSpan) textSpan.textContent = '';
      });
      const topAlert = inquiryForm.parentElement ? inquiryForm.parentElement.querySelector('.form-alert-banner') : null;
      if (topAlert) topAlert.style.display = 'none';
    }

    // Attach real-time input listeners to clear error state as the user types
    inquiryForm.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => clearFieldError(input));
      input.addEventListener('change', () => clearFieldError(input));
    });

    function validateInquiryForm() {
      clearAllErrors();
      const errors = {};

      const nameInput = inquiryForm.querySelector('[name="full_name"]');
      const emailInput = inquiryForm.querySelector('[name="email"]');
      const phoneInput = inquiryForm.querySelector('[name="phone"]');
      const messageInput = inquiryForm.querySelector('[name="message"]');

      // Full Name Validation
      if (nameInput) {
        const val = nameInput.value.trim();
        if (!val) {
          errors['full_name'] = 'Please enter your full name.';
        } else if (val.length < 2) {
          errors['full_name'] = 'Full name must contain at least 2 characters.';
        }
      }

      // Email Validation
      if (emailInput) {
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z0-9-]{2,}$/;
        if (!val) {
          errors['email'] = 'Please enter your email address.';
        } else if (!val.includes('@')) {
          errors['email'] = 'Please include an "@" in your email address.';
        } else if (!emailRegex.test(val)) {
          errors['email'] = 'Please enter a valid email address with a domain (e.g., name@gmail.com).';
        }
      }

      // Phone Number Validation
      if (phoneInput) {
        const val = phoneInput.value.trim();
        const cleanDigits = val.replace(/[\s\-\(\)\+]/g, '');
        if (!val) {
          errors['phone'] = 'Please enter your phone number.';
        } else if (!/^\d+$/.test(cleanDigits) || cleanDigits.length < 7 || cleanDigits.length > 15) {
          errors['phone'] = 'Please enter a valid phone number (7 to 15 digits).';
        }
      }

      // Message Validation
      if (messageInput) {
        const val = messageInput.value.trim();
        if (!val) {
          errors['message'] = 'Please enter your message or requirements.';
        } else if (val.length < 5) {
          errors['message'] = 'Please enter at least 5 characters for your message.';
        }
      }

      return errors;
    }

    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. Client-side validation check
      const clientErrors = validateInquiryForm();
      const errorKeys = Object.keys(clientErrors);
      if (errorKeys.length > 0) {
        // Highlight all failing fields
        errorKeys.forEach(field => {
          setFieldError(field, clientErrors[field]);
        });

        // Focus & scroll first invalid field into view
        const firstField = inquiryForm.querySelector(`[name="${errorKeys[0]}"]`);
        if (firstField) {
          firstField.focus();
          firstField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Show prominent warning toast with exact field message
        showToast(clientErrors[errorKeys[0]], 'warning');
        return;
      }

      // 2. Submit via AJAX
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

        if (response.ok && result.success) {
          clearAllErrors();
          showToast(result.message, 'success');
          inquiryForm.reset();
          if (result.whatsapp_url) {
            setTimeout(() => {
              window.open(result.whatsapp_url, '_blank');
            }, 800);
          }
        } else {
          // Backend validation errors returned
          let firstErrorMsg = result.message || 'Please fill in all required fields accurately.';
          let firstErrorField = null;

          if (result.errors) {
            if (Array.isArray(result.errors)) {
              result.errors.forEach(errStr => {
                const parts = errStr.split(':');
                const fieldName = parts[0].trim();
                const msg = parts.slice(1).join(':').trim();
                if (!firstErrorField) firstErrorField = fieldName;
                setFieldError(fieldName, msg || errStr);
              });
            } else if (typeof result.errors === 'object') {
              Object.entries(result.errors).forEach(([field, errList]) => {
                const msg = Array.isArray(errList) ? errList[0] : String(errList);
                if (!firstErrorField) firstErrorField = field;
                setFieldError(field, msg);
              });
            }
          }

          if (firstErrorField) {
            const firstField = inquiryForm.querySelector(`[name="${firstErrorField}"]`);
            if (firstField) {
              firstField.focus();
              firstField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }

          showToast(firstErrorMsg, 'error');
        }
      } catch (err) {
        showToast('Network error while submitting enquiry. Please check connection.', 'error');
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

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
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
  // ==========================================================================
  // 12. Ultra-HD Cinematic Cyber Constellation & Neural Node Flow Engine
  // ==========================================================================
  const bgCanvas = document.getElementById('cinematic-3d-canvas');
  if (bgCanvas) {
    let canvas = bgCanvas;
    let ctx = canvas.getContext('2d');
    if (!ctx) {
      const clone = canvas.cloneNode(false);
      canvas.parentNode.replaceChild(clone, canvas);
      canvas = clone;
      ctx = canvas.getContext('2d');
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = window.innerWidth < 768;

    let nodes = [];
    let stars = [];
    let pulses = [];

    const cyanRgb = '0, 242, 254';
    const violetRgb = '139, 92, 246';
    const blueRgb = '79, 172, 254';

    function initCanvasDimensions() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      isMobile = width < 768;
    }

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    }, { passive: true });

    let lastScrollY = window.pageYOffset || 0;
    let scrollOffset = 0;
    window.addEventListener('scroll', () => {
      const currentY = window.pageYOffset || 0;
      scrollOffset += (currentY - lastScrollY) * 0.08;
      lastScrollY = currentY;
    }, { passive: true });

    function createNodes() {
      nodes = [];
      stars = [];
      pulses = [];

      const nodeCount = isMobile ? 36 : 68;
      const starCount = isMobile ? 40 : 85;

      for (let i = 0; i < nodeCount; i++) {
        const isCyan = Math.random() > 0.45;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
          vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
          radius: Math.random() * 1.5 + 1.8,
          baseRadius: Math.random() * 1.5 + 1.8,
          rgb: isCyan ? cyanRgb : violetRgb,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseVal: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.35 + 0.55
        });
      }

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: -(Math.random() * 0.2 + 0.08),
          radius: Math.random() * 0.9 + 0.6,
          alpha: Math.random() * 0.5 + 0.25,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleVal: Math.random() * Math.PI * 2,
          rgb: Math.random() > 0.5 ? cyanRgb : blueRgb
        });
      }
    }

    initCanvasDimensions();
    createNodes();

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvasDimensions();
        createNodes();
      }, 150);
    });

    const maxDistance = isMobile ? 95 : 125;
    const maxDistanceSq = maxDistance * maxDistance;
    const mouseRadius = isMobile ? 120 : 150;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    let animId = null;
    let isVisible = true;

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(renderHDFrame);
      }
    });

    let lastTime = performance.now();

    function renderHDFrame(now) {
      if (!isVisible) {
        animId = null;
        return;
      }

      lastTime = now;

      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      scrollOffset *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // Layer 1: Celestial Micro-Stars (Twinkling embers in deep space)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y += s.vy - scrollOffset * 0.04;
        s.twinkleVal += s.twinkleSpeed;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        } else if (s.y > height + 10) {
          s.y = -10;
          s.x = Math.random() * width;
        }

        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkleVal));
        ctx.fillStyle = `rgba(${s.rgb}, ${currentAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer 2: Constellation Connections (Plexus Neural Lines)
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDistance) * 0.28;

            ctx.strokeStyle = `rgba(${n1.rgb}, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            if (pulses.length < 12 && Math.random() < 0.003) {
              pulses.push({
                x1: n1.x, y1: n1.y,
                x2: n2.x, y2: n2.y,
                progress: 0,
                speed: 0.02 + Math.random() * 0.02,
                rgb: cyanRgb
              });
            }
          }
        }

        // Interactive cursor connections
        if (mouse.active) {
          const mdx = n1.x - mouse.x;
          const mdy = n1.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouseRadiusSq) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseRadius) * 0.4;
            ctx.strokeStyle = `rgba(${cyanRgb}, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            const force = (1 - mDist / mouseRadius) * 0.8;
            n1.x += (mdx / mDist) * force;
            n1.y += (mdy / mDist) * force;
          }
        }
      }

      // Layer 3: Dynamic Data Packet Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const px = p.x1 + (p.x2 - p.x1) * p.progress;
        const py = p.y1 + (p.y2 - p.y1) * p.progress;
        const pulseAlpha = Math.sin(p.progress * Math.PI) * 0.85;

        ctx.fillStyle = `rgba(${p.rgb}, ${pulseAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer 4: Ultra-HD Luminous Nodes with Radial Glow Auras
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        n.x += n.vx;
        n.y += n.vy - scrollOffset * 0.06;
        n.pulseVal += n.pulseSpeed;

        const pad = 25;
        if (n.x < -pad) n.x = width + pad;
        else if (n.x > width + pad) n.x = -pad;
        if (n.y < -pad) n.y = height + pad;
        else if (n.y > height + pad) n.y = -pad;

        const pulseScale = 1 + 0.16 * Math.sin(n.pulseVal);
        const radius = n.baseRadius * pulseScale;

        // Soft outer glow aura
        const auraGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 3.2);
        auraGrad.addColorStop(0, `rgba(${n.rgb}, 0.55)`);
        auraGrad.addColorStop(0.4, `rgba(${n.rgb}, 0.15)`);
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Crisp white-hot core
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderHDFrame);
    }

    animId = requestAnimationFrame(renderHDFrame);
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

  // ==========================================================================
  // 15. Navigation Highlight & Dynamic Section Scroll-Spy Engine
  // ==========================================================================
  const navLinks = document.querySelectorAll('.navbar .nav-link, .navbar .nav-btn-contact');
  const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
  const drawerLinks = document.querySelectorAll('.mobile-menu-list .mobile-nav-link, .mobile-menu-list .mobile-subnav-link');
  const servicesDropdownToggle = document.querySelector('.nav-dropdown .dropdown-toggle');
  const mobileServicesAccordionToggle = document.getElementById('mobile-services-toggle');
  const mobileServicesAccordion = document.getElementById('mobile-nav-accordion');

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  function isServicesSubpage() {
    return (
      currentPath.includes('/services') ||
      currentPath.includes('/courses') ||
      currentPath.includes('/software-development') ||
      currentPath.includes('/placement-training')
    );
  }

  // Helper to activate a desktop nav item by identifier ('home', 'about', 'services', 'contact')
  function setActiveNav(navKey) {
    // Desktop links
    navLinks.forEach(link => {
      const key = link.getAttribute('data-nav');
      if (key === navKey) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Mobile links
    drawerLinks.forEach(link => {
      const key = link.getAttribute('data-nav');
      if (key === navKey) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else if (!link.hasAttribute('data-subnav')) {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    if (navKey === 'services') {
      if (servicesDropdownToggle) servicesDropdownToggle.classList.add('active');
      if (mobileServicesAccordionToggle) mobileServicesAccordionToggle.classList.add('active');
    } else {
      if (servicesDropdownToggle && !isServicesSubpage()) servicesDropdownToggle.classList.remove('active');
      if (mobileServicesAccordionToggle && !isServicesSubpage()) mobileServicesAccordionToggle.classList.remove('active');
    }
  }

  // 1. Initial Highlight Based on URL Path
  function initNavHighlightByPath() {
    if (currentPath === '/' || currentPath === '') {
      setActiveNav('home');
    } else if (currentPath.startsWith('/about')) {
      setActiveNav('about');
    } else if (currentPath.startsWith('/contact')) {
      setActiveNav('contact');
    } else if (isServicesSubpage()) {
      setActiveNav('services');
      
      // Highlight matching dropdown item
      dropdownItems.forEach(item => {
        const itemHref = item.getAttribute('href') || '';
        if (itemHref && window.location.pathname.startsWith(itemHref.replace(/\/$/, ''))) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Highlight matching mobile subnav link
      document.querySelectorAll('.mobile-subnav-link').forEach(item => {
        const itemHref = item.getAttribute('href') || '';
        if (itemHref && window.location.pathname.startsWith(itemHref.replace(/\/$/, ''))) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      if (mobileServicesAccordion) {
        mobileServicesAccordion.classList.add('open');
      }
    }
  }

  initNavHighlightByPath();

  // 2. Scroll Spy Engine for In-Page Sections
  // On Home Page (Index): Sections '#hero', '#about', '#services', '#cta'
  const isHomePage = currentPath === '/' || currentPath === '' || window.location.pathname === '/';
  
  // Guarantee manual scroll restoration so browsers do not restore scroll into #about
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Ensure default landing on root page '/' always starts at the top (Home section)
  if (isHomePage && (!window.location.hash || window.location.hash === '#' || window.location.hash === '#hero' || window.location.hash === '#home')) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  // Handle Home link clicks when already on home page
  document.querySelectorAll('a[data-nav="home"]').forEach(homeBtn => {
    homeBtn.addEventListener('click', (e) => {
      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setActiveNav('home');
        if (window.location.hash) {
          history.pushState(null, null, window.location.pathname);
        }
      }
    });
  });

  if (isHomePage) {
    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    const servicesSection = document.getElementById('services');
    const ctaSection = document.getElementById('cta');

    const trackedSections = [
      { id: 'hero', navKey: 'home', el: heroSection },
      { id: 'about', navKey: 'about', el: aboutSection },
      { id: 'services', navKey: 'services', el: servicesSection },
      { id: 'cta', navKey: 'contact', el: ctaSection }
    ].filter(item => item.el !== null);

    let scrollTimeout = null;
    function updateHomeScrollSpy() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const navbarHeight = 85;

      // If near top, home is active
      if (scrollY < 200) {
        setActiveNav('home');
        return;
      }

      // Check sections from bottom to top
      let currentSectionKey = 'home';
      for (let i = trackedSections.length - 1; i >= 0; i--) {
        const section = trackedSections[i];
        const offsetTop = section.el.offsetTop - navbarHeight - 120;
        if (scrollY >= offsetTop) {
          currentSectionKey = section.navKey;
          break;
        }
      }

      setActiveNav(currentSectionKey);
    }

    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          updateHomeScrollSpy();
          scrollTimeout = null;
        }, 30);
      }
    }, { passive: true });
  }

  // 3. In-page Section Anchor Pills Highlighting (e.g., on services.html)
  const sectionPills = document.querySelectorAll('.section-nav-pill');
  if (sectionPills.length > 0) {
    const pillSections = [];
    sectionPills.forEach(pill => {
      const targetId = pill.getAttribute('href')?.replace('#', '');
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        pillSections.push({ pill, el: targetEl });
      }
    });

    let pillScrollTimeout = null;
    function updatePillsScrollSpy() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const navbarHeight = 90;

      let activePill = null;
      for (let i = pillSections.length - 1; i >= 0; i--) {
        const item = pillSections[i];
        if (scrollY >= item.el.offsetTop - navbarHeight - 100) {
          activePill = item.pill;
          break;
        }
      }

      sectionPills.forEach(p => p.classList.remove('active'));
      if (activePill) {
        activePill.classList.add('active');
      }
    }

    window.addEventListener('scroll', () => {
      if (!pillScrollTimeout) {
        pillScrollTimeout = setTimeout(() => {
          updatePillsScrollSpy();
          pillScrollTimeout = null;
        }, 30);
      }
    }, { passive: true });

    updatePillsScrollSpy();
  }

  // 4. Smooth Anchor Link Navigation with Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const navOffset = 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
});

