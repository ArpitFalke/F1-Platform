// ===========================
// F1 STREAM — Auth System
// Uses localStorage for demo
// ===========================

const AuthSystem = {
    STORAGE_KEY: 'f1stream_users',
    SESSION_KEY: 'f1stream_session',

    // Get all registered users
    getUsers() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    // Save users array
    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    // Register a new user
    register(username, email, password, favTeam = '', favDriver = '') {
        const users = this.getUsers();
        
        // Validate
        if (!username || !email || !password) {
            return { success: false, message: 'All fields are required.' };
        }
        if (username.length < 3) {
            return { success: false, message: 'Username must be at least 3 characters.' };
        }
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address.' };
        }
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters.' };
        }
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: 'Username already taken.' };
        }
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'Email already registered.' };
        }

        const user = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            username,
            email,
            password: this.hashPassword(password),
            favTeam,
            favDriver,
            avatar: this.generateAvatar(username),
            joinDate: new Date().toISOString(),
            chatColor: this.getRandomChatColor(),
        };

        users.push(user);
        this.saveUsers(users);
        this.setSession(user);
        return { success: true, message: 'Account created successfully!', user };
    },

    // Login
    login(emailOrUsername, password) {
        const users = this.getUsers();
        const user = users.find(u => 
            (u.email.toLowerCase() === emailOrUsername.toLowerCase() || 
             u.username.toLowerCase() === emailOrUsername.toLowerCase())
        );
        
        if (!user) {
            return { success: false, message: 'Account not found.' };
        }
        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Incorrect password.' };
        }

        this.setSession(user);
        return { success: true, message: `Welcome back, ${user.username}!`, user };
    },

    // Logout
    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        updateAuthUI();
    },

    // Session management
    setSession(user) {
        const session = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            chatColor: user.chatColor,
            favTeam: user.favTeam,
            favDriver: user.favDriver,
            loginTime: Date.now(),
        };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    },

    getSession() {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    },

    isLoggedIn() {
        return this.getSession() !== null;
    },

    // Simple hash (demo only — not for production!)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    },

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    generateAvatar(username) {
        const colors = ['#e10600', '#3671C6', '#FF8700', '#27F4D2', '#E8002D', '#229971', '#0093CC', '#52E252'];
        const color = colors[username.length % colors.length];
        const initials = username.substring(0, 2).toUpperCase();
        return { color, initials };
    },

    getRandomChatColor() {
        const colors = ['#e10600', '#3b82f6', '#10b981', '#ffd700', '#f97316', '#8b5cf6', '#06b6d4', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// ===========================
// AUTH UI / MODALS
// ===========================

function createAuthModals() {
    // Don't create if already exists
    if (document.getElementById('authModal')) return;

    const modal = document.createElement('div');
    modal.id = 'authModal';
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-overlay" onclick="closeAuthModal()"></div>
        <div class="auth-modal-content">
            <button class="auth-close" onclick="closeAuthModal()"><i class="fas fa-times"></i></button>
            
            <!-- Login Form -->
            <div id="loginForm" class="auth-form active">
                <div class="auth-header">
                    <div class="auth-logo"><span class="logo-f1">F1</span><span class="logo-stream">STREAM</span></div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to access live chat and more</p>
                </div>
                <div class="auth-alert" id="loginAlert"></div>
                <div class="auth-field">
                    <label><i class="fas fa-user"></i> Username or Email</label>
                    <input type="text" id="loginEmail" placeholder="Enter username or email" autocomplete="username">
                </div>
                <div class="auth-field">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <div class="password-wrapper">
                        <input type="password" id="loginPassword" placeholder="Enter password" autocomplete="current-password">
                        <button class="toggle-pw" onclick="togglePassword('loginPassword', this)"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
                <div class="auth-options">
                    <label class="auth-checkbox"><input type="checkbox" checked> Remember me</label>
                    <a href="#" class="auth-link">Forgot password?</a>
                </div>
                <button class="auth-btn" onclick="handleLogin()"><i class="fas fa-sign-in-alt"></i> Sign In</button>
                <div class="auth-divider"><span>or</span></div>
                <div class="social-auth">
                    <button class="social-auth-btn google"><i class="fab fa-google"></i> Google</button>
                    <button class="social-auth-btn github"><i class="fab fa-github"></i> GitHub</button>
                </div>
                <p class="auth-switch">Don't have an account? <a href="#" onclick="switchAuthForm('register')">Create one</a></p>
            </div>

            <!-- Register Form -->
            <div id="registerForm" class="auth-form">
                <div class="auth-header">
                    <div class="auth-logo"><span class="logo-f1">F1</span><span class="logo-stream">STREAM</span></div>
                    <h2>Join the Grid</h2>
                    <p>Create your account for the ultimate F1 experience</p>
                </div>
                <div class="auth-alert" id="registerAlert"></div>
                <div class="auth-row">
                    <div class="auth-field">
                        <label><i class="fas fa-user"></i> Username</label>
                        <input type="text" id="regUsername" placeholder="Choose a username" autocomplete="username">
                    </div>
                    <div class="auth-field">
                        <label><i class="fas fa-envelope"></i> Email</label>
                        <input type="email" id="regEmail" placeholder="Your email" autocomplete="email">
                    </div>
                </div>
                <div class="auth-field">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <div class="password-wrapper">
                        <input type="password" id="regPassword" placeholder="Min 6 characters" autocomplete="new-password">
                        <button class="toggle-pw" onclick="togglePassword('regPassword', this)"><i class="fas fa-eye"></i></button>
                    </div>
                    <div class="password-strength" id="pwStrength">
                        <div class="pw-bar"><div class="pw-bar-fill" id="pwBarFill"></div></div>
                        <span id="pwStrengthText"></span>
                    </div>
                </div>
                <div class="auth-field">
                    <label><i class="fas fa-lock"></i> Confirm Password</label>
                    <input type="password" id="regPasswordConfirm" placeholder="Confirm password" autocomplete="new-password">
                </div>
                <div class="auth-row">
                    <div class="auth-field">
                        <label><i class="fas fa-flag"></i> Favorite Team</label>
                        <select id="regTeam">
                            <option value="">Select team...</option>
                            <option value="McLaren">McLaren</option>
                            <option value="Red Bull Racing">Red Bull Racing</option>
                            <option value="Ferrari">Ferrari</option>
                            <option value="Mercedes">Mercedes</option>
                            <option value="Williams">Williams</option>
                            <option value="Aston Martin">Aston Martin</option>
                            <option value="Audi F1 Team">Audi F1 Team</option>
                            <option value="Racing Bulls">Racing Bulls</option>
                            <option value="Haas">Haas</option>
                            <option value="Alpine">Alpine</option>
                        </select>
                    </div>
                    <div class="auth-field">
                        <label><i class="fas fa-user-astronaut"></i> Favorite Driver</label>
                        <select id="regDriver">
                            <option value="">Select driver...</option>
                            <option value="Max Verstappen">Max Verstappen (Red Bull)</option>
                            <option value="Lando Norris">Lando Norris (McLaren)</option>
                            <option value="Oscar Piastri">Oscar Piastri (McLaren)</option>
                            <option value="Lewis Hamilton">Lewis Hamilton (Ferrari)</option>
                            <option value="Charles Leclerc">Charles Leclerc (Ferrari)</option>
                            <option value="George Russell">George Russell (Mercedes)</option>
                            <option value="Kimi Antonelli">Kimi Antonelli (Mercedes)</option>
                            <option value="Carlos Sainz">Carlos Sainz (Williams)</option>
                            <option value="Alexander Albon">Alexander Albon (Williams)</option>
                            <option value="Fernando Alonso">Fernando Alonso (Aston Martin)</option>
                            <option value="Nico Hülkenberg">Nico Hülkenberg (Audi)</option>
                            <option value="Gabriel Bortoleto">Gabriel Bortoleto (Audi)</option>
                        </select>
                    </div>
                </div>
                <label class="auth-checkbox" style="margin-bottom: 1rem;">
                    <input type="checkbox" id="regTerms"> I agree to the <a href="#" class="auth-link">Terms of Service</a> and <a href="#" class="auth-link">Privacy Policy</a>
                </label>
                <button class="auth-btn" onclick="handleRegister()"><i class="fas fa-user-plus"></i> Create Account</button>
                <p class="auth-switch">Already have an account? <a href="#" onclick="switchAuthForm('login')">Sign in</a></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Password strength checker
    document.getElementById('regPassword')?.addEventListener('input', (e) => {
        updatePasswordStrength(e.target.value);
    });

    // Enter key handlers
    document.getElementById('loginPassword')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    document.getElementById('regPasswordConfirm')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleRegister();
    });
}

function openAuthModal(form = 'login') {
    createAuthModals();
    document.getElementById('authModal').classList.add('active');
    switchAuthForm(form);
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

function switchAuthForm(form) {
    document.getElementById('loginForm').classList.toggle('active', form === 'login');
    document.getElementById('registerForm').classList.toggle('active', form === 'register');
    // Clear alerts
    document.querySelectorAll('.auth-alert').forEach(a => a.innerHTML = '');
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = `<i class="fas fa-eye${isPassword ? '-slash' : ''}"></i>`;
}

function updatePasswordStrength(password) {
    const fill = document.getElementById('pwBarFill');
    const text = document.getElementById('pwStrengthText');
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
        { width: '0%', color: '#666', label: '' },
        { width: '20%', color: '#e10600', label: 'Weak' },
        { width: '40%', color: '#ff8700', label: 'Fair' },
        { width: '60%', color: '#ffd700', label: 'Good' },
        { width: '80%', color: '#10b981', label: 'Strong' },
        { width: '100%', color: '#06b6d4', label: 'Excellent' },
    ];
    const level = levels[strength];
    fill.style.width = level.width;
    fill.style.background = level.color;
    text.textContent = level.label;
    text.style.color = level.color;
}

function showAuthAlert(elementId, message, type = 'error') {
    const alert = document.getElementById(elementId);
    alert.innerHTML = `<div class="alert-${type}"><i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}</div>`;
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAuthAlert('loginAlert', 'Please fill in all fields.');
        return;
    }

    const result = AuthSystem.login(email, password);
    if (result.success) {
        showAuthAlert('loginAlert', result.message, 'success');
        setTimeout(() => {
            closeAuthModal();
            updateAuthUI();
        }, 800);
    } else {
        showAuthAlert('loginAlert', result.message);
    }
}

function handleRegister() {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regPasswordConfirm').value;
    const favTeam = document.getElementById('regTeam').value;
    const favDriver = document.getElementById('regDriver').value;
    const terms = document.getElementById('regTerms').checked;

    if (!terms) {
        showAuthAlert('registerAlert', 'You must agree to the Terms of Service.');
        return;
    }
    if (password !== confirm) {
        showAuthAlert('registerAlert', 'Passwords do not match.');
        return;
    }

    const result = AuthSystem.register(username, email, password, favTeam, favDriver);
    if (result.success) {
        showAuthAlert('registerAlert', result.message, 'success');
        setTimeout(() => {
            closeAuthModal();
            updateAuthUI();
        }, 800);
    } else {
        showAuthAlert('registerAlert', result.message);
    }
}

// Update UI based on login state
function updateAuthUI() {
    const session = AuthSystem.getSession();
    const signInBtn = document.getElementById('signInBtn');
    const chatInputArea = document.querySelector('.chat-input-area');

    if (session) {
        signInBtn.innerHTML = `
            <div class="user-avatar-sm" style="background: ${session.avatar.color};">${session.avatar.initials}</div>
            ${session.username}
        `;
        signInBtn.onclick = () => openUserMenu();
        
        // Enable chat
        if (chatInputArea) {
            chatInputArea.innerHTML = `
                <input type="text" placeholder="Type a message..." id="chatInput">
                <button class="btn-primary btn-sm" onclick="sendChat()"><i class="fas fa-paper-plane"></i></button>
            `;
            document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') sendChat();
            });
        }
    } else {
        signInBtn.innerHTML = `<i class="fas fa-user"></i> Sign In`;
        signInBtn.onclick = () => openAuthModal('login');
        
        // Show login prompt in chat
        if (chatInputArea) {
            chatInputArea.innerHTML = `
                <button class="btn-primary btn-sm" style="width:100%;" onclick="openAuthModal('register')">
                    <i class="fas fa-user-plus"></i> Sign in to chat
                </button>
            `;
        }
    }
}

function openUserMenu() {
    const session = AuthSystem.getSession();
    if (!session) return;

    // Check if menu already exists and toggle
    let existing = document.getElementById('userMenu');
    if (existing) { existing.remove(); return; }

    const menu = document.createElement('div');
    menu.id = 'userMenu';
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-header">
            <div class="user-avatar" style="background: ${session.avatar.color};">${session.avatar.initials}</div>
            <div>
                <div class="user-menu-name">${session.username}</div>
                <div class="user-menu-email">${session.email}</div>
            </div>
        </div>
        <div class="user-menu-divider"></div>
        ${session.favTeam ? `<div class="user-menu-item"><i class="fas fa-flag"></i> ${session.favTeam}</div>` : ''}
        ${session.favDriver ? `<div class="user-menu-item"><i class="fas fa-user-astronaut"></i> ${session.favDriver}</div>` : ''}
        <div class="user-menu-divider"></div>
        <div class="user-menu-item" onclick="document.getElementById('userMenu').remove();"><i class="fas fa-cog"></i> Settings</div>
        <div class="user-menu-item logout" onclick="AuthSystem.logout(); document.getElementById('userMenu').remove();"><i class="fas fa-sign-out-alt"></i> Sign Out</div>
    `;
    document.body.appendChild(menu);

    // Position near sign-in button
    const btn = document.getElementById('signInBtn');
    const rect = btn.getBoundingClientRect();
    menu.style.top = (rect.bottom + 8) + 'px';
    menu.style.right = (window.innerWidth - rect.right) + 'px';

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closer(e) {
            if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closer);
            }
        });
    }, 100);
}

// Initialize auth UI on load
document.addEventListener('DOMContentLoaded', () => {
    createAuthModals();
    updateAuthUI();
});
