document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================================
     1. THEME SWITCHER
     ========================================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;
  
  // Check local storage or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = htmlElement.getAttribute("data-theme");
      let newTheme = theme === "dark" ? "light" : "dark";
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "dark") {
      themeIcon.classList.remove("bi-moon-fill");
      themeIcon.classList.add("bi-sun-fill");
    } else {
      themeIcon.classList.remove("bi-sun-fill");
      themeIcon.classList.add("bi-moon-fill");
    }
  }

  /* ==========================================================================
     2. MULTI-LANGUAGE (i18n)
     ========================================================================== */
  const langToggle = document.getElementById("lang-toggle");
  let currentLang = localStorage.getItem("lang") || "en";
  applyLanguage(currentLang);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "id" : "en";
      localStorage.setItem("lang", currentLang);
      applyLanguage(currentLang);
    });
  }

  function applyLanguage(lang) {
    if (langToggle) {
      langToggle.textContent = lang === "en" ? "ID" : "EN";
    }
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (key.endsWith('.ph')) {
                el.placeholder = translations[lang][key];
            } else {
                el.value = translations[lang][key];
            }
        } else {
            el.innerHTML = translations[lang][key];
        }
      }
    });
  }

  /* ==========================================================================
     3. NAVBAR SCROLL EFFECT
     ========================================================================== */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ==========================================================================
     4. SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-blur');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     5. CONTACT FORM (EmailJS Integration Setup)
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById("submit-btn");
      const originalBtnText = submitBtn.innerHTML;
      
      // Update UI to loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = (translations[currentLang] && translations[currentLang]["contact.form.sending"]) ? translations[currentLang]["contact.form.sending"] : "Sending...";
      submitBtn.innerHTML += ' <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true" style="display:inline-block"></span>';
      
      // EMAILJS INTEGRATION (Simulated for this implementation)
      // To activate EmailJS, uncomment and configure the code below:
      /*
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            showFormStatus('success');
            contactForm.reset();
        }, (error) => {
            showFormStatus('error');
            console.log('FAILED...', error);
        }).finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
      */

      // Simulated Delay for demo purposes
      setTimeout(() => {
        // Simulate Success
        showFormStatus('success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
      }, 2000);

    });

    function showFormStatus(type) {
      formStatus.style.display = 'block';
      formStatus.className = ''; // reset classes
      
      if (type === 'success') {
        formStatus.classList.add('status-success');
        formStatus.innerHTML = (translations[currentLang] && translations[currentLang]["contact.form.success"]) 
            ? `<i class="bi bi-check-circle-fill me-2"></i>${translations[currentLang]["contact.form.success"]}`
            : '<i class="bi bi-check-circle-fill me-2"></i>Message sent successfully!';
      } else {
        formStatus.classList.add('status-error');
        formStatus.innerHTML = (translations[currentLang] && translations[currentLang]["contact.form.error"]) 
            ? `<i class="bi bi-exclamation-triangle-fill me-2"></i>${translations[currentLang]["contact.form.error"]}`
            : '<i class="bi bi-exclamation-triangle-fill me-2"></i>Failed to send the message. Please try again.';
      }
    }
  }

});
