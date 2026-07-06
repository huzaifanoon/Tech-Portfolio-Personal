/* ===================================================================
   UNIFIED DUAL-THEME PORTFOLIO — JavaScript
   Theme toggle, scroll-to-top, scroll spy, chat widget (Groq AI)
   =================================================================== */

// ===== 1. THEME INITIALIZATION & TOGGLING =====
function initTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    const html = document.documentElement;
    if (saved === 'dark') {
        html.classList.remove('light');
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
    }
}

function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
    }
}

initTheme();

document.addEventListener('DOMContentLoaded', () => {

    // ===== 2. BUTTON PRESS INTERACTIONS =====
    document.querySelectorAll('.neumorph-extruded, .primary-gradient').forEach(btn => {
        btn.addEventListener('mousedown', () => btn.classList.add('neumorph-active'));
        btn.addEventListener('mouseup', () => btn.classList.remove('neumorph-active'));
        btn.addEventListener('mouseleave', () => btn.classList.remove('neumorph-active'));
    });

    // ===== 3. SIDEBAR NAVIGATION ACTIVE STATES =====
    const navLinks = document.querySelectorAll('#sidebar .nav-links a');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const floatingMenuBtn = document.getElementById('floatingMenuBtn');
    const sidebarClose = document.getElementById('sidebarClose');

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    if (floatingMenuBtn) floatingMenuBtn.addEventListener('click', openSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => {
                l.classList.remove('nav-item-active');
                l.style.color = '';
            });
            link.classList.add('nav-item-active');
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });

    const hireButton = document.querySelector('#sidebar .primary-gradient');
    if (hireButton) {
        hireButton.addEventListener('click', () => {
            if (window.innerWidth < 768) closeSidebar();
        });
    }

    // ===== 4. SCROLL SPY =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const top = section.offsetTop - 250;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`#sidebar .nav-links a[href="#${id}"]`);
            if (scrollY > top && scrollY <= top + height && navLink) {
                navLinks.forEach(l => {
                    l.classList.remove('nav-item-active');
                    l.style.color = '';
                });
                navLink.classList.add('nav-item-active');
            }
        });
    });

    // ===== 5. SCROLL-TO-TOP BUTTON VISIBILITY =====
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== 6. CONTACT FORM → WHATSAPP =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const msg = document.getElementById('contactMessage').value.trim();
            if (!name || !email || !msg) {
                alert('Please fill in all fields.');
                return;
            }
            const phone = '923196488975';
            const text = `Hello Muhammad Huzaifa!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(msg)}`;
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }

    // ===== 7. AI CHAT WIDGET (GROQ API) =====
    const chatBtn = document.getElementById('chatBtn');
    const chatWidget = document.getElementById('chatWidget');
    const chatOverlay = document.getElementById('chatOverlay');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    const portfolioContext = `You are Huzaifa's portfolio AI assistant. Answer questions about Muhammad Huzaifa ONLY based on the following information. Be concise, friendly, and professional.

ABOUT:
- Muhammad Huzaifa is a Mobile Application Developer & Full Stack Engineer from Islamabad, Pakistan.
- BS Computer Science student at COMSATS University Islamabad (2023-2027), CGPA: 3.5 / 4.0.
- Founder of Creative Dynamic Studio (CDS), a student-led tech community in Islamabad.
- Shortlisted in the global Top 3 for a Junior Android Developer role at Appetiser Apps.

SKILLS:
- Mobile Development: Flutter, Dart, Kotlin, Jetpack Compose, Android SDK, Riverpod, MVVM / Provider.
- Web & Backend: React.js / Vite, Node.js, FastAPI, Express.js, Laravel, Tailwind CSS, HTML5/CSS3.
- AI & Databases: Groq/Gemini LLM integrations, Supabase, Firebase (FCM), PostgreSQL, MongoDB, Hive NoSQL, OpenCV, YOLOv8.
- Languages & Core: Python, Java, C++, JavaScript, DSA, OOP, Git / GitHub.

PROJECTS:
1. Zylo — Personal Life OS: Flutter, Supabase, Groq/Gemini, Hive NoSQL, 34+ screens, 4 platforms (Android, iOS, Web, Windows). FLAGSHIP project.
2. OrganicFields.pk: React 18, Vite, Supabase, Safepay, FCM. Agriculture e-commerce & booking platform.
3. Planora: Flutter, Firebase. Event platform with 4 distinct roles, ticketing, and QR code check-ins.
4. CampusConnect App: Flutter, Dart, Firebase, Provider. Student/admin university event management app.
5. Event Platform (Full Stack): React, FastAPI, PostgreSQL & Node/Express/MongoDB dual backend architectures.
6. Event Data Management: MongoDB, Node.js, Express. Scalable CRUD operations and participant queries.
7. EventSight AI Platform: Python, YOLOv8, OpenCV. AI crowd analysis, zone segmentation, safety monitoring.
8. AI Attendance System: Python, Flask, OpenCV. Facial recognition attendance.
9. SmartPoster Scanner: JS, Tesseract.js. OCR event metadata poster extraction.
10. Healthy Habits Pro: Flutter, Dart. Daily habit and wellness tracking.
11. Argus Vulnerability Scanner: Python. Security scanner detecting SQLi, XSS, blind SQLi, CVSS 3.1 scoring.

ACHIEVEMENTS & LEADERSHIP:
- Junior Android Developer global Top 3 shortlist at Appetiser Apps in May 2026 after a 5-stage selection process.
- Founder of Creative Dynamic Studio (CDS), coordinating technical teams and events including Freshers Fest 2024 and FusionX with 1,000+ attendees.
- Alkhidmat Foundation volunteer internship, Summer 2026, supporting outreach and digital coordination.

WORK EXPERIENCE:
- Junior Mobile Application Engineer Intern at DevHawks — Jul 2026-Aug 2026. Mobile app features, Riverpod, clean architecture.
- Web Development Intern at SafeX Solutions — May 2026-Jul 2026. Real-world web apps frontend/backend features.
- Back-End AI Engineering Intern at FlyRank AI — Jul 2025-Aug 2025. LLM integration, backend APIs.
- AI Intern at Software Productivity Strategist (SPS) — Jun 2025-Sep 2025. Billing automation, AI tooling.
- Full-Stack Web Developer at Nisum — Jan 2024-Jan 2026. Responsive websites, plugins, SEO.
- Digital Marketing Specialist (Freelance) — 2021-2023. Campaigns with 1M+ social media reach.

CONTACT:
- Email: huzaifanoon21@gmail.com
- Phone: +92 319 6488975
- GitHub: github.com/huzaifanoon
- LinkedIn: linkedin.com/in/muhammad-huzaifa-811772275
- Location: Islamabad, Pakistan

If someone asks something completely unrelated to Huzaifa, politely redirect them. Keep answers under 3 sentences unless more detail is requested.`;

    let chatHistory = [];

    function openChat() {
        chatWidget.classList.add('active');
        chatOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        chatInput.focus();
    }

    function closeChat() {
        chatWidget.classList.remove('active');
        chatOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (chatBtn) chatBtn.addEventListener('click', openChat);
    if (chatClose) chatClose.addEventListener('click', closeChat);
    if (chatOverlay) chatOverlay.addEventListener('click', closeChat);

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    function addTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'chat-msg bot typing';
        div.innerHTML = '<div class="dot-typing"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';
        chatInput.disabled = true;

        const typing = addTypingIndicator();

        chatHistory.push({ role: 'user', content: text });

        try {
            const messages = [
                { role: 'system', content: portfolioContext },
                ...chatHistory.slice(-8)
            ];

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: messages
                })
            });

            typing.remove();

            if (!res.ok) {
                addMessage('The AI assistant backend is not available right now. Run this portfolio with `node dev.mjs` so `/api/chat` is active.', 'bot');
                chatHistory.pop();
            } else {
                const data = await res.json();
                const reply = data.choices?.[0]?.message?.content || 'I couldn\'t process that. Try asking about Huzaifa\'s skills, projects, or experience!';
                chatHistory.push({ role: 'assistant', content: reply });
                addMessage(reply, 'bot');
            }
        } catch (err) {
            typing.remove();
            addMessage('Connection error. Please run the portfolio with `node dev.mjs` instead of a static server so the AI chat endpoint is available.', 'bot');
            chatHistory.pop();
        }

        chatInput.disabled = false;
        chatInput.focus();
    }

    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // ===== 8. PROJECT CATEGORY FILTERING =====
    const filterBtns = document.querySelectorAll('#projectFilters .filter-btn');
    const projectCards = document.querySelectorAll('#projects .project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active buttons' neumorphic style
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'neumorph-inset');
                    b.classList.add('neumorph-extruded');
                });
                btn.classList.remove('neumorph-extruded');
                btn.classList.add('active', 'neumorph-inset');

                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
