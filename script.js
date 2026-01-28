// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    initParticles();
    init3DEffects();
    initFormInteractions();
    initAnimations();
    initTerminal();
    initNotifications();
    initAudio();
    initQuantumEffects();
});

// ===== PARTICLE SYSTEM =====
function initParticles() {
    particlesJS('particleCanvas', {
        particles: {
            number: { value: 150, density: { enable: true, value_area: 800 } },
            color: { value: ["#00ffff", "#ff00ff", "#ffff00", "#00ffaa"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00ffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
}

// ===== 3D EFFECTS =====
function init3DEffects() {
    // Create floating 3D objects
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    // Create geometric objects
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    
    const objects = [];
    for (let i = 0; i < 5; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 100;
        mesh.position.y = (Math.random() - 0.5) * 100;
        mesh.position.z = (Math.random() - 0.5) * 100;
        mesh.scale.setScalar(0.5 + Math.random() * 1.5);
        scene.add(mesh);
        objects.push(mesh);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 50;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        objects.forEach((obj, i) => {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.01;
            obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.1;
        });
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== QUANTUM EFFECTS =====
function initQuantumEffects() {
    // Quantum entanglement animation
    const quantumParticles = document.querySelectorAll('.quantum-particle .particle');
    quantumParticles.forEach(particle => {
        particle.style.animation = `quantumFloat ${2 + Math.random() * 2}s infinite ease-in-out`;
    });
    
    // Blockchain animation
    const blocks = document.querySelectorAll('.blockchain-visual .block');
    blocks.forEach((block, i) => {
        block.style.animationDelay = `${i * 0.5}s`;
    });
    
    // Neural network animation
    const neurons = document.querySelectorAll('.ai-network .neuron');
    neurons.forEach((neuron, i) => {
        neuron.style.animationDelay = `${i * 0.3}s`;
    });
}

// ===== FORM INTERACTIONS =====
function initFormInteractions() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const formContainers = document.querySelectorAll('.form-container');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            formContainers.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabId}Form`) {
                    form.classList.add('active');
                    animateFormEntrance(form);
                }
            });
            
            playSound('hover');
        });
    });
    
    // Password toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.input-field').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
            
            playSound('click');
        });
    });
    
    // Password strength meter
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            updatePasswordStrength(this);
            checkPasswordMatch();
        });
    });
    
    // Username availability
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', debounce(checkUsernameAvailability, 500));
    }
    
    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
    
    // Multi-step form navigation
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = this.dataset.step;
            goToStep(nextStep);
        });
    });
    
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = this.dataset.step;
            goToStep(prevStep);
        });
    });
    
    // Complete activation
    const completeBtn = document.getElementById('completeActivation');
    if (completeBtn) {
        completeBtn.addEventListener('click', completeActivation);
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Random glitch effects
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            if (Math.random() > 0.7) {
                el.classList.add('glitching');
                setTimeout(() => el.classList.remove('glitching'), 100);
            }
        });
    }, 3000);
    
    // Pulse animations
    const pulseElements = document.querySelectorAll('.icon-pulse, .orb');
    pulseElements.forEach(el => {
        el.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // Hover animations
    const cyberButtons = document.querySelectorAll('.cyber-button');
    cyberButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('hover');
            playSound('hover');
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('hover');
        });
        
        btn.addEventListener('click', () => {
            playSound('click');
            btn.classList.add('click');
            setTimeout(() => btn.classList.remove('click'), 300);
        });
    });
}

// ===== FORM FUNCTIONS =====
function updatePasswordStrength(input) {
    const password = input.value;
    const meter = input.closest('.password-section')?.querySelector('.strength-meter');
    if (!meter) return;
    
    let strength = 0;
    const requirements = [
        password.length >= 12,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password)
    ];
    
    strength = requirements.filter(Boolean).length;
    
    // Update meter
    const bars = meter.querySelectorAll('.meter-bars .bar');
    const value = meter.querySelector('.strength-value');
    const requirementsList = meter.querySelectorAll('.strength-requirements .requirement');
    
    bars.forEach((bar, i) => {
        bar.classList.remove('active');
        if (i < strength) {
            bar.classList.add('active');
        }
    });
    
    const strengthText = ['CRITICAL', 'WEAK', 'FAIR', 'GOOD', 'STRONG', 'QUANTUM'];
    value.textContent = strengthText[strength];
    value.className = `strength-value ${strengthText[strength].toLowerCase()}`;
    
    requirementsList.forEach((req, i) => {
        const icon = req.querySelector('i');
        icon.className = requirements[i] ? 'fas fa-check' : 'fas fa-times';
    });
}

function checkPasswordMatch() {
    const password = document.getElementById('regPassword')?.value;
    const confirm = document.getElementById('confirmPassword')?.value;
    const matchStatus = document.querySelector('.match-status');
    
    if (!matchStatus || !password || !confirm) return;
    
    if (password === confirm && password.length > 0) {
        matchStatus.classList.add('match');
        matchStatus.classList.remove('mismatch');
    } else if (confirm.length > 0) {
        matchStatus.classList.add('mismatch');
        matchStatus.classList.remove('match');
    } else {
        matchStatus.classList.remove('match', 'mismatch');
    }
}

function checkUsernameAvailability() {
    const input = document.getElementById('username');
    const status = input?.closest('.input-field')?.querySelector('.availability-check');
    if (!input || !status) return;
    
    const username = input.value.trim();
    if (username.length < 3) {
        status.classList.remove('checking', 'available', 'taken');
        return;
    }
    
    status.classList.add('checking');
    
    // Simulate API call
    setTimeout(() => {
        const isAvailable = Math.random() > 0.3; // 70% chance available
        status.classList.remove('checking');
        status.classList.add(isAvailable ? 'available' : 'taken');
        
        if (!isAvailable) {
            showNotification('Username already taken. Try adding numbers or symbols.', 'warning');
        }
    }, 500);
}

// ===== FORM NAVIGATION =====
function goToStep(stepNumber) {
    // Update progress tracker
    const steps = document.querySelectorAll('.progress-steps .step');
    const progressFill = document.querySelector('.progress-fill');
    
    steps.forEach((step, i) => {
        if (i < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    progressFill.style.width = `${((stepNumber - 1) / (steps.length - 1)) * 100}%`;
    
    // Switch form step
    const currentStep = document.querySelector('.form-container.active');
    const nextStep = document.getElementById(`step${stepNumber}`);
    
    if (currentStep && nextStep) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        animateFormEntrance(nextStep);
        
        playSound('click');
    }
}

// ===== FORM SUBMISSION =====
function handleFormSubmission(form) {
    // Validate form
    if (!validateForm(form)) {
        showNotification('Please fill all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.cyber-button');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.button-text').textContent = 'PROCESSING...';
    }
    
    // Simulate API call
    setTimeout(() => {
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.button-text').textContent = 'ACCESS GRANTED';
        }
        
        showSuccessModal();
        playSound('success');
        
        // Redirect after delay
        setTimeout(() => {
            if (window.location.pathname.includes('signup.html')) {
                window.location.href = 'index.html';
            } else {
                // In real app, redirect to dashboard
                showNotification('Welcome back, User. Redirecting to dashboard...', 'success');
            }
        }, 2000);
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add error animation
            input.style.animation = 'shake 0.5s';
            setTimeout(() => input.style.animation = '', 500);
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                showNotification('Please enter a valid email address.', 'error');
            }
        }
        
        // Password validation
        if (input.type === 'password' && input.value) {
            if (input.value.length < 8) {
                isValid = false;
                input.classList.add('error');
                showNotification('Password must be at least 8 characters.', 'error');
            }
        }
    });
    
    return isValid;
}

// ===== ACTIVATION =====
function completeActivation() {
    const activationBtn = document.getElementById('completeActivation');
    const activationModal = document.querySelector('.activation-modal');
    const progressBar = document.querySelector('.status-progress');
    
    if (!activationBtn || !activationModal) return;
    
    // Start activation sequence
    activationBtn.classList.add('loading');
    activationBtn.disabled = true;
    
    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Show success animation
            const activationRing = document.querySelector('.activation-ring');
            activationRing.classList.add('complete');
            
            // Show modal after delay
            setTimeout(() => {
                activationModal.classList.add('active');
                playSound('success');
                
                // Confetti effect
                createConfetti();
            }, 1000);
        }
    }, 50);
}

// ===== TERMINAL =====
function initTerminal() {
    const terminalModal = document.querySelector('.terminal-modal');
    const closeBtn = terminalModal?.querySelector('.term-btn.close');
    const commandInput = terminalModal?.querySelector('.command-input');
    
    // Toggle terminal with Ctrl+`
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            terminalModal.style.display = terminalModal.style.display === 'block' ? 'none' : 'block';
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            terminalModal.style.display = 'none';
        });
    }
    
    if (commandInput) {
        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = commandInput.value.trim();
                processCommand(command);
                commandInput.value = '';
            }
        });
    }
}

function processCommand(command) {
    const output = document.getElementById('terminalOutput');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    let response = '> ';
    
    switch(command.toLowerCase()) {
        case 'help':
            response += 'Available commands: help, clear, status, scan, encrypt';
            break;
        case 'clear':
            output.innerHTML = '';
            return;
        case 'status':
            response += 'System Status: ONLINE | Security: QUANTUM-9 | Users: 47,892';
            break;
        case 'scan':
            response += 'Initiating quantum scan... Threat level: NEGLIGIBLE';
            break;
        case 'encrypt':
            response += 'Encrypting with 256-bit quantum algorithm... DONE';
            break;
        default:
            response += `Command not recognized: ${command}`;
    }
    
    logEntry.textContent = response;
    output.appendChild(logEntry);
    output.scrollTop = output.scrollHeight;
}

// ===== NOTIFICATIONS =====
function initNotifications() {
    // Global notification function
    window.showNotification = function(message, type = 'info') {
        const container = document.querySelector('.notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };
}

// ===== AUDIO =====
function initAudio() {
    // Preload sounds
    const sounds = {
        hover: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'),
        click: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-plastic-bubble-click-1124.mp3'),
        success: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3')
    };
    
    // Global sound function
    window.playSound = function(soundName) {
        if (sounds[soundName]) {
            sounds[soundName].currentTime = 0;
            sounds[soundName].play().catch(() => {
                // Audio playback failed (user might have blocked audio)
            });
        }
    };
}

// ===== ANIMATION HELPERS =====
function animateFormEntrance(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'slideUp 0.5s ease-out';
    }, 10);
}

function createConfetti() {
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ffaa'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            opacity: ${0.5 + Math.random() * 0.5};
            transform: rotate(${Math.random() * 360}deg);
            z-index: 10000;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate
        const animation = confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// ===== UTILITIES =====
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

// Add additional CSS for new animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Additional animations */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes quantumFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.1); }
    }
    
    @keyframes slideOutRight {
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .glitching {
        animation: glitchText 0.1s 3;
    }
    
    .confetti {
        border-radius: 50%;
    }
    
    /* Progress tracker */
    .progress-tracker {
        width: 100%;
        max-width: 600px;
        margin: 30px auto;
    }
    
    .progress-steps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    
    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        opacity: 0.3;
        transition: all 0.3s ease;
    }
    
    .step.active {
        opacity: 1;
    }
    
    .step-number {
        font-family: 'Orbitron', sans-serif;
        font-size: 12px;
        color: #00ffff;
        background: rgba(0, 255, 255, 0.1);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(0, 255, 255, 0.3);
    }
    
    .step-label {
        font-size: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }
    
    .progress-bar {
        height: 2px;
        background: rgba(0, 255, 255, 0.1);
        border-radius: 1px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #00ffff, #ff00ff);
        width: 0%;
        transition: width 0.5s ease;
    }
    
    /* Activation modal */
    .activation-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s ease;
    }
    
    .activation-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: rgba(10, 15, 30, 0.95);
        border: 2px solid rgba(0, 255, 255, 0.3);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 500px;
        transform: scale(0.9);
        transition: transform 0.5s ease;
    }
    
    .activation-modal.active .modal-content {
        transform: scale(1);
    }
    
    .success-animation {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto 30px;
    }
    
    .success-check {
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
        z-index: 2;
        position: relative;
    }
    
    .success-rings .ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid #00ffff;
        border-radius: 50%;
        opacity: 0;
        animation: ringExpand 1s ease-out forwards;
    }
    
    .success-rings .ring:nth-child(1) {
        width: 120px;
        height: 120px;
        animation-delay: 0.2s;
    }
    
    .success-rings .ring:nth-child(2) {
        width: 140px;
        height: 140px;
        animation-delay: 0.4s;
    }
    
    .success-rings .ring:nth-child(3) {
        width: 160px;
        height: 160px;
        animation-delay: 0.6s;
    }
    
    @keyframes ringExpand {
        to {
            opacity: 0.5;
            width: calc(var(--size) + 100px);
            height: calc(var(--size) + 100px);
        }
    }
`;
document.head.appendChild(additionalStyles);
