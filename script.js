document.addEventListener('DOMContentLoaded', function () {

    // ===== YEAR =====
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== MOBILE MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
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

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
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

    // ===== TYPED TEXT EFFECT =====
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
    // ===== GSAP ANIMATIONS =====
    if (typeof gsap !== 'undefined') {
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

        // Skill items stagger
        gsap.from('.skill-item', {
            scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.08
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

    // ===== PROJECT FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems  = document.querySelectorAll('.project-item');

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


    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('submitBtn');
    const formStatus  = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (err) {
                formStatus.textContent = '❌ Something went wrong. Please try emailing me directly.';
                formStatus.className = 'form-status error';
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        });
    }

});
// ===== CERTIFICATE STACK SLIDER =====
(function () {
    const stack   = document.getElementById('certStack');
    if (!stack) return;

    const cards   = Array.from(stack.querySelectorAll('.cert-card'));
    const dots    = Array.from(document.querySelectorAll('.cert-dot'));
    const counter = document.getElementById('certCounter');
    const prevBtn = document.getElementById('certPrev');
    const nextBtn = document.getElementById('certNext');
    const total   = cards.length;
    let current   = 0;
    let timer     = null;
    let isHovered = false;

    // ── Stack positions ──────────────────────────────
    const POS = [
        { y: 0,  r: 0,   o: 1,    s: 1,    z: 10 },
        { y: 14, r: 2.5, o: 0.85, s: 0.96, z: 9  },
        { y: 26, r: -2,  o: 0.70, s: 0.92, z: 8  },
        { y: 36, r: 3,   o: 0.55, s: 0.88, z: 7  },
        { y: 40, r: 0,   o: 0,    s: 0.85, z: 6  },
    ];

    // ── Render stack ─────────────────────────────────
    function render() {
        cards.forEach((card, i) => {
            const pos = (i - current + total) % total;
            const p   = POS[Math.min(pos, POS.length - 1)];
            card.style.transform     = `translateY(${p.y}px) rotate(${p.r}deg) scale(${p.s})`;
            card.style.opacity       = p.o;
            card.style.zIndex        = p.z;
            card.style.pointerEvents = pos === 0 ? 'auto' : 'none';
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        if (counter) counter.textContent = `${current + 1} / ${total}`;
    }

    // ── Navigation ───────────────────────────────────
    function goTo(index) {
        current = (index + total) % total;
        render();
    }
    function goNext() { goTo(current + 1); }
    function goPrev() { goTo(current - 1); }

    // ── Auto play ────────────────────────────────────
    function startAuto() {
        stopAuto();
        timer = setInterval(() => { if (!isHovered) goNext(); }, 4000);
    }
    function stopAuto() { clearInterval(timer); timer = null; }

    // ── Button events ────────────────────────────────
    nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); goNext(); startAuto(); });
    prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); startAuto(); });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goTo(parseInt(dot.getAttribute('data-index')));
            startAuto();
        });
    });

    // ── Swipe ────────────────────────────────────────
    let touchStartX = 0;
    stack.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    stack.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? goNext() : goPrev();
            startAuto();
        }
    }, { passive: true });

    // ── Keyboard ─────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (modal.style.display === 'flex') return;
        if (e.key === 'ArrowRight') { goNext(); startAuto(); }
        if (e.key === 'ArrowLeft')  { goPrev(); startAuto(); }
    });

    // ── Hover overlay (top card only) ────────────────
    stack.addEventListener('mouseenter', () => {
        isHovered = true;
        const topCard = cards[current];
        const overlay = topCard.querySelector('.certificate-overlay');
        if (overlay) overlay.style.opacity = '1';
    });

    stack.addEventListener('mouseleave', () => {
        isHovered = false;
        cards.forEach(card => {
            const overlay = card.querySelector('.certificate-overlay');
            if (overlay) overlay.style.opacity = '0';
        });
    });

    // ── Single click = next slide ─────────────────────
    stack.addEventListener('click', (e) => {
        // ignore clicks on overlay buttons
        if (e.target.closest('.certificate-overlay')) return;
        goNext();
        startAuto();
    });

    // Init
    render();
    startAuto();

    
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
    }

    function closeModal() {
        modal.style.display          = 'none';
        mImg.src                     = '';
        document.body.style.overflow = '';
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

    // ── Hint below stack ──────────────────────────────
    const hint = document.createElement('p');
    hint.textContent = '💡 Hover card and click "View Full" to zoom';
    hint.style.cssText = `
        text-align:center; margin-top:10px;
        color:rgba(160,160,184,0.55);
        font-size:0.76rem; font-family:'Poppins',sans-serif;
    `;
    stack.insertAdjacentElement('afterend', hint);

})();