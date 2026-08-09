document.addEventListener('DOMContentLoaded', function () {

    //  YEAR 
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    //  VISITOR COUNT 
    const visitorCountEl = document.getElementById('visitorCount');
    if (visitorCountEl) {
        fetch('https://subashdahal.goatcounter.com/counter/TOTAL.json')
            .then(res => res.json())
            .then(data => { visitorCountEl.textContent = data.count; })
            .catch(() => { visitorCountEl.textContent = '—'; });
    }

    //  TYPED.JS HERO ROLE
    let typedInstance = null;
    function initTyped(lang) {
        const el = document.getElementById('typedRole');
        if (!el || typeof Typed === 'undefined' || typeof translations === 'undefined') return;
        const dict = translations[lang] || translations.en;
        const strings = dict.hero_roles || translations.en.hero_roles;
        if (typedInstance) typedInstance.destroy();
        typedInstance = new Typed('#typedRole', {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            startDelay: 400,
            loop: true,
            smartBackspace: true
        });
    }

    //  LANGUAGE SWITCHER 
    if (typeof translations !== 'undefined') {
        const langToggle  = document.getElementById('langToggle');
        const langMenu    = document.getElementById('langMenu');
        const langCurrent = document.getElementById('langCurrent');

        function applyLanguage(lang) {
            const dict = translations[lang] || translations.en;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key] !== undefined) el.innerHTML = dict[key];
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
            });

            document.documentElement.setAttribute('lang', lang);
            if (langCurrent) langCurrent.textContent = lang.toUpperCase();
            localStorage.setItem('lang', lang);
            initTyped(lang);
        }

        if (langToggle && langMenu) {
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = langMenu.classList.toggle('open');
                langToggle.setAttribute('aria-expanded', isOpen);
            });

            langMenu.querySelectorAll('li[data-lang]').forEach(item => {
                item.addEventListener('click', () => {
                    applyLanguage(item.getAttribute('data-lang'));
                    langMenu.classList.remove('open');
                    langToggle.setAttribute('aria-expanded', 'false');
                });
            });

            document.addEventListener('click', (e) => {
                if (!langMenu.contains(e.target) && e.target !== langToggle) {
                    langMenu.classList.remove('open');
                    langToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        const savedLang = localStorage.getItem('lang');
        if (savedLang && translations[savedLang]) applyLanguage(savedLang);
        else initTyped('en');
    }

    // ===== MOBILE MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });

    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    //  THEME TOGGLE 
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    //  BACK TO TOP 
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    //  HEADER SCROLL EFFECT 
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ACTIVE NAV LINK ON SCROLL 
    const sections   = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links ul li a');

    function setActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const match = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    //  TYPED TEXT EFFECT 
const words  = ['PHP & MySQL.', 'Python.', 'JavaScript.', 'HTML & CSS.', 'UI/UX Design.'];
const target = document.querySelector('.typed-text');
let wi = 0, ci = 0, deleting = false;

function type() {
    if (!target) return;
    const word = words[wi];

    if (!deleting) {
        ci++;
        target.textContent = word.slice(0, ci);
    } else {
        ci--;
        target.textContent = word.slice(0, ci);
    }

    let delay = deleting ? 60 : 110;

    if (!deleting && ci === word.length) {
        delay = 1800;
        deleting = true;
    } else if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        delay = 400;
    }

    setTimeout(type, delay);
}

// Small delay to ensure DOM is painted before starting
setTimeout(type, 500);
    //  GSAP ANIMATIONS 
    if (typeof gsap !== 'undefined') {
      try {
        gsap.registerPlugin(ScrollTrigger);

        // Hero
        gsap.from('.hero-tag',         { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' });
        gsap.from('.hero h1',          { duration: 0.9, y: 40, opacity: 0, ease: 'power3.out', delay: 0.15 });
        gsap.from('.hero h2',          { duration: 0.9, y: 40, opacity: 0, ease: 'power3.out', delay: 0.3 });
        gsap.from('.animated-paragraph', { duration: 0.9, y: 30, opacity: 0, ease: 'power3.out', delay: 0.45 });
        gsap.from('.hero-btns',        { duration: 0.9, y: 30, opacity: 0, ease: 'power3.out', delay: 0.6 });
        gsap.from('.hero-socials',     { duration: 0.9, y: 20, opacity: 0, ease: 'power3.out', delay: 0.75 });
        gsap.from('.profile-img',      { duration: 1.4, scale: 0.7, opacity: 0, ease: 'back.out(1.7)', delay: 0.3 });
        gsap.from('.circle-animation', { duration: 1.4, scale: 0.5, opacity: 0, ease: 'power3.out', delay: 0.6 });

        // Section titles
        gsap.utils.toArray('.section-title').forEach(el => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                y: 40, opacity: 0, duration: 0.8
            });
        });

        // About
        gsap.from('.about-img', {
            scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
            x: -60, opacity: 0, duration: 0.9
        });
        gsap.from('.about-text', {
            scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
            x: 60, opacity: 0, duration: 0.9
        });

        // Timeline items stagger
        gsap.from('.timeline-item', {
            scrollTrigger: { trigger: '.timeline', start: 'top 85%' },
            x: -30, opacity: 0, duration: 0.6, stagger: 0.15
        });


        // Project items stagger
        gsap.from('.project-item', {
            scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
            y: 50, opacity: 0, duration: 0.6, stagger: 0.1
        });

        // Contact sections
        gsap.from('.contact-info', {
            scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
            x: -50, opacity: 0, duration: 0.8
        });
        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
            x: 50, opacity: 0, duration: 0.8
        });

        
        window.addEventListener('load', () => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 1000);
      } catch (err) {
        console.error('GSAP animation setup failed:', err);
        // Make sure content is never left invisible if GSAP/ScrollTrigger breaks
        document.querySelectorAll(
            '.hero-tag, .hero h1, .hero h2, .animated-paragraph, .hero-btns, .hero-socials, ' +
            '.profile-img, .circle-animation, .section-title, .about-img, .about-text, ' +
            '.timeline-item, .project-item, .contact-info, .contact-form'
        ).forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
      }
    }

    // ===== SKILL BARS — animate when visible =====
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(el => skillObserver.observe(el));

    // ===== SKILL ITEMS REVEAL — animate when visible =====
    const skillItems = document.querySelectorAll('.skill-item');

    const skillItemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                skillItemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    skillItems.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 8) * 0.06}s`;
        skillItemObserver.observe(el);
    });

    // ===== PROJECT FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems  = document.querySelectorAll('.project-item');

    // 3D tilt effect on hover
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.project-item'), {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.15,
            scale: 1.02
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach((item, i) => {
                const match = filterValue === 'all' || item.getAttribute('data-category') === filterValue;

                if (match) {
                    item.style.display = 'block';
                    // Small stagger fade-in
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * 60);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }); 


    // CONTACT FORM 
    const contactForm = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('submitBtn');
    const formStatus  = document.getElementById('form-status');

    function notify(message, type) {
        // Screen readers: update the accessible (visually hidden) live region
        if (formStatus) formStatus.textContent = message;

        // Sighted users: show a toast
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: message,
                duration: 4500,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: type === 'success'
                        ? 'linear-gradient(135deg, #00c853, #00ff6a)'
                        : 'linear-gradient(135deg, #e74c3c, #ff6b5b)',
                    color: '#0a0a0a',
                    fontWeight: '600',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
                }
            }).showToast();
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

           
            const honeypot = contactForm.querySelector('[name="botcheck"]');
            if (honeypot && honeypot.checked) {
                notify('✅ Message sent! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    notify('✅ Message sent! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                notify('❌ Something went wrong. Please try emailing me directly.', 'error');
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        });
    }

});
//  CERTIFICATE SLIDER (vanilla JS  no external library) 
(function () {
    const viewport = document.getElementById('certSwiper');
    const track    = viewport?.querySelector('.swiper-wrapper');
    if (!viewport || !track) return;

    const cards      = Array.from(track.querySelectorAll('.cert-card'));
    const counter    = document.getElementById('certCounter');
    const dotsHolder = document.getElementById('certPagination');
    const total      = cards.length;
    let current      = 0;
    let timer        = null;
    let isHovered     = false;

    //  Build dot indicators dynamically 
    let dots = [];
    if (dotsHolder && total > 0) {
        dotsHolder.innerHTML = '';
        dots = cards.map((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'cert-dot';
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to certificate ${i + 1}`);
            dot.addEventListener('click', () => { goTo(i); restartAuto(); });
            dotsHolder.appendChild(dot);
            return dot;
        });
    }

    //  Render 
    function render() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        if (counter) counter.textContent = `${current + 1} / ${total}`;
    }

    function goTo(index) {
        current = (index + total) % total;
        render();
    }
    function goNext() { goTo(current + 1); }
    function goPrev() { goTo(current - 1); }

    // Autoplay 
    function startAuto() {
        stopAuto();
        timer = setInterval(() => { if (!isHovered) goNext(); }, 4000);
    }
    function stopAuto() { clearInterval(timer); timer = null; }
    function restartAuto() { startAuto(); }

    viewport.addEventListener('mouseenter', () => { isHovered = true; });
    viewport.addEventListener('mouseleave', () => { isHovered = false; });

    // Buttons 
    document.getElementById('certPrev')?.addEventListener('click', () => { goPrev(); restartAuto(); });
    document.getElementById('certNext')?.addEventListener('click', () => { goNext(); restartAuto(); });

    //  Keyboard 
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') return;
        if (e.key === 'ArrowRight') { goNext(); restartAuto(); }
        if (e.key === 'ArrowLeft')  { goPrev(); restartAuto(); }
    });

    //  Touch / drag swipe 
    let startX = 0;
    let isDragging = false;

    viewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? goNext() : goPrev();
            restartAuto();
        }
    }, { passive: true });

    // Mouse drag (desktop)
    viewport.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        viewport.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        viewport.style.cursor = 'grab';
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? goNext() : goPrev();
            restartAuto();
        }
    });

    // Init
    render();
    startAuto();

    // Fullscreen zoom modal 
    const modal = document.createElement('div');
    modal.style.cssText = `
        display:none; position:fixed; inset:0;
        background:rgba(0,0,0,0.94);
        z-index:999999;
        align-items:center; justify-content:center;
        padding:20px;
    `;

    const mImg = document.createElement('img');
    mImg.style.cssText = `
        max-width:95vw; max-height:90vh;
        object-fit:contain; border-radius:10px;
        box-shadow:0 0 80px rgba(0,0,0,0.9);
        display:block;
    `;

    const mClose = document.createElement('button');
    mClose.innerHTML = '✕';
    mClose.style.cssText = `
        position:fixed; top:16px; right:20px;
        width:44px; height:44px; border-radius:50%;
        border:2px solid rgba(255,255,255,0.4);
        background:rgba(255,255,255,0.1);
        color:#fff; font-size:1.2rem; cursor:pointer;
        display:flex; align-items:center; justify-content:center;
        z-index:1000000; transition:background 0.2s;
    `;
    mClose.onmouseenter = () => mClose.style.background = '#00ff6a';
    mClose.onmouseleave = () => mClose.style.background = 'rgba(255,255,255,0.1)';

    modal.appendChild(mImg);
    modal.appendChild(mClose);
    document.body.appendChild(modal);

    function openModal(src, alt) {
        mImg.src              = src;
        mImg.alt              = alt || 'Certificate';
        modal.style.display   = 'flex';
        document.body.style.overflow = 'hidden';
        stopAuto();
    }

    function closeModal() {
        modal.style.display          = 'none';
        mImg.src                     = '';
        document.body.style.overflow = '';
        startAuto();
    }

    mClose.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
    modal.addEventListener('click',  (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // ── Add "View" button inside each overlay ────────
    cards.forEach((card) => {
        const overlay = card.querySelector('.certificate-overlay');
        const img     = card.querySelector('img');
        if (!overlay || !img) return;

        const viewBtn = document.createElement('a');
        viewBtn.innerHTML = '<i class="fas fa-expand"></i> View Full';
        viewBtn.style.cssText = `
            display:inline-flex; align-items:center; gap:7px;
            margin-top:14px; padding:8px 22px;
            background:#00ff6a; color:#000;
            border-radius:30px; font-size:0.82rem;
            font-weight:700; font-family:'Poppins',sans-serif;
            cursor:pointer; text-decoration:none;
            transition:transform 0.2s, background 0.2s;
        `;
        viewBtn.onmouseenter = () => viewBtn.style.transform = 'scale(1.06)';
        viewBtn.onmouseleave = () => viewBtn.style.transform = 'scale(1)';

        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openModal(img.src, img.alt);
        });

        overlay.appendChild(viewBtn);
    });

    //  Hint below the slider
    const hint = document.createElement('p');
    hint.textContent = '💡 Swipe, drag, or click "View Full" to zoom';
    hint.style.cssText = `
        text-align:center; margin-top:10px;
        color:rgba(160,160,184,0.55);
        font-size:0.76rem; font-family:'Poppins',sans-serif;
    `;
    document.querySelector('.slider-controls')?.insertAdjacentElement('afterend', hint);

})();