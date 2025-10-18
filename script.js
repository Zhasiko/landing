// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScroll();
    initCounterAnimations();
    initFormHandling();
    initTooltips();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Toggle mobile menu
            navMenu.classList.toggle('mobile-active');
            navButtons.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on menu links
        const menuLinks = document.querySelectorAll('.nav-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-active');
                navButtons.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-item, .step, .testimonial, .hero-text, .hero-visual'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on original text
        const originalText = element.textContent;
        if (originalText.includes('K')) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Form Handling
function initFormHandling() {
    // CTA Button clicks
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            if (buttonText.includes('инфлюенсер')) {
                showRegistrationModal('influencer');
            } else if (buttonText.includes('бренд')) {
                showRegistrationModal('brand');
            }
        });
    });

    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            if (buttonText.includes('сотрудничество')) {
                showRegistrationModal('general');
            } else if (buttonText.includes('демо')) {
                showDemoModal();
            }
        });
    });

    // Header buttons
    const headerButtons = document.querySelectorAll('.nav-buttons .btn');
    headerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Войти')) {
                showLoginModal();
            } else if (buttonText.includes('Регистрация')) {
                showRegistrationModal('general');
            }
        });
    });
}

// Modal Functions
function showRegistrationModal(type) {
    const modalContent = getRegistrationModalContent(type);
    showModal('Регистрация', modalContent);
}

function showLoginModal() {
    const modalContent = `
        <form class="modal-form">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-large">Войти</button>
            <p class="form-note">Нет аккаунта? <a href="#" onclick="showRegistrationModal('general')">Зарегистрироваться</a></p>
        </form>
    `;
    showModal('Вход в систему', modalContent);
}

function showDemoModal() {
    const modalContent = `
        <div class="demo-content">
            <div class="video-placeholder">
                <i class="fas fa-play-circle"></i>
                <p>Демо видео будет доступно здесь</p>
            </div>
            <p>Посмотрите, как работает наша платформа и какие возможности она предоставляет для инфлюенсеров и брендов.</p>
            <button class="btn btn-primary" onclick="closeModal()">Понятно</button>
        </div>
    `;
    showModal('Демо платформы', modalContent);
}

function getRegistrationModalContent(type) {
    const typeLabels = {
        'influencer': 'инфлюенсера',
        'brand': 'бренда',
        'general': 'пользователя'
    };

    return `
        <form class="modal-form">
            <div class="form-group">
                <label for="reg-name">Имя</label>
                <input type="text" id="reg-name" name="name" required>
            </div>
            <div class="form-group">
                <label for="reg-email">Email</label>
                <input type="email" id="reg-email" name="email" required>
            </div>
            <div class="form-group">
                <label for="reg-password">Пароль</label>
                <input type="password" id="reg-password" name="password" required>
            </div>
            ${type !== 'general' ? `
            <div class="form-group">
                <label for="reg-type">Тип аккаунта</label>
                <select id="reg-type" name="type" required>
                    <option value="${type}">${typeLabels[type]}</option>
                </select>
            </div>
            ` : `
            <div class="form-group">
                <label for="reg-type">Тип аккаунта</label>
                <select id="reg-type" name="type" required>
                    <option value="">Выберите тип</option>
                    <option value="influencer">Инфлюенсер</option>
                    <option value="brand">Бренд</option>
                </select>
            </div>
            `}
            <button type="submit" class="btn btn-primary btn-large">Зарегистрироваться</button>
            <p class="form-note">Уже есть аккаунт? <a href="#" onclick="showLoginModal()">Войти</a></p>
        </form>
    `;
}

function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.classList.add('modal-open');

    // Close modal on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Handle form submission
    const form = document.querySelector('.modal-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
    }
}

function handleFormSubmission(form) {
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        closeModal();
    }, 1500);
}

// Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Floating Cards Animation Enhancement
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
    });
}

// Initialize enhanced animations after DOM load
document.addEventListener('DOMContentLoaded', function() {
    enhanceFloatingCards();
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Navigate with arrow keys (for accessibility)
    if (e.key === 'Tab') {
        // Ensure proper tab navigation
        const modal = document.querySelector('.modal');
        if (modal) {
            const focusableElements = modal.querySelectorAll(
                'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Any additional scroll-based animations can be added here
}, 10));

// Lazy loading for better performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);