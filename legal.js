// ==========================================
// F1 STREAM — Legal Documents & Cookie Consent System
// Includes Terms & Conditions, Privacy Policy, and 10s Modern Cookie Popup
// Created by ArpitFalke (https://github.com/ArpitFalke)
// ==========================================

const CookieManager = {
    COOKIE_NAME: 'f1stream_consent',
    STORAGE_KEY: 'f1stream_cookie_consent',
    POPUP_DELAY_MS: 10000, // 10 seconds after site load
    timerId: null,

    setBrowserCookie(name, value, days = 365) {
        const maxAge = days * 86400;
        document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    },

    getBrowserCookie(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    },

    deleteBrowserCookie(name) {
        document.cookie = `${name}=; max-age=0; path=/; SameSite=Lax`;
    },

    getConsent() {
        try {
            const rawCookie = this.getBrowserCookie(this.COOKIE_NAME);
            if (rawCookie) return JSON.parse(rawCookie);
            const rawStorage = localStorage.getItem(this.STORAGE_KEY);
            return rawStorage ? JSON.parse(rawStorage) : null;
        } catch {
            return null;
        }
    },

    hasConsent() {
        return this.getConsent() !== null;
    },

    saveConsent(prefs) {
        const data = {
            essential: true,
            functional: !!prefs.functional,
            analytics: !!prefs.analytics,
            updatedAt: new Date().toISOString()
        };
        const serialized = JSON.stringify(data);
        localStorage.setItem(this.STORAGE_KEY, serialized);
        this.setBrowserCookie(this.COOKIE_NAME, serialized, 365);

        // Apply actual cookie preferences
        if (data.functional) {
            this.setBrowserCookie('f1stream_pref_ui', 'modern_dark', 365);
        } else {
            this.deleteBrowserCookie('f1stream_pref_ui');
            localStorage.removeItem('f1stream_chat_room');
        }

        if (data.analytics) {
            this.setBrowserCookie('f1stream_telemetry_optin', '1', 365);
        } else {
            this.deleteBrowserCookie('f1stream_telemetry_optin');
        }

        this.hideCookieBanner();
        this.showToast('Cookie preferences saved');
        return data;
    },

    acceptAll() {
        return this.saveConsent({ functional: true, analytics: true });
    },

    acceptEssentialOnly() {
        return this.saveConsent({ functional: false, analytics: false });
    },

    resetConsent() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.deleteBrowserCookie(this.COOKIE_NAME);
        this.deleteBrowserCookie('f1stream_pref_ui');
        this.deleteBrowserCookie('f1stream_telemetry_optin');
        this.showCookieBanner();
    },

    init() {
        this.injectCookieBanner();
        this.injectLegalModal();

        if (!this.hasConsent()) {
            // Schedule modern cookie popup 10 seconds after page finishes loading
            this.timerId = setTimeout(() => {
                this.showCookieBanner();
            }, this.POPUP_DELAY_MS);
        }
    },

    injectCookieBanner() {
        if (document.getElementById('cookieConsentBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie Consent');
        banner.innerHTML = `
            <div class="cookie-banner-accent"></div>
            <div class="cookie-banner-top">
                <div class="cookie-icon-badge">
                    <i class="fas fa-cookie-bite"></i>
                </div>
                <div class="cookie-text-wrap">
                    <div class="cookie-title-row">
                        <h4>We Use Cookies</h4>
                        <span class="cookie-pill-tag">Privacy Control</span>
                    </div>
                    <p>We use cookies and local browser storage to keep your Paddock sign-in session active, sync real-time live chat with friends, and optimize streaming playback.</p>
                </div>
                <button type="button" class="cookie-close-x" onclick="CookieManager.hideCookieBanner()" aria-label="Dismiss cookie notice">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Collapsible Granular Controls -->
            <div class="cookie-customize-panel" id="cookieCustomizePanel">
                <div class="cookie-toggle-row">
                    <div>
                        <strong>Essential Cookies</strong>
                        <span>Required for Sign In, Auth Session & Cookie state</span>
                    </div>
                    <label class="switch-control disabled">
                        <input type="checkbox" checked disabled>
                        <span class="switch-slider"></span>
                    </label>
                </div>
                <div class="cookie-toggle-row">
                    <div>
                        <strong>Functional & Chat Rooms</strong>
                        <span>Remembers chat room code & team theme preference</span>
                    </div>
                    <label class="switch-control">
                        <input type="checkbox" id="cookieToggleFunctional" checked>
                        <span class="switch-slider"></span>
                    </label>
                </div>
                <div class="cookie-toggle-row">
                    <div>
                        <strong>Telemetry & Diagnostics</strong>
                        <span>Helps measure stream latency & animation smoothness</span>
                    </div>
                    <label class="switch-control">
                        <input type="checkbox" id="cookieToggleAnalytics" checked>
                        <span class="switch-slider"></span>
                    </label>
                </div>
            </div>

            <div class="cookie-banner-footer">
                <div class="cookie-legal-links">
                    <a href="#" onclick="openLegalModal('privacy'); return false;">Privacy Policy</a>
                    <span>•</span>
                    <a href="#" onclick="openLegalModal('terms'); return false;">Terms</a>
                    <span>•</span>
                    <a href="#" onclick="openLegalModal('cookies'); return false;">Cookie Details</a>
                </div>
                <div class="cookie-actions">
                    <button type="button" class="cookie-btn-ghost" onclick="CookieManager.acceptEssentialOnly()">Essential Only</button>
                    <button type="button" class="cookie-btn-outline" id="cookieCustomizeBtn" onclick="CookieManager.toggleCustomize()">Customize</button>
                    <button type="button" class="cookie-btn-primary" id="cookieAcceptBtn" onclick="CookieManager.acceptAll()">Accept All</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    },

    toggleCustomize() {
        const panel = document.getElementById('cookieCustomizePanel');
        const btn = document.getElementById('cookieCustomizeBtn');
        const acceptBtn = document.getElementById('cookieAcceptBtn');
        if (!panel) return;

        const isOpen = panel.classList.toggle('open');
        if (isOpen) {
            const current = this.getConsent();
            if (current) {
                document.getElementById('cookieToggleFunctional').checked = !!current.functional;
                document.getElementById('cookieToggleAnalytics').checked = !!current.analytics;
            }
            if (btn) btn.textContent = 'Hide Options';
            if (acceptBtn) {
                acceptBtn.textContent = 'Save Preferences';
                acceptBtn.onclick = () => this.saveCustomFromBanner();
            }
        } else {
            if (btn) btn.textContent = 'Customize';
            if (acceptBtn) {
                acceptBtn.textContent = 'Accept All';
                acceptBtn.onclick = () => this.acceptAll();
            }
        }
    },

    saveCustomFromBanner() {
        const functional = document.getElementById('cookieToggleFunctional')?.checked ?? true;
        const analytics = document.getElementById('cookieToggleAnalytics')?.checked ?? true;
        this.saveConsent({ functional, analytics });
    },

    showCookieBanner() {
        this.injectCookieBanner();
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            requestAnimationFrame(() => banner.classList.add('visible'));
        }
    },

    hideCookieBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) banner.classList.remove('visible');
    },

    showToast(msg) {
        let toast = document.getElementById('cookieToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cookieToast';
            toast.className = 'f1-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${msg}</span>`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
    },

    injectLegalModal() {
        if (document.getElementById('legalModal')) return;

        const modal = document.createElement('div');
        modal.id = 'legalModal';
        modal.className = 'legal-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Terms, Privacy Policy and Cookies');
        modal.innerHTML = `
            <div class="legal-modal-overlay" onclick="closeLegalModal()"></div>
            <div class="legal-modal-dialog">
                <button type="button" class="modal-close-btn" onclick="closeLegalModal()" aria-label="Close"><i class="fas fa-times"></i></button>
                <div class="legal-modal-header">
                    <div class="legal-badge"><i class="fas fa-scale-balanced"></i> PLATFORM GOVERNANCE & PRIVACY</div>
                    <h2>F1 STREAM — Policies & Cookies</h2>
                    <p>Last Updated: November 2026 • Platform Created by <a href="https://github.com/ArpitFalke" target="_blank" rel="noopener" style="color:var(--accent-red);font-weight:700;text-decoration:none;">ArpitFalke</a></p>
                    <div class="legal-tabs">
                        <button type="button" class="legal-tab active" data-legal-tab="terms" onclick="switchLegalTab('terms')">
                            <i class="fas fa-file-contract"></i> Terms & Conditions
                        </button>
                        <button type="button" class="legal-tab" data-legal-tab="privacy" onclick="switchLegalTab('privacy')">
                            <i class="fas fa-user-shield"></i> Privacy Policy
                        </button>
                        <button type="button" class="legal-tab" data-legal-tab="cookies" onclick="switchLegalTab('cookies')">
                            <i class="fas fa-cookie-bite"></i> Cookie System
                        </button>
                    </div>
                </div>
                <div class="legal-modal-body" id="legalModalBody">
                    <!-- Dynamic content rendered by switchLegalTab() -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

function openLegalModal(tab = 'terms') {
    CookieManager.injectLegalModal();
    const modal = document.getElementById('legalModal');
    if (modal) {
        switchLegalTab(tab);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLegalModal() {
    document.getElementById('legalModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

function openCookieModal() {
    openLegalModal('cookies');
}

function switchLegalTab(tab) {
    document.querySelectorAll('.legal-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.legalTab === tab);
    });

    const body = document.getElementById('legalModalBody');
    if (!body) return;

    if (tab === 'terms') {
        body.innerHTML = `
            <div class="legal-doc fade-in-up">
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing or using <strong>F1 STREAM</strong> (created and maintained by <a href="https://github.com/ArpitFalke" target="_blank" rel="noopener">ArpitFalke</a>), you agree to be bound by these Terms and Conditions and all applicable browser usage standards.</p>

                <h3>2. Platform Purpose & Broadcast Stream</h3>
                <p>F1 STREAM is an independent interactive Formula 1 companion web application featuring live embedded race streams, interactive 2026 championship tables, circuit telemetry visualizations, highlights recaps, and real-time community chat rooms.</p>
                <p>Video broadcast streams are embedded via third-party iframe feeds. We do not host or store live broadcast video files directly on our infrastructure.</p>

                <h3>3. User Accounts & Paddock Access</h3>
                <ul>
                    <li>Users must be at least 13 years of age to create a Paddock Pass account.</li>
                    <li>Account credentials and profile selections (username, email, favorite constructor, and favorite driver) are stored locally in your browser storage for interactive functionality.</li>
                    <li>You are responsible for keeping your device and browser session secure when signing in on shared computers.</li>
                </ul>

                <h3>4. Live Friend Chat Guidelines</h3>
                <p>The Live Paddock Chat connects real viewers without automated chat bots. When participating in live rooms with friends or other viewers, you agree not to post abusive language, spam, malicious links, or impersonate other members.</p>

                <h3>5. Creator & Open-Source Attribution</h3>
                <p>This platform was designed and engineered by <strong>ArpitFalke</strong>. Source code and updates are maintained via <a href="https://github.com/ArpitFalke/F1-Platform" target="_blank" rel="noopener">GitHub (ArpitFalke/F1-Platform)</a>.</p>
            </div>
        `;
    } else if (tab === 'privacy') {
        body.innerHTML = `
            <div class="legal-doc fade-in-up">
                <h3>1. Privacy-First Local Architecture</h3>
                <p><strong>F1 STREAM</strong> respects your privacy by operating on a client-first architecture. Your personal account information does not get sold or transmitted to third-party ad brokers.</p>

                <h3>2. Data We Store Locally</h3>
                <ul>
                    <li><strong>Account Data (<code>f1stream_users</code>):</strong> Username, email address, hashed demo password, favorite team, and favorite driver you choose during registration.</li>
                    <li><strong>Session Tokens (<code>f1stream_session</code>):</strong> Keeps you signed in across tabs via <code>sessionStorage</code> and optional <code>localStorage</code> ("Keep me signed in").</li>
                    <li><strong>Real-Time Chat History (<code>f1stream_real_chat_v2_*</code>):</strong> Messages exchanged between you and friends in active chat rooms, synced locally across tabs via the browser <code>BroadcastChannel</code> API.</li>
                    <li><strong>Cookie Consent Record (<code>f1stream_consent</code>):</strong> Stores your cookie acceptance and category choices.</li>
                </ul>

                <h3>3. Embedded Content</h3>
                <p>When viewing the live stream iframe or CDN media images, your browser connects directly to the respective media delivery endpoints, which may handle standard network headers (such as IP address or browser user agent).</p>

                <h3>4. Your Data Controls</h3>
                <p>You maintain complete ownership of your data inside your browser. You can sign out, delete room chat history, clear non-essential cookies, or wipe browser site data at any time.</p>
                <div class="legal-action-strip">
                    <button type="button" class="btn-outline btn-sm" onclick="CookieManager.resetConsent(); closeLegalModal();">
                        <i class="fas fa-sync-alt"></i> Reset Consent & Re-open Cookie Banner
                    </button>
                </div>
            </div>
        `;
    } else if (tab === 'cookies') {
        const consent = CookieManager.getConsent() || { essential: true, functional: true, analytics: true, updatedAt: 'Not yet saved' };
        body.innerHTML = `
            <div class="legal-doc fade-in-up">
                <h3>How F1 STREAM Uses Cookies</h3>
                <p>Cookies are small text records stored on your browser to remember your session, preferences, and platform diagnostics. After loading the site for 10 seconds without prior choice, our Cookie Banner prompts you to configure these controls.</p>

                <div class="legal-cookie-table">
                    <div class="cookie-pref-item">
                        <div>
                            <strong><i class="fas fa-lock" style="color:var(--accent-green);"></i> Essential Cookies (Always Active)</strong>
                            <p>Maintains active Paddock login state (<code>f1stream_session</code>) and stores your consent decision (<code>f1stream_consent</code>).</p>
                        </div>
                        <span class="cookie-status-pill active">Required</span>
                    </div>

                    <div class="cookie-pref-item">
                        <div>
                            <strong><i class="fas fa-sliders" style="color:var(--accent-blue);"></i> Functional & Chat Room Cookies</strong>
                            <p>Remembers your custom friend chat room code (<code>f1stream_chat_room</code>) and dark telemetry UI preferences (<code>f1stream_pref_ui</code>).</p>
                        </div>
                        <label class="switch-control">
                            <input type="checkbox" id="legalToggleFunctional" ${consent.functional ? 'checked' : ''}>
                            <span class="switch-slider"></span>
                        </label>
                    </div>

                    <div class="cookie-pref-item">
                        <div>
                            <strong><i class="fas fa-chart-line" style="color:var(--accent-gold);"></i> Performance & Stream Diagnostics</strong>
                            <p>Stores opt-in playback diagnostics (<code>f1stream_telemetry_optin</code>) to smooth UI transitions and player controls.</p>
                        </div>
                        <label class="switch-control">
                            <input type="checkbox" id="legalToggleAnalytics" ${consent.analytics ? 'checked' : ''}>
                            <span class="switch-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="legal-action-strip" style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.5rem;">
                    <button type="button" class="btn-primary btn-sm" onclick="saveLegalCookiePrefs()">
                        <i class="fas fa-save"></i> Save Preferences
                    </button>
                    <button type="button" class="btn-outline btn-sm" onclick="CookieManager.acceptAll(); switchLegalTab('cookies');">
                        Accept All Cookies
                    </button>
                    <button type="button" class="btn-outline btn-sm" onclick="CookieManager.acceptEssentialOnly(); switchLegalTab('cookies');">
                        Essential Only
                    </button>
                </div>
                <p style="margin-top:0.75rem; font-size:0.78rem; color:var(--text-muted);">
                    Current consent cookie: <code>${CookieManager.getBrowserCookie(CookieManager.COOKIE_NAME) ? 'Active' : 'Pending User Action'}</code>
                </p>
            </div>
        `;
    }
}

function saveLegalCookiePrefs() {
    const functional = document.getElementById('legalToggleFunctional')?.checked ?? true;
    const analytics = document.getElementById('legalToggleAnalytics')?.checked ?? true;
    CookieManager.saveConsent({ functional, analytics });
    switchLegalTab('cookies');
}

// Initialize Cookie & Legal system after full page load so the 10-second popup timer runs accurately
window.addEventListener('load', () => {
    CookieManager.init();
});
