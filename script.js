// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Common elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const serverTimeElement = document.getElementById('serverTime');
    const twoFactorModal = document.getElementById('twoFactorModal');
    const successModal = document.getElementById('successModal');
    
    // Initialize
    initRealTimeClock();
    setupPasswordToggle();
    setupFormValidation();
    setupOTPInputs();
    setupSocialButtons();
    
    // Login Form Specific
    if (loginForm) {
        setupLoginForm();
    }
    
    // Signup Form Specific
    if (signupForm) {
        setupSignupForm();
    }
});

// Real-time Clock
function initRealTimeClock() {
    const serverTimeElement = document.getElementById('serverTime');
    if (serverTimeElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            serverTimeElement.textContent = timeString;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
}

// Password Toggle Visibility
function setupPasswordToggle() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
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
        });
    });
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Calculate strength (0-100)
    const requirementCount = Object.keys(requirements).length;
    const metCount = Object.values(requirements).filter(Boolean).length;
    strength = Math.round((metCount / requirementCount) * 100);
    
    return { strength, requirements };
}

function updatePasswordStrength(password, strengthElement, textElement) {
    const { strength, requirements } = checkPasswordStrength(password);
    
    // Update strength bar
    strengthElement.style.width = `${strength}%`;
    
    // Update color based on strength
    if (strength < 40) {
        strengthElement.style.background = '#ef4444';
        textElement.textContent = 'Weak';
        textElement.style.color = '#ef4444';
    } else if (strength < 70) {
        strengthElement.style.background = '#f59e0b';
        textElement.textContent = 'Moderate';
        textElement.style.color = '#f59e0b';
    } else if (strength < 90) {
        strengthElement.style.background = '#3b82f6';
        textElement.textContent = 'Strong';
        textElement.style.color = '#3b82f6';
    } else {
        strengthElement.style.background = '#10b981';
        strengthElement.style.backgroundImage = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
        textElement.textContent = 'Very Strong';
        textElement.style.color = '#10b981';
    }
    
    return requirements;
}

// Form Validation
function setupFormValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('input', function() {
            const email = this.value;
            const feedback = this.closest('.form-group').querySelector('.input-feedback');
            const icon = this.parentElement.querySelector('.validation-icon');
            
            if (!email) {
                feedback.textContent = '';
                icon.style.opacity = '0';
                return;
            }
            
            const isValid = validateEmail(email);
            if (isValid) {
                feedback.textContent = '';
                feedback.style.color = '#10b981';
                feedback.textContent = '✓ Valid email address';
                icon.style.opacity = '1';
                this.classList.remove('error');
                this.classList.add('success-border');
            } else {
                feedback.textContent = 'Please enter a valid email address';
                feedback.style.color = '#ef4444';
                icon.style.opacity = '0';
                this.classList.add('error');
                this.classList.remove('success-border');
            }
        });
    });
    
    // Password strength on input
    document.querySelectorAll('#password, #signupPassword').forEach(input => {
        input.addEventListener('input', function() {
            const strengthElement = document.getElementById(this.id === 'password' ? 'passwordStrength' : 'signupPasswordStrength');
            const textElement = document.getElementById(this.id === 'password' ? 'strengthText' : 'signupStrengthText');
            
            if (this.value) {
                updatePasswordStrength(this.value, strengthElement, textElement);
                
                // Update requirements list for signup
                if (this.id === 'signupPassword') {
                    updatePasswordRequirements(this.value);
                }
            } else {
                strengthElement.style.width = '0%';
                textElement.textContent = 'Password strength';
                textElement.style.color = '#94a3b8';
            }
        });
    });
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('signupPassword').value;
            const feedback = document.getElementById('confirmFeedback');
            
            if (!this.value) {
                feedback.textContent = '';
                return;
            }
            
            if (this.value !== password) {
                feedback.textContent = 'Passwords do not match';
                feedback.style.color = '#ef4444';
                this.classList.add('error');
                this.classList.remove('success-border');
            } else {
                feedback.textContent = '✓ Passwords match';
                feedback.style.color = '#10b981';
                this.classList.remove('error');
                this.classList.add('success-border');
            }
        });
    }
}

function updatePasswordRequirements(password) {
    const { requirements } = checkPasswordStrength(password);
    
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`req-${req}`);
        if (element) {
            const icon = element.querySelector('i');
            if (requirements[req]) {
                element.classList.add('valid');
                icon.classList.remove('fa-circle');
                icon.classList.add('fa-check-circle');
                icon.style.color = '#10b981';
            } else {
                element.classList.remove('valid');
                icon.classList.remove('fa-check-circle');
                icon.classList.add('fa-circle');
                icon.style.color = '#94a3b8';
            }
        }
    });
}

// Login Form Setup
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validate form
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (!password) {
            showError('Please enter your password');
            return;
        }
        
        // Simulate login process
        await simulateLogin(email, password, rememberMe);
    });
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showForgotPasswordModal();
    });
}

// Signup Form Setup
function setupSignupForm() {
    const signupForm = document.getElementById('signupForm');
    const signupButton = document.getElementById('signupButton');
    
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Validate form
        if (!firstName || !lastName) {
            showError('Please enter your name');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        const { strength } = checkPasswordStrength(password);
        if (strength < 70) {
            showError('Please use a stronger password');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        if (!termsAccepted) {
            showError('Please accept the terms and conditions');
            return;
        }
        
        // Simulate signup process
        await simulateSignup(firstName, lastName, email, password);
    });
}

// OTP Input Setup
function setupOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
}

// Social Login Buttons
function setupSocialButtons() {
    document.querySelectorAll('.social-btn').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' :
                           this.classList.contains('microsoft') ? 'Microsoft' : 'GitHub';
            
            showLoading(this);
            
            // Simulate social login
            setTimeout(() => {
                removeLoading(this);
                showError(`${provider} login is not implemented in this demo`);
            }, 1500);
        });
    });
}

// Modal Functions
function showTwoFactorModal() {
    const modal = document.getElementById('twoFactorModal');
    const closeBtn = modal.querySelector('.modal-close');
    const verifyBtn = modal.querySelector('.btn-verify');
    
    modal.classList.add('active');
    
    // Close modal on X click
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Verify OTP
    verifyBtn.addEventListener('click', () => {
        const otpInputs = modal.querySelectorAll('.otp-input');
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        
        if (otp.length === 6 && /^\d+$/.test(otp)) {
            showSuccess('Login successful! Redirecting...');
            modal.classList.remove('active');
            
            // Simulate redirect
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            showError('Please enter a valid 6-digit code');
        }
    });
}

function showForgotPasswordModal() {
    alert('Password reset functionality would be implemented here.\nA reset link would be sent to your email.');
}

// Simulation Functions
async function simulateLogin(email, password, rememberMe) {
    const loginButton = document.getElementById('loginButton');
    
    showLoading(loginButton);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check for demo credentials
    if (email === 'demo@quantumshield.com' && password === 'Demo@123') {
        removeLoading(loginButton);
        showTwoFactorModal();
    } else if (email === 'admin@quantumshield.com' && password === 'Admin@2024') {
        removeLoading(loginButton);
        showTwoFactorModal();
    } else {
        removeLoading(loginButton);
        showError('Invalid email or password. Try: demo@quantumshield.com / Demo@123');
    }
}

async function simulateSignup(firstName, lastName, email, password) {
    const signupButton = document.getElementById('signupButton');
    
    showLoading(signupButton);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    removeLoading(signupButton);
    
    // Show success modal
    const successModal = document.getElementById('successModal');
    successModal.classList.add('active');
    
    // Store demo user in localStorage
    const userData = {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('quantumShield_user', JSON.stringify(userData));
    } catch (e) {
        console.log('Local storage not available in this demo');
    }
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1e293b;
        border-left: 4px solid #ef4444;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function showSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1e293b;
        border-left: 4px solid #10b981;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function showLoading(button) {
    const text = button.querySelector('.btn-text');
    const originalText = text.textContent;
    
    button.classList.add('loading');
    text.textContent = 'Processing...';
    button.disabled = true;
}

function removeLoading(button) {
    const text = button.querySelector('.btn-text');
    const originalText = text.dataset.originalText || 'Secure Login';
    
    button.classList.remove('loading');
    text.textContent = originalText;
    button.disabled = false;
}

// Demo Credentials Notification
window.addEventListener('load', function() {
    // Show demo credentials after a delay
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'demo-credentials';
        notification.innerHTML = `
            <div style="background: rgba(30, 41, 59, 0.95); padding: 1rem; border-radius: 12px; margin: 1rem; border: 1px solid rgba(99, 102, 241, 0.3);">
                <h4 style="color: #818cf8; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Demo Credentials
                </h4>
                <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5;">
                    <strong>Email:</strong> demo@quantumshield.com<br>
                    <strong>Password:</strong> Demo@123<br>
                    <em style="font-size: 0.85rem;">Try the login with these credentials to see 2FA modal</em>
                </p>
            </div>
        `;
        
        // Position based on page
        if (document.getElementById('loginForm')) {
            const form = document.getElementById('loginForm');
            form.parentNode.insertBefore(notification, form.nextSibling);
        }
    }, 1000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + / to focus email field
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const emailInput = document.getElementById('email') || document.getElementById('signupEmail');
        if (emailInput) {
            emailInput.focus();
        }
    }
    
    // Esc to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Add network status indicator
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

function updateNetworkStatus() {
    const statusFooter = document.querySelector('.status-footer');
    if (!statusFooter) return;
    
    let networkStatus = statusFooter.querySelector('.network-status');
    if (!networkStatus) {
        networkStatus = document.createElement('div');
        networkStatus.className = 'status-item network-status';
        statusFooter.appendChild(networkStatus);
    }
    
    if (navigator.onLine) {
        networkStatus.innerHTML = `
            <i class="fas fa-wifi"></i>
            <span>Network: <strong>Online</strong></span>
        `;
    } else {
        networkStatus.innerHTML = `
            <i class="fas fa-wifi-slash"></i>
            <span>Network: <strong>Offline</strong></span>
        `;
    }
}

// Initialize network status
updateNetworkStatus();
