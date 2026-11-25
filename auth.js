// ==========================================
// F1 STREAM — Upgraded Paddock Auth System
// Uses sessionStorage + localStorage with Cookie Consent respect
// Created by ArpitFalke (https://github.com/ArpitFalke)
// ==========================================

const TEAM_COLORS = {
    "Mercedes": "#00D2BE",
    "Ferrari": "#E80020",
    "Red Bull Racing": "#3671C6",
    "McLaren": "#FF8000",
    "Racing Bulls": "#6692FF",
    "Alpine": "#0090FF",
    "Haas F1 Team": "#B6BABD",
    "Audi F1 Team": "#ED1C24",
    "Williams": "#64C4FF",
    "Aston Martin": "#229971",
    "Cadillac": "#C5A059"
};

const AuthSystem = {
    STORAGE_KEY: 'f1stream_users',
    SESSION_KEY: 'f1stream_session',

    getUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    },

    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    register(username, email, password, favTeam = '', favDriver = '') {
        const users = this.getUsers();

        if (!username || !email || !password) {
            return { success: false, message: 'All required fields must be filled.' };
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
            return { success: false, message: 'That username is already taken on the grid.' };
        }
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'This email is already registered.' };
        }

        const teamColor = TEAM_COLORS[favTeam] || this.getRandomChatColor();

        const user = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            username,
            email,
            password: this.hashPassword(password),
            favTeam,
            favDriver,
            avatar: {
                color: teamColor,
                initials: this.getInitials(username)
            },
            joinDate: new Date().toISOString(),
            chatColor: teamColor
        };

        users.push(user);
        this.saveUsers(users);
        this.setSession(user, true);
        return { success: true, message: `Welcome to the Grid, ${user.username}!`, user };
    },

    login(emailOrUsername, password, remember = true) {
        const users = this.getUsers();
        const user = users.find(u =>
            u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
            u.username.toLowerCase() === emailOrUsername.toLowerCase()
        );

        if (!user) {
            return { success: false, message: 'No account found with that username or email.' };
        }
        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Incorrect password. Please try again.' };
        }

        this.setSession(user, remember);
        return { success: true, message: `Welcome back, ${user.username}!`, user };
    },

    resetPassword(emailOrUsername, newPassword) {
        const users = this.getUsers();
        const idx = users.findIndex(u =>
            u.email.toLowerCase() === emailOrUsername.toLowerCase() ||
            u.username.toLowerCase() === emailOrUsername.toLowerCase()
        );
        if (idx === -1) {
            return { success: false, message: 'Account not found.' };
        }
        if (!newPassword || newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters.' };
        }
        users[idx].password = this.hashPassword(newPassword);
        this.saveUsers(users);
        return { success: true, message: 'Password updated! You can now sign in.' };
    },

    logout() {
        sessionStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem(this.SESSION_KEY);
        updateAuthUI();
        if (typeof ChatSystem !== 'undefined') {
            ChatSystem.renderAll();
        }
    },

    setSession(user, remember = true) {
        const session = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            chatColor: user.chatColor,
            favTeam: user.favTeam,
            favDriver: user.favDriver,
            loginTime: Date.now()
        };
        const raw = JSON.stringify(session);
        sessionStorage.setItem(this.SESSION_KEY, raw);
        if (remember) {
            localStorage.setItem(this.SESSION_KEY, raw);
        } else {
            localStorage.removeItem(this.SESSION_KEY);
        }
    },

    getSession() {
        try {
            const tabData = sessionStorage.getItem(this.SESSION_KEY);
            if (tabData) return JSON.parse(tabData);
            const persistentData = localStorage.getItem(this.SESSION_KEY);
            if (persistentData) {
                sessionStorage.setItem(this.SESSION_KEY, persistentData);
                return JSON.parse(persistentData);
            }
            return null;
        } catch {
            return null;
        }
    },

    isLoggedIn() {
        return this.getSession() !== null;
    },

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

    getInitials(username) {
        const clean = (username || '').trim();
        if (!clean) return 'F1';
        const words = clean.split(/[\s_-]+/).filter(Boolean);
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        const caps = clean.match(/[A-Z]/g);
        if (caps && caps.length >= 2) {
            return (caps[0] + caps[1]).toUpperCase();
        }
        return clean.substring(0, 2).toUpperCase();
    },

    getRandomChatColor() {
        const colors = ['#e10600', '#3671C6', '#FF8000', '#00D2BE', '#E80020', '#229971', '#0090FF', '#C5A059'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// ==========================================
// UPGRADED SPLIT-PANE AUTH MODAL UI
// ==========================================

function createAuthModals() {
    if (document.getElementById('authModal')) return;

    const modal = document.createElement('div');
    modal.id = 'authModal';
    modal.className = 'auth-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Account Sign In and Registration');
    modal.innerHTML = `
        <div class="auth-modal-overlay" onclick="closeAuthModal()"></div>
        <div class="auth-modal-shell">
            <button class="auth-close" onclick="closeAuthModal()" aria-label="Close"><i class="fas fa-times"></i></button>

            <!-- Left Motorsport Branding Showcase -->
            <div class="auth-showcase">
                <div class="auth-showcase-bg"></div>
                <div class="auth-showcase-inner">
                    <div class="auth-pass-badge"><span class="live-dot"></span> 2026 PADDOCK CLUB</div>
                    <div class="auth-logo-lg"><span class="logo-f1">F1</span><span class="logo-stream">STREAM</span></div>
                    <h3 id="authShowcaseTitle">Your Pit Wall Awaits</h3>
                    <p id="authShowcaseDesc">Sign in or create your free Paddock Pass to join real-time race discussions with friends.</p>

                    <!-- Live Member Pass Card Preview -->
                    <div class="auth-pass-card" id="authPassPreview">
                        <div class="auth-pass-stripe" id="previewStripe"></div>
                        <div class="auth-pass-top">
                            <span class="pass-chip"><i class="fas fa-microchip"></i> GRID PASS</span>
                            <span class="pass-season">2026</span>
                        </div>
                        <div class="auth-pass-user">
                            <div class="pass-avatar" id="previewAvatar">F1</div>
                            <div>
                                <div class="pass-name" id="previewName">Paddock Driver</div>
                                <div class="pass-meta" id="previewMeta">Select team & driver</div>
                            </div>
                        </div>
                    </div>

                    <ul class="auth-perks">
                        <li><i class="fas fa-check-circle"></i> Real-time live chat with friends (zero bots)</li>
                        <li><i class="fas fa-check-circle"></i> Multi-tab room codes & typing indicators</li>
                        <li><i class="fas fa-check-circle"></i> Personalized constructor badge & colors</li>
                    </ul>

                    <div class="auth-creator-tag">
                        <i class="fab fa-github"></i> Created by <a href="https://github.com/ArpitFalke" target="_blank" rel="noopener">ArpitFalke</a>
                    </div>
                </div>
            </div>

            <!-- Right Form Workspace -->
            <div class="auth-form-panel">
                <!-- Animated Tab Switcher -->
                <div class="auth-tabs" id="authTabs">
                    <div class="auth-tab-slider" id="authTabSlider"></div>
                    <button type="button" class="auth-tab active" data-auth-tab="login" onclick="switchAuthForm('login')">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </button>
                    <button type="button" class="auth-tab" data-auth-tab="register" onclick="switchAuthForm('register')">
                        <i class="fas fa-user-plus"></i> Create Account
                    </button>
                </div>

                <!-- Sign In Form -->
                <div id="loginForm" class="auth-form active">
                    <div class="auth-header-compact">
                        <h2>Welcome Back</h2>
                        <p>Enter your credentials to resume live paddock chat</p>
                    </div>
                    <div class="auth-alert" id="loginAlert"></div>

                    <div class="auth-field">
                        <label for="loginEmail"><i class="fas fa-user-circle"></i> Username or Email</label>
                        <div class="input-icon-wrap">
                            <i class="fas fa-at input-lead-icon"></i>
                            <input type="text" id="loginEmail" placeholder="e.g. Arpit or email@domain.com" autocomplete="username">
                        </div>
                    </div>

                    <div class="auth-field">
                        <label for="loginPassword"><i class="fas fa-lock"></i> Password</label>
                        <div class="password-wrapper input-icon-wrap">
                            <i class="fas fa-key input-lead-icon"></i>
                            <input type="password" id="loginPassword" placeholder="Enter your password" autocomplete="current-password">
                            <button type="button" class="toggle-pw" onclick="togglePassword('loginPassword', this)" aria-label="Show password"><i class="fas fa-eye"></i></button>
                        </div>
                    </div>

                    <div class="auth-options">
                        <label class="auth-checkbox">
                            <input type="checkbox" id="loginRemember" checked> Keep me signed in
                        </label>
                        <a href="#" class="auth-link" onclick="toggleResetPanel(true); return false;">Forgot password?</a>
                    </div>

                    <button type="button" class="auth-btn auth-btn-glow" onclick="handleLogin()">
                        <span>Sign In to Paddock</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>

                    <!-- Inline Password Reset Panel -->
                    <div id="resetPasswordBox" class="auth-reset-box" style="display:none;">
                        <div class="reset-box-header">
                            <span><i class="fas fa-unlock-alt"></i> Quick Password Reset</span>
                            <button type="button" onclick="toggleResetPanel(false)"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="auth-alert" id="resetAlert"></div>
                        <input type="text" id="resetIdentifier" placeholder="Your username or email" style="margin-bottom:0.5rem;">
                        <input type="password" id="resetNewPw" placeholder="New password (min 6 chars)" style="margin-bottom:0.6rem;">
                        <button type="button" class="btn-outline btn-sm btn-block" onclick="handlePasswordReset()">Update Password</button>
                    </div>

                    <p class="auth-switch">New to F1 Stream? <a href="#" onclick="switchAuthForm('register'); return false;">Create free Paddock Pass</a></p>
                </div>

                <!-- Register Form -->
                <div id="registerForm" class="auth-form">
                    <div class="auth-header-compact">
                        <h2>Join the 2026 Grid</h2>
                        <p>Customize your driver profile and start chatting live</p>
                    </div>
                    <div class="auth-alert" id="registerAlert"></div>

                    <div class="auth-row">
                        <div class="auth-field">
                            <label for="regUsername"><i class="fas fa-id-badge"></i> Username</label>
                            <div class="input-icon-wrap">
                                <i class="fas fa-user input-lead-icon"></i>
                                <input type="text" id="regUsername" placeholder="Min 3 chars" autocomplete="username" oninput="updatePassPreview()">
                            </div>
                        </div>
                        <div class="auth-field">
                            <label for="regEmail"><i class="fas fa-envelope"></i> Email</label>
                            <div class="input-icon-wrap">
                                <i class="fas fa-envelope input-lead-icon"></i>
                                <input type="email" id="regEmail" placeholder="you@example.com" autocomplete="email">
                            </div>
                        </div>
                    </div>

                    <div class="auth-row">
                        <div class="auth-field">
                            <label for="regPassword"><i class="fas fa-lock"></i> Password</label>
                            <div class="password-wrapper input-icon-wrap">
                                <i class="fas fa-key input-lead-icon"></i>
                                <input type="password" id="regPassword" placeholder="Min 6 chars" autocomplete="new-password">
                                <button type="button" class="toggle-pw" onclick="togglePassword('regPassword', this)" aria-label="Show password"><i class="fas fa-eye"></i></button>
                            </div>
                        </div>
                        <div class="auth-field">
                            <label for="regPasswordConfirm"><i class="fas fa-shield-alt"></i> Confirm</label>
                            <div class="password-wrapper input-icon-wrap">
                                <i class="fas fa-check-double input-lead-icon"></i>
                                <input type="password" id="regPasswordConfirm" placeholder="Repeat password" autocomplete="new-password">
                            </div>
                        </div>
                    </div>

                    <div class="password-strength" id="pwStrength">
                        <div class="pw-bar"><div class="pw-bar-fill" id="pwBarFill"></div></div>
                        <span id="pwStrengthText">Password strength</span>
                    </div>

                    <div class="auth-row" style="margin-top:0.85rem;">
                        <div class="auth-field">
                            <label for="regTeam"><i class="fas fa-flag-checkered"></i> Favorite Team</label>
                            <select id="regTeam" onchange="updatePassPreview()">
                                <option value="">Select constructor...</option>
                                <option value="Mercedes">Mercedes</option>
                                <option value="Ferrari">Ferrari</option>
                                <option value="Red Bull Racing">Red Bull Racing</option>
                                <option value="McLaren">McLaren</option>
                                <option value="Racing Bulls">Racing Bulls</option>
                                <option value="Alpine">Alpine</option>
                                <option value="Haas F1 Team">Haas F1 Team</option>
                                <option value="Audi F1 Team">Audi F1 Team</option>
                                <option value="Williams">Williams</option>
                                <option value="Aston Martin">Aston Martin</option>
                                <option value="Cadillac">Cadillac</option>
                            </select>
                        </div>
                        <div class="auth-field">
                            <label for="regDriver"><i class="fas fa-helmet-safety"></i> Favorite Driver</label>
                            <select id="regDriver" onchange="updatePassPreview()">
                                <option value="">Select driver...</option>
                                <option value="Kimi Antonelli">Kimi Antonelli (#12)</option>
                                <option value="Max Verstappen">Max Verstappen (#1)</option>
                                <option value="Lewis Hamilton">Lewis Hamilton (#44)</option>
                                <option value="George Russell">George Russell (#63)</option>
                                <option value="Lando Norris">Lando Norris (#4)</option>
                                <option value="Charles Leclerc">Charles Leclerc (#16)</option>
                                <option value="Oscar Piastri">Oscar Piastri (#81)</option>
                                <option value="Isack Hadjar">Isack Hadjar (#6)</option>
                                <option value="Liam Lawson">Liam Lawson (#30)</option>
                                <option value="Pierre Gasly">Pierre Gasly (#10)</option>
                                <option value="Nico Hülkenberg">Nico Hülkenberg (#27)</option>
                                <option value="Gabriel Bortoleto">Gabriel Bortoleto (#5)</option>
                                <option value="Carlos Sainz">Carlos Sainz (#55)</option>
                                <option value="Alexander Albon">Alexander Albon (#23)</option>
                                <option value="Fernando Alonso">Fernando Alonso (#14)</option>
                                <option value="Valtteri Bottas">Valtteri Bottas (#77)</option>
                                <option value="Sergio Perez">Sergio Perez (#11)</option>
                            </select>
                        </div>
                    </div>

                    <label class="auth-checkbox auth-terms-check">
                        <input type="checkbox" id="regTerms">
                        <span>I agree to the <a href="#" class="auth-link" onclick="if(typeof openLegalModal==='function'){openLegalModal('terms');} return false;">Terms & Conditions</a> and <a href="#" class="auth-link" onclick="if(typeof openLegalModal==='function'){openLegalModal('privacy');} return false;">Privacy Policy</a></span>
                    </label>

                    <button type="button" class="auth-btn auth-btn-glow" onclick="handleRegister()">
                        <span>Create Paddock Pass</span>
                        <i class="fas fa-flag-checkered"></i>
                    </button>

                    <p class="auth-switch">Already have an account? <a href="#" onclick="switchAuthForm('login'); return false;">Sign in instead</a></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('regPassword')?.addEventListener('input', (e) => {
        updatePasswordStrength(e.target.value);
    });

    document.getElementById('loginPassword')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    document.getElementById('regPasswordConfirm')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleRegister();
    });
}

function updatePassPreview() {
    const username = (document.getElementById('regUsername')?.value || '').trim();
    const team = document.getElementById('regTeam')?.value || '';
    const driver = document.getElementById('regDriver')?.value || '';

    const avatarEl = document.getElementById('previewAvatar');
    const nameEl = document.getElementById('previewName');
    const metaEl = document.getElementById('previewMeta');
    const stripeEl = document.getElementById('previewStripe');

    const color = TEAM_COLORS[team] || '#e10600';
    if (avatarEl) {
        avatarEl.textContent = AuthSystem.getInitials(username);
        avatarEl.style.background = color;
        avatarEl.style.boxShadow = `0 0 18px ${color}66`;
    }
    if (stripeEl) stripeEl.style.background = color;
    if (nameEl) nameEl.textContent = username || 'Paddock Driver';
    if (metaEl) {
        const parts = [];
        if (team) parts.push(team);
        if (driver) parts.push(driver);
        metaEl.textContent = parts.length ? parts.join(' • ') : 'Select team & driver';
    }
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
    const isLogin = form === 'login';
    document.getElementById('loginForm')?.classList.toggle('active', isLogin);
    document.getElementById('registerForm')?.classList.toggle('active', !isLogin);

    const slider = document.getElementById('authTabSlider');
    if (slider) {
        slider.style.transform = isLogin ? 'translateX(0%)' : 'translateX(100%)';
    }
    document.querySelectorAll('.auth-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.authTab === form);
    });

    const titleEl = document.getElementById('authShowcaseTitle');
    const descEl = document.getElementById('authShowcaseDesc');
    if (titleEl && descEl) {
        if (isLogin) {
            titleEl.textContent = 'Your Pit Wall Awaits';
            descEl.textContent = 'Sign in with your Paddock account to join real-time race discussions with friends.';
        } else {
            titleEl.textContent = 'Claim Your Grid Slot';
            descEl.textContent = 'Personalize your constructor colors, pick your driver flair, and chat live.';
        }
    }

    document.querySelectorAll('.auth-alert').forEach(a => a.innerHTML = '');
}

function toggleResetPanel(show) {
    const box = document.getElementById('resetPasswordBox');
    if (box) box.style.display = show ? 'block' : 'none';
}

function handlePasswordReset() {
    const id = document.getElementById('resetIdentifier')?.value.trim();
    const newPw = document.getElementById('resetNewPw')?.value;
    const res = AuthSystem.resetPassword(id, newPw);
    showAuthAlert('resetAlert', res.message, res.success ? 'success' : 'error');
    if (res.success) {
        setTimeout(() => toggleResetPanel(false), 1200);
    }
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = `<i class="fas fa-eye${isPassword ? '-slash' : ''}"></i>`;
}

function updatePasswordStrength(password) {
    const fill = document.getElementById('pwBarFill');
    const text = document.getElementById('pwStrengthText');
    if (!fill || !text) return;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
        { width: '0%', color: '#656985', label: 'Password strength' },
        { width: '25%', color: '#e10600', label: 'Weak' },
        { width: '45%', color: '#ff8000', label: 'Fair' },
        { width: '65%', color: '#ffd700', label: 'Good' },
        { width: '85%', color: '#10b981', label: 'Strong' },
        { width: '100%', color: '#00D2BE', label: 'Pit-Wall Grade' }
    ];
    const level = levels[password ? Math.max(1, strength) : 0];
    fill.style.width = level.width;
    fill.style.background = level.color;
    text.textContent = level.label;
    text.style.color = level.color;
}

function showAuthAlert(elementId, message, type = 'error') {
    const alert = document.getElementById(elementId);
    if (!alert) return;
    alert.innerHTML = `<div class="alert-${type}"><i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}</div>`;
}

function handleLogin() {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const remember = document.getElementById('loginRemember')?.checked ?? true;

    if (!email || !password) {
        showAuthAlert('loginAlert', 'Please enter both username/email and password.');
        return;
    }

    const result = AuthSystem.login(email, password, remember);
    if (result.success) {
        showAuthAlert('loginAlert', result.message, 'success');
        setTimeout(() => {
            closeAuthModal();
            updateAuthUI();
            if (typeof ChatSystem !== 'undefined') ChatSystem.renderAll();
        }, 650);
    } else {
        showAuthAlert('loginAlert', result.message);
    }
}

function handleRegister() {
    const username = document.getElementById('regUsername')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirm = document.getElementById('regPasswordConfirm')?.value;
    const favTeam = document.getElementById('regTeam')?.value;
    const favDriver = document.getElementById('regDriver')?.value;
    const terms = document.getElementById('regTerms')?.checked;

    if (!terms) {
        showAuthAlert('registerAlert', 'Please accept the Terms & Conditions and Privacy Policy.');
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
            if (typeof ChatSystem !== 'undefined') ChatSystem.renderAll();
        }, 650);
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
        if (signInBtn) {
            signInBtn.innerHTML = `
                <div class="user-avatar-sm" style="background: ${session.avatar.color};">${session.avatar.initials}</div>
                ${session.username}
            `;
            signInBtn.onclick = () => openUserMenu();
        }

        if (chatInputArea) {
            chatInputArea.innerHTML = `
                <input type="text" placeholder="Discuss live with friends..." id="chatInput" maxlength="200">
                <button class="btn-primary btn-sm" onclick="sendChat()" title="Send Message"><i class="fas fa-paper-plane"></i></button>
            `;
            const input = document.getElementById('chatInput');
            if (input) {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') sendChat();
                });
                input.addEventListener('input', () => {
                    if (typeof ChatSystem !== 'undefined') ChatSystem.notifyTyping();
                });
            }
        }
    } else {
        if (signInBtn) {
            signInBtn.innerHTML = `<i class="fas fa-user"></i> Sign In`;
            signInBtn.onclick = () => openAuthModal('login');
        }

        if (chatInputArea) {
            chatInputArea.innerHTML = `
                <div class="chat-auth-gate">
                    <button class="btn-primary btn-sm" style="flex:1;" onclick="openAuthModal('login')">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </button>
                    <button class="btn-outline btn-sm" style="flex:1;" onclick="openAuthModal('register')">
                        <i class="fas fa-user-plus"></i> Join Grid
                    </button>
                </div>
            `;
        }
    }
}

function openUserMenu() {
    const session = AuthSystem.getSession();
    if (!session) return;

    const existing = document.getElementById('userMenu');
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
        ${session.favTeam ? `<div class="user-menu-item"><i class="fas fa-flag-checkered" style="color:${session.avatar.color}"></i> ${session.favTeam}</div>` : ''}
        ${session.favDriver ? `<div class="user-menu-item"><i class="fas fa-helmet-safety"></i> ${session.favDriver}</div>` : ''}
        <div class="user-menu-divider"></div>
        <div class="user-menu-item" onclick="document.getElementById('userMenu')?.remove(); if(typeof openCookieModal==='function') openCookieModal();"><i class="fas fa-cookie-bite"></i> Cookie Preferences</div>
        <div class="user-menu-item logout" onclick="AuthSystem.logout(); document.getElementById('userMenu')?.remove();"><i class="fas fa-sign-out-alt"></i> Sign Out</div>
    `;
    document.body.appendChild(menu);

    const btn = document.getElementById('signInBtn');
    const rect = btn.getBoundingClientRect();
    menu.style.top = (rect.bottom + 8) + 'px';
    menu.style.right = Math.max(12, window.innerWidth - rect.right) + 'px';

    setTimeout(() => {
        document.addEventListener('click', function closer(e) {
            if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closer);
            }
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    createAuthModals();
    updateAuthUI();
});
