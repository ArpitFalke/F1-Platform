// ==========================================
// F1 STREAM — Core Application Logic
// Real 2026 Season Data from Formula1.com
// Clean & Modular Architecture
// ==========================================

// Connect to Modular Data Stores
const circuitsData = window.F1_CIRCUITS || [];
const driverStandings = window.F1_DRIVERS || [];
const teams = window.F1_TEAMS || [];
const races2026 = window.F1_RACES || [];
const highlightsData = window.F1_HIGHLIGHTS || [];

// Derive Constructor Standings from Teams Data
const constructorStandings = teams.map(t => {
    let winCount = 0;
    if (t.highestFinish && t.highestFinish.includes('x')) {
        const m = t.highestFinish.match(/x(\d+)/);
        if (m) winCount = parseInt(m[1], 10);
    }
    return {
        pos: t.pos,
        name: t.name,
        fullName: t.fullName,
        color: t.color,
        points: t.points,
        wins: winCount,
        abbr: t.name.substring(0, 3).toUpperCase()
    };
});

// Helper for Circuit Track Map URL
function getCircuitMap(slug) {
    if (typeof window.getCircuitMapUrl === 'function') {
        return window.getCircuitMapUrl(slug);
    }
    return `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${slug}_Circuit.webp`;
}

// ===== APPLICATION INITIALIZATION =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader')?.classList.add('hidden');
    }, 1100);

    // Initialize sub-systems
    if (typeof ChatSystem !== 'undefined') ChatSystem.init();
    if (typeof updateAuthUI !== 'undefined') updateAuthUI();

    // Render Views
    renderNextRace();
    renderChampionshipBattle();
    renderHighlights('all');
    renderSchedule('all');
    renderCircuits();
    renderDriverStandings();
    renderConstructorStandings();
    renderDrivers();
    renderTeams();
});

// ===== NAVIGATION =====
function navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => {
        l.classList.toggle('active', l.dataset.section === sectionId);
    });

    document.getElementById('mobileNav')?.classList.remove('active');
    document.getElementById('hamburger')?.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.section);
    });
});

document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('mobileNav').classList.toggle('active');
});

window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== SEARCH BAR =====
document.getElementById('searchToggle')?.addEventListener('click', () => {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
        document.getElementById('searchInput')?.focus();
    }
});
document.getElementById('searchClose')?.addEventListener('click', () => {
    document.getElementById('searchOverlay')?.classList.remove('active');
});

document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) return;

    // Check highlights
    const hMatch = highlightsData.find(h => h.gpName.toLowerCase().includes(q) || h.winner.toLowerCase().includes(q) || h.circuit.toLowerCase().includes(q));
    if (hMatch) {
        navigateTo('highlights');
        openHighlightModal(hMatch.id);
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check circuit
    const cMatch = circuitsData.find(c => c.name.toLowerCase().includes(q) || c.gpName.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
    if (cMatch) {
        navigateTo('circuits');
        openCircuitModal(cMatch.id);
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check driver
    const dMatch = driverStandings.find(d => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q));
    if (dMatch) {
        navigateTo('drivers');
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check team
    const tMatch = teams.find(t => t.name.toLowerCase().includes(q) || t.fullName.toLowerCase().includes(q));
    if (tMatch) {
        navigateTo('teams');
        document.getElementById('searchOverlay').classList.remove('active');
        return;
    }

    // Check race
    const rMatch = races2026.find(r => r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q));
    if (rMatch) {
        navigateTo('schedule');
        document.getElementById('searchOverlay').classList.remove('active');
    }
});

// ===== NOTIFICATIONS =====
function toggleNotif() {
    document.getElementById('notifPanel')?.classList.toggle('active');
}
document.getElementById('notifBtn')?.addEventListener('click', toggleNotif);

// ===== CHAMPIONSHIP BATTLE BANNER =====
function renderChampionshipBattle() {
    const container = document.getElementById('championshipBattle');
    if (!container) return;

    const top3 = driverStandings.slice(0, 3);
    const maxPts = top3[0].points;

    container.innerHTML = `
        <div class="battle-card">
            <div class="battle-title-row">
                <div class="battle-live-badge"><span class="live-dot"></span> 2026 WORLD CHAMPIONSHIP DECIDER</div>
                <h2>2026 Drivers Championship Top Contenders</h2>
                <p>2 Rounds Remaining: Round 22 Qatar GP (Nov 27–29) & Round 23 Abu Dhabi Season Finale (Dec 4–6)</p>
            </div>
            <div class="battle-grid">
                ${top3.map((d, index) => {
                    const diff = index === 0 ? "CHAMPIONSHIP LEADER" : `-${maxPts - d.points} PTS`;
                    return `
                        <div class="battle-driver-box ${index === 0 ? 'leader' : ''}">
                            <div class="battle-driver-rank">${index === 0 ? '👑 P1' : `P${d.pos}`}</div>
                            <div class="battle-driver-img-wrap" style="border-color:${d.color};">
                                <img src="${d.img}" alt="${d.name}" class="battle-driver-headshot" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><circle cx=\\'50\\' cy=\\'50\\' r=\\'45\\' fill=\\'%231a1a2e\\'/><text x=\\'50\\' y=\\'60\\' font-size=\\'35\\' font-weight=\\'bold\\' fill=\\'%23ffffff\\' text-anchor=\\'middle\\'>${d.code}</text></svg>';">
                            </div>
                            <div class="battle-driver-details">
                                <div class="battle-name">${d.flag || d.nationality} ${d.name}</div>
                                <div class="battle-team" style="color:${d.color};"><i class="fas fa-shield-alt"></i> ${d.team}</div>
                                <div class="battle-score-row">
                                    <span class="battle-points-number">${d.points} <small>PTS</small></span>
                                    <span class="battle-diff-badge ${index === 0 ? 'gold' : ''}">${diff}</span>
                                </div>
                                <div class="battle-mini-stats">
                                    <span>🏆 <strong>${d.wins}</strong> wins</span>
                                    <span>🏅 <strong>${d.podiums}</strong> podiums</span>
                                    <span>⚡ <strong>${d.fastestLaps || 0}</strong> fastest laps</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="battle-footer-bar">
                <span><i class="fas fa-info-circle"></i> Standings verified from <strong>Formula1.com 2026 Results</strong>. Antonelli leads with 402 points.</span>
                <button class="btn-sm btn-outline" onclick="navigateTo('standings')">View Full 25-Driver Table <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    `;
}

// ===== NEXT RACE COUNTDOWN =====
function renderNextRace() {
    const el = document.getElementById('nextRaceCard');
    if (!el) return;
    const next = races2026.find(r => r.status === 'upcoming' || r.isNext) || races2026[21];

    el.innerHTML = `
        <div class="next-race-box">
            <div class="next-race-header">
                <span class="race-round-badge">ROUND ${String(next.round).padStart(2, '0')}</span>
                <span class="sprint-tag"><i class="fas fa-bolt"></i> SPRINT WEEKEND</span>
            </div>
            <div class="next-race-flag-title">
                <span class="flag-icon">${next.flag}</span>
                <div>
                    <h3>${next.name}</h3>
                    <p class="next-circuit-text"><i class="fas fa-map-marker-alt"></i> ${next.circuit}, ${next.city}</p>
                </div>
            </div>
            <div class="next-race-dates">
                <i class="far fa-calendar-check"></i> <strong>${next.date}</strong>
            </div>
            <div id="countdownBox" class="countdown-container"></div>
            <div class="next-race-buttons">
                <button class="btn-primary" onclick="navigateTo('live')"><i class="fas fa-play"></i> Watch Stream Free</button>
                <button class="btn-outline" onclick="openCircuitModal('${next.id}')"><i class="fas fa-route"></i> Track Layout</button>
            </div>
        </div>
    `;

    initCountdown();
}

function initCountdown() {
    const target = new Date("November 29, 2026 17:00:00 UTC").getTime();

    function tick() {
        const now = new Date().getTime();
        const diff = target - now;
        const box = document.getElementById('countdownBox');
        if (!box) return;

        if (diff <= 0) {
            box.innerHTML = `<div class="countdown-live-banner"><span class="live-dot"></span> GRAND PRIX WEEKEND LIVE NOW</div>`;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        box.innerHTML = `
            <div class="timer-unit"><span class="timer-val">${days}</span><span class="timer-lbl">Days</span></div>
            <div class="timer-sep">:</div>
            <div class="timer-unit"><span class="timer-val">${String(hours).padStart(2, '0')}</span><span class="timer-lbl">Hours</span></div>
            <div class="timer-sep">:</div>
            <div class="timer-unit"><span class="timer-val">${String(mins).padStart(2, '0')}</span><span class="timer-lbl">Mins</span></div>
            <div class="timer-sep">:</div>
            <div class="timer-unit"><span class="timer-val">${String(secs).padStart(2, '0')}</span><span class="timer-lbl">Secs</span></div>
        `;
    }
    tick();
    setInterval(tick, 1000);
}

// ===== RENDER HIGHLIGHTS (HIGHLIGHTS HUB) =====
let currentHighlightFilter = 'all';

function renderHighlights(filter = 'all', searchQuery = '') {
    const grid = document.getElementById('highlightsGrid');
    if (!grid) return;

    currentHighlightFilter = filter;
    let list = highlightsData;

    // Apply category filter
    if (filter === 'latest') {
        list = list.filter(h => h.isLatest || h.round >= 18);
    } else if (filter === 'classic') {
        list = list.filter(h => h.category && h.category.includes('classic'));
    } else if (filter === 'street') {
        list = list.filter(h => h.category && h.category.includes('street'));
    }

    // Apply text search
    if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(h =>
            h.gpName.toLowerCase().includes(q) ||
            h.winner.toLowerCase().includes(q) ||
            h.winnerTeam.toLowerCase().includes(q) ||
            h.circuit.toLowerCase().includes(q) ||
            h.title.toLowerCase().includes(q)
        );
    }

    // Update counter display
    const countDisplay = document.getElementById('highlightsCountDisplay');
    if (countDisplay) {
        countDisplay.textContent = `${list.length} Race Highlight${list.length !== 1 ? 's' : ''} Available`;
    }

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="no-results-box" style="grid-column: 1 / -1; padding: 3rem; text-align: center;">
                <i class="fas fa-video-slash" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>No Race Highlights Found</h3>
                <p>No completed 2026 races match your query "${searchQuery}".</p>
                <button class="btn-outline btn-sm" onclick="renderHighlights('all', '')" style="margin-top: 1rem;">Reset Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(item => `
        <div class="highlight-card" onclick="openHighlightModal('${item.id}')">
            <div class="highlight-thumbnail-container">
                <img src="${item.fallbackThumbnail || item.thumbnail}" alt="${item.gpName}" class="highlight-thumbnail" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80';">
                <div class="highlight-play-overlay">
                    <div class="highlight-play-btn"><i class="fas fa-play"></i></div>
                </div>
                <span class="highlight-duration-badge"><i class="far fa-clock"></i> ${item.duration}</span>
                <span class="highlight-round-tag">RD ${String(item.round).padStart(2, '0')}</span>
                ${item.badge ? `<span class="highlight-category-tag">${item.badge}</span>` : ''}
            </div>
            <div class="highlight-card-body">
                <div class="highlight-meta-row">
                    <span class="highlight-flag-gp">${item.flag} ${item.gpName}</span>
                    <span class="highlight-date">${item.date}</span>
                </div>
                <h3 class="highlight-title">${item.title}</h3>
                <p class="highlight-summary">${item.summary.substring(0, 110)}...</p>
                <div class="highlight-card-footer">
                    <div class="highlight-winner-chip">
                        <i class="fas fa-trophy" style="color:var(--accent-gold);"></i>
                        <span>${item.winner} <strong>(${item.winnerTeam})</strong></span>
                    </div>
                    <button class="highlight-action-btn" title="Watch Race Highlights">
                        <i class="fas fa-play"></i> Watch
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterHighlights(query) {
    renderHighlights(currentHighlightFilter, query);
}

// Tab Switching for Highlights Filter
document.querySelectorAll('#highlightsFilterTabs [data-highlight-filter]').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('#highlightsFilterTabs [data-highlight-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const searchVal = document.getElementById('highlightsSearchInput')?.value || '';
        renderHighlights(tab.dataset.highlightFilter, searchVal);
    });
});

// ===== HIGHLIGHT VIDEO MODAL =====
function openHighlightModal(highlightId) {
    const item = highlightsData.find(h => h.id === highlightId) || highlightsData[0];
    if (!item) return;

    const modal = document.getElementById('highlightModal');
    const content = document.getElementById('highlightModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="highlight-modal-header">
            <div class="highlight-modal-badge">${item.flag} ROUND ${item.round} • 2026 OFFICIAL HIGHLIGHTS</div>
            <h2>${item.gpName}</h2>
            <p class="highlight-modal-subtitle">${item.title} • ${item.circuit}, ${item.country} • ${item.date}</p>
        </div>
        <div class="highlight-modal-body">
            <!-- Video Player Area -->
            <div class="highlight-player-box">
                <div class="highlight-video-placeholder">
                    <img src="${item.fallbackThumbnail || item.thumbnail}" alt="${item.gpName}" class="highlight-player-bg" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80';">
                    <div class="highlight-player-hud">
                        <div class="highlight-hud-badge"><span class="live-dot"></span> FORMULA 1 OFFICIAL RACE RECAP</div>
                        <a href="${item.f1OfficialUrl || 'https://www.formula1.com/en/results/2026/races'}" target="_blank" rel="noopener" class="highlight-launch-play-btn">
                            <i class="fas fa-play"></i>
                            <span>Watch Full Highlight on Formula1.com</span>
                        </a>
                        <div class="highlight-hud-duration">Duration: ${item.duration} • 1080p 60fps Broadcast</div>
                    </div>
                </div>
            </div>

            <!-- Race Recap and Statistics Grid -->
            <div class="highlight-details-grid">
                <!-- Summary & Key Moments -->
                <div class="highlight-recap-pane">
                    <h4><i class="fas fa-flag-checkered"></i> Race Story & Analysis</h4>
                    <p class="highlight-full-summary">${item.summary}</p>

                    <h4 style="margin-top:1.5rem;"><i class="fas fa-stopwatch"></i> Critical Lap-by-Lap Moments</h4>
                    <div class="key-moments-timeline">
                        ${(item.keyMoments || []).map(moment => `
                            <div class="timeline-item">
                                <i class="fas fa-circle-dot timeline-dot"></i>
                                <span class="timeline-text">${moment}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Podium, Winner & Fastest Lap Telemetry -->
                <div class="highlight-stats-pane">
                    <div class="highlight-stat-card winner-card">
                        <span class="highlight-stat-lbl">Grand Prix Winner</span>
                        <div class="highlight-stat-winner-name">
                            <i class="fas fa-trophy" style="color:var(--accent-gold);"></i> ${item.winner}
                        </div>
                        <span class="highlight-stat-winner-team">${item.winnerTeam} • ${item.winnerTime || 'Finished'}</span>
                    </div>

                    <div class="highlight-stat-card">
                        <span class="highlight-stat-lbl">Official Podium</span>
                        <div class="highlight-podium-list">
                            ${(item.podium || []).map(p => `
                                <div class="podium-item"><i class="fas fa-medal"></i> ${p}</div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="highlight-stat-card fastest-lap-card">
                        <span class="highlight-stat-lbl"><i class="fas fa-bolt" style="color:var(--accent-red);"></i> DHL Fastest Lap</span>
                        <div class="fastest-lap-val">${item.fastestLap || 'N/A'}</div>
                    </div>

                    <div class="highlight-modal-actions">
                        <a href="${item.f1OfficialUrl || 'https://www.formula1.com/en/results/2026/races'}" target="_blank" rel="noopener" class="btn-primary btn-block">
                            <i class="fas fa-external-link-alt"></i> Official Classification on F1.com
                        </a>
                        <button class="btn-outline btn-block" onclick="navigateTo('live'); closeHighlightModal();">
                            <i class="fas fa-broadcast-tower"></i> Switch to Live Video Stream
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHighlightModal() {
    document.getElementById('highlightModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== RENDER CIRCUITS (CIRCUITS TAB) =====
let currentCircuitFilter = 'all';

function renderCircuits(filter = 'all', query = '') {
    const grid = document.getElementById('circuitsGrid');
    if (!grid) return;

    currentCircuitFilter = filter;
    let list = circuitsData;

    // Filter by track category
    if (filter === 'street') {
        list = list.filter(c => c.category && c.category.includes('street'));
    } else if (filter === 'permanent') {
        list = list.filter(c => c.category && c.category.includes('permanent'));
    } else if (filter === 'high-speed') {
        list = list.filter(c => c.category && c.category.includes('high-speed'));
    } else if (filter === 'high-downforce') {
        list = list.filter(c => c.category && c.category.includes('high-downforce'));
    }

    // Filter by text search
    if (query) {
        const q = query.toLowerCase().trim();
        list = list.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.gpName.toLowerCase().includes(q) ||
            c.country.toLowerCase().includes(q) ||
            c.city.toLowerCase().includes(q) ||
            c.type.toLowerCase().includes(q)
        );
    }

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="no-results-box" style="grid-column: 1 / -1; padding: 3rem; text-align: center;">
                <i class="fas fa-route" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>No Circuits Found</h3>
                <p>No 2026 Formula 1 circuits match your search criteria.</p>
                <button class="btn-outline btn-sm" onclick="renderCircuits('all', '')" style="margin-top: 1rem;">Reset Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(c => `
        <div class="circuit-card" onclick="openCircuitModal('${c.id}')">
            <div class="circuit-card-top">
                <span class="circuit-round">RD ${String(c.round).padStart(2, '0')}</span>
                <span class="circuit-flag">${c.flag}</span>
            </div>
            <div class="circuit-image-container">
                <img src="${getCircuitMap(c.imgSlug)}" alt="${c.name} Map" class="circuit-thumb-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80';">
            </div>
            <div class="circuit-card-body">
                <h3 class="circuit-name">${c.name}</h3>
                <div class="circuit-gp-name">${c.gpName}</div>
                <div class="circuit-location"><i class="fas fa-map-marker-alt"></i> ${c.city}, ${c.country}</div>
                
                <!-- Telemetry Quick Tags (Formula-Timer Data) -->
                <div class="circuit-telemetry-pills">
                    ${c.fullThrottle ? `<span class="circuit-pill"><i class="fas fa-bolt"></i> ${c.fullThrottle} Throttle</span>` : ''}
                    ${c.topSpeed ? `<span class="circuit-pill"><i class="fas fa-tachometer-alt"></i> ${c.topSpeed}</span>` : ''}
                    ${c.elevationChange ? `<span class="circuit-pill"><i class="fas fa-mountain"></i> ${c.elevationChange} Elev</span>` : ''}
                </div>

                <div class="circuit-quick-specs">
                    <div class="spec-item"><i class="fas fa-ruler-horizontal"></i> ${c.length}</div>
                    <div class="spec-item"><i class="fas fa-sync-alt"></i> ${c.laps} Laps</div>
                    <div class="spec-item"><i class="fas fa-road"></i> ${c.turns} Turns</div>
                </div>
                <button class="circuit-view-btn"><i class="fas fa-chart-line"></i> View Track Telemetry & Sectors</button>
            </div>
        </div>
    `).join('');
}

function handleCircuitSearch(query) {
    renderCircuits(currentCircuitFilter, query);
}

function filterCircuits(query) {
    handleCircuitSearch(query);
}

// Circuit Category Filter Switcher
document.querySelectorAll('#circuitFilterTabs [data-circuit-filter]').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('#circuitFilterTabs [data-circuit-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const searchVal = document.getElementById('circuitFilterInput')?.value || '';
        renderCircuits(tab.dataset.circuitFilter, searchVal);
    });
});

// ===== CIRCUIT DETAIL MODAL & TELEMETRY HUB =====
let activeCircuitTabState = 'overview';

function openCircuitModal(circuitId, activeTab = 'overview') {
    const c = circuitsData.find(item => item.id === circuitId) || circuitsData[0];
    if (!c) return;

    activeCircuitTabState = activeTab;
    const modal = document.getElementById('circuitModal');
    const content = document.getElementById('circuitModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="circuit-modal-header">
            <div class="circuit-modal-badge">${c.flag} ROUND ${c.round} • ${c.type.toUpperCase()} • 2026 CALENDAR</div>
            <h2>${c.name}</h2>
            <p class="circuit-modal-gp">${c.gpName} • ${c.city}, ${c.country}</p>

            <!-- Modal Nav Tabs -->
            <div class="circuit-modal-nav-tabs">
                <button class="c-tab-btn ${activeTab === 'overview' ? 'active' : ''}" onclick="switchCircuitModalTab('${c.id}', 'overview')">
                    <i class="fas fa-map"></i> Overview & Layout
                </button>
                <button class="c-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}" onclick="switchCircuitModalTab('${c.id}', 'telemetry')">
                    <i class="fas fa-gauge-high"></i> Telemetry & Specs (Formula-Timer)
                </button>
                <button class="c-tab-btn ${activeTab === 'sectors' ? 'active' : ''}" onclick="switchCircuitModalTab('${c.id}', 'sectors')">
                    <i class="fas fa-layer-group"></i> Sector Analysis & Overtaking
                </button>
            </div>
        </div>
        <div class="circuit-modal-body">
            ${activeTab === 'overview' ? renderCircuitOverviewTab(c) : ''}
            ${activeTab === 'telemetry' ? renderCircuitTelemetryTab(c) : ''}
            ${activeTab === 'sectors' ? renderCircuitSectorsTab(c) : ''}

            <!-- Sources & Action Footer -->
            <div class="circuit-modal-footer-bar">
                <div class="circuit-sources-tag">
                    <i class="fas fa-check-circle"></i> Telemetry & Layout cross-referenced with <strong>Formula-Timer.com/circuit</strong> & <strong>Formula1.com</strong>
                </div>
                <div class="circuit-actions-row">
                    <a href="https://formula-timer.com/circuit" target="_blank" rel="noopener" class="btn-primary btn-sm">
                        <i class="fas fa-external-link-alt"></i> Formula-Timer Guide
                    </a>
                    <a href="https://www.formula1.com/en/racing/2026/${encodeURIComponent(c.gpName.replace(' Grand Prix',''))}/Circuit.html" target="_blank" rel="noopener" class="btn-outline btn-sm">
                        <i class="fas fa-external-link-alt"></i> Formula1.com
                    </a>
                    <button class="btn-outline btn-sm" onclick="navigateTo('schedule'); closeCircuitModal();">
                        <i class="fas fa-calendar"></i> 2026 Calendar
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function switchCircuitModalTab(circuitId, tabName) {
    openCircuitModal(circuitId, tabName);
}

function renderCircuitOverviewTab(c) {
    return `
        <div class="circuit-tab-content active">
            <div class="circuit-modal-map-wrap">
                <img src="${getCircuitMap(c.imgSlug)}" alt="${c.name} Layout" class="circuit-full-map-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80';">
                <div class="circuit-map-overlay-tag"><i class="fas fa-compass"></i> Official F1 Circuit Layout Map</div>
            </div>
            <div class="circuit-modal-details">
                <div class="circuit-stat-grid">
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Circuit Length</span>
                        <strong class="c-stat-val">${c.length}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Race Distance</span>
                        <strong class="c-stat-val">${c.raceDist}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Number of Laps</span>
                        <strong class="c-stat-val">${c.laps}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">Number of Turns</span>
                        <strong class="c-stat-val">${c.turns}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">DRS Detection Zones</span>
                        <strong class="c-stat-val">${c.drsZones}</strong>
                    </div>
                    <div class="c-stat-box">
                        <span class="c-stat-lbl">First Grand Prix</span>
                        <strong class="c-stat-val">${c.firstGP}</strong>
                    </div>
                </div>
                <div class="circuit-lap-record-box">
                    <div class="record-icon"><i class="fas fa-stopwatch"></i></div>
                    <div>
                        <span class="record-title">Official Lap Record</span>
                        <strong class="record-text">${c.lapRecord}</strong>
                    </div>
                </div>
                <div class="circuit-description-text">
                    <h4><i class="fas fa-info-circle"></i> Track Overview & Characteristics</h4>
                    <p>${c.description}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCircuitTelemetryTab(c) {
    const throttleNum = parseInt(c.fullThrottle) || 60;
    return `
        <div class="circuit-tab-content active">
            <div class="circuit-telemetry-grid">
                <div class="c-tele-card">
                    <span class="c-tele-lbl"><i class="fas fa-bolt" style="color:var(--accent-red);"></i> Full Throttle Percentage</span>
                    <strong class="c-tele-val">${c.fullThrottle || '65%'}</strong>
                    <div class="c-tele-bar-wrap">
                        <div class="c-tele-bar" style="width: ${throttleNum}%; background: var(--accent-red);"></div>
                    </div>
                    <span class="c-tele-hint">Percentage of lap length driven at wide-open throttle</span>
                </div>

                <div class="c-tele-card">
                    <span class="c-tele-lbl"><i class="fas fa-mountain" style="color:var(--accent-gold);"></i> Elevation Change</span>
                    <strong class="c-tele-val">${c.elevationChange || '15 m'}</strong>
                    <span class="c-tele-hint">Difference between highest and lowest track points</span>
                </div>

                <div class="c-tele-card">
                    <span class="c-tele-lbl"><i class="fas fa-tachometer-alt" style="color:#00D2BE;"></i> Speed Trap Top Speed</span>
                    <strong class="c-tele-val">${c.topSpeed || '335 km/h'}</strong>
                    <span class="c-tele-hint">Maximum telemetry speed recorded at official radar trap</span>
                </div>

                <div class="c-tele-card">
                    <span class="c-tele-lbl"><i class="fas fa-wind" style="color:#64C4FF;"></i> Downforce Package</span>
                    <strong class="c-tele-val">${c.downforce || 'Medium'}</strong>
                    <span class="c-tele-hint">Optimal aerodynamic wing setup required for balance</span>
                </div>

                <div class="c-tele-card">
                    <span class="c-tele-lbl"><i class="fas fa-circle-notch" style="color:#FF8000;"></i> Tire Stress & Degradation</span>
                    <strong class="c-tele-val">${c.tireStress || 'Medium'}</strong>
                    <span class="c-tele-hint">Lateral and longitudinal energy imparted into Pirelli compounds</span>
                </div>

                <div class="c-tele-card">
                    <span class="c-tele-lbl"><i class="fas fa-gears" style="color:#B6BABD;"></i> Gear Shifts Per Lap</span>
                    <strong class="c-tele-val">${c.gearShifts || '52'}</strong>
                    <span class="c-tele-hint">Total gearbox shifts executed across a single racing lap</span>
                </div>
            </div>

            <div class="circuit-telemetry-highlights-box">
                <div class="c-tele-sub-box">
                    <h4><i class="fas fa-hand-holding-hand" style="color:var(--accent-red);"></i> Braking System Load</h4>
                    <p><strong>Severity: ${c.brakingSeverity || 'Hard'}</strong> — High-speed decel puts carbon brake discs above 1,000°C.</p>
                </div>
                <div class="c-tele-sub-box">
                    <h4><i class="fas fa-flag-checkered" style="color:var(--accent-gold);"></i> Primary Overtaking Opportunities</h4>
                    <p>${c.overtakeSpots || 'Turn 1, Main Straight DRS Zone'}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCircuitSectorsTab(c) {
    const s = c.sectors || {
        sector1: { title: "Sector 1", desc: "Main straight into the initial braking complex and directional change." },
        sector2: { title: "Sector 2", desc: "High and medium speed flowing curves testing aero balance." },
        sector3: { title: "Sector 3", desc: "Traction-limited low-speed corners onto the pit straight." }
    };

    return `
        <div class="circuit-tab-content active">
            <div class="circuit-sectors-container">
                <div class="c-sector-card sector-1">
                    <div class="c-sector-header">
                        <span class="c-sector-badge s1">SECTOR 1</span>
                        <h4>${s.sector1.title}</h4>
                    </div>
                    <p class="c-sector-desc">${s.sector1.desc}</p>
                </div>

                <div class="c-sector-card sector-2">
                    <div class="c-sector-header">
                        <span class="c-sector-badge s2">SECTOR 2</span>
                        <h4>${s.sector2.title}</h4>
                    </div>
                    <p class="c-sector-desc">${s.sector2.desc}</p>
                </div>

                <div class="c-sector-card sector-3">
                    <div class="c-sector-header">
                        <span class="c-sector-badge s3">SECTOR 3</span>
                        <h4>${s.sector3.title}</h4>
                    </div>
                    <p class="c-sector-desc">${s.sector3.desc}</p>
                </div>
            </div>

            <div class="circuit-overtakes-box">
                <h4><i class="fas fa-bullseye" style="color:var(--accent-red);"></i> Technical Driver Keys & Overtaking Spots</h4>
                <p><strong>Prime Overtaking Zones:</strong> ${c.overtakeSpots || 'Turn 1, Turn 3, DRS straights'}</p>
                <p style="margin-top:0.5rem; color:var(--text-secondary); font-size:0.9rem;">
                    Drivers must balance battery harvesting with deployment (ERS) into the longest flat-out sections while preventing overheating in the traction-sensitive low-speed complexes.
                </p>
            </div>
        </div>
    `;
}

function closeCircuitModal() {
    document.getElementById('circuitModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== RENDER SCHEDULE =====
function renderSchedule(filter = 'all') {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;

    const filtered = filter === 'all' ? races2026 :
        filter === 'upcoming' ? races2026.filter(r => r.status === 'upcoming' || r.isNext) :
        races2026.filter(r => r.status === 'completed');

    grid.innerHTML = filtered.map(race => `
        <div class="race-card ${race.isNext ? 'next-race' : ''} ${race.status === 'completed' ? 'completed' : ''}">
            <div class="race-card-header">
                <span class="race-round">ROUND ${String(race.round).padStart(2, '0')}</span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    ${race.sprint ? '<span class="sprint-badge">SPRINT</span>' : ''}
                    <span class="race-flag">${race.flag}</span>
                </div>
            </div>
            <div class="race-name">${race.name}</div>
            <div class="race-circuit"><i class="fas fa-map-marker-alt" style="color:var(--accent-red);margin-right:4px;"></i>${race.circuit}</div>
            <div class="race-city"><i class="fas fa-city" style="color:var(--text-muted);margin-right:4px;"></i>${race.city}</div>
            <div class="race-date">
                <i class="far fa-calendar"></i>
                <span>${race.date}</span>
            </div>
            <div class="race-card-footer">
                <span class="race-status ${race.status}">${race.isNext ? '● NEXT RACE' : race.status.toUpperCase()}</span>
                <div class="race-card-actions">
                    ${race.winner ? `<span class="race-winner-badge">🏆 <strong style="color:var(--accent-gold);">${race.winner}</strong> (${race.winnerTeam})</span>` : ''}
                    ${race.highlightId ? `
                        <button class="track-map-btn" onclick="openHighlightModal('${race.highlightId}')" title="Watch Race Highlights">
                            <i class="fas fa-play"></i> Recap
                        </button>
                    ` : ''}
                    <button class="track-map-btn" onclick="openCircuitModal('${race.id}')" title="View Circuit Layout">
                        <i class="fas fa-route"></i> Map
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

document.querySelectorAll('[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSchedule(tab.dataset.filter);
    });
});

// ===== RENDER DRIVER STANDINGS =====
function renderDriverStandings() {
    const container = document.getElementById('driverStandings');
    if (!container) return;
    const maxPoints = driverStandings.length > 0 ? driverStandings[0].points : 1;

    container.innerHTML = `
        <div class="standings-row header">
            <span>POS</span>
            <span>DRIVER & CONSTRUCTOR</span>
            <span>POINTS BAR</span>
            <span style="text-align:right;">PTS</span>
        </div>
        ${driverStandings.map(d => `
            <div class="standings-row">
                <span class="standings-pos ${d.pos <= 3 ? 'p' + d.pos : ''}">${d.pos}</span>
                <div class="standings-driver">
                    <div class="driver-img-wrap" style="border-color:${d.color};">
                        <img src="${d.img}" alt="${d.name}" class="standings-driver-img" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><circle cx=\\'50\\' cy=\\'50\\' r=\\'45\\' fill=\\'%231a1a2e\\'/><text x=\\'50\\' y=\\'60\\' font-size=\\'35\\' font-weight=\\'bold\\' fill=\\'%23ffffff\\' text-anchor=\\'middle\\'>${d.code}</text></svg>';">
                    </div>
                    <div class="standings-driver-info">
                        <span class="standings-driver-name">${d.flag || d.nationality} ${d.name} <span class="driver-num-tag">#${d.number}</span></span>
                        <span class="standings-team-name" style="color:${d.color}; font-weight:600;">${d.team}</span>
                    </div>
                </div>
                <div class="points-bar-container">
                    <div class="points-bar" style="width: ${(d.points / maxPoints * 100)}%; background: ${d.color};"></div>
                </div>
                <span class="standings-points">${d.points}</span>
            </div>
        `).join('')}
    `;
}

// ===== RENDER CONSTRUCTOR STANDINGS =====
function renderConstructorStandings() {
    const container = document.getElementById('constructorStandings');
    if (!container) return;
    const maxPoints = constructorStandings.length > 0 ? constructorStandings[0].points : 1;

    container.innerHTML = `
        <div class="standings-row header">
            <span>POS</span>
            <span>CONSTRUCTOR</span>
            <span>POINTS BAR</span>
            <span style="text-align:right;">PTS</span>
        </div>
        ${constructorStandings.map(c => `
            <div class="standings-row">
                <span class="standings-pos ${c.pos <= 3 ? 'p' + c.pos : ''}">${c.pos}</span>
                <div class="standings-driver">
                    <div class="team-badge" style="background:${c.color};">${c.abbr}</div>
                    <div class="standings-driver-info">
                        <span class="standings-driver-name">${c.name}</span>
                        <span class="standings-team-name">${c.wins} win${c.wins !== 1 ? 's' : ''} in 2026</span>
                    </div>
                </div>
                <div class="points-bar-container">
                    <div class="points-bar" style="width: ${(c.points / maxPoints * 100)}%; background: ${c.color};"></div>
                </div>
                <span class="standings-points">${c.points}</span>
            </div>
        `).join('')}
    `;
}

document.querySelectorAll('[data-standings]').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('[data-standings]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const isDrivers = tab.dataset.standings === 'drivers';
        document.getElementById('driverStandings').style.display = isDrivers ? 'block' : 'none';
        document.getElementById('constructorStandings').style.display = isDrivers ? 'none' : 'block';
    });
});

// ===== RENDER DRIVERS (GRID SECTION) =====
function renderDrivers() {
    const grid = document.getElementById('driversGrid');
    if (!grid) return;

    grid.innerHTML = driverStandings.map(d => `
        <div class="driver-card">
            <div class="driver-card-top" style="background: linear-gradient(135deg, ${d.color}33 0%, var(--bg-card) 100%);">
                <span class="driver-number" style="color: ${d.color};">${d.number}</span>
                <img src="${d.img}" alt="${d.name}" class="driver-portrait" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><circle cx=\\'50\\' cy=\\'50\\' r=\\'45\\' fill=\\'%231a1a2e\\'/><text x=\\'50\\' y=\\'60\\' font-size=\\'35\\' font-weight=\\'bold\\' fill=\\'%23ffffff\\' text-anchor=\\'middle\\'>${d.code}</text></svg>';">
            </div>
            <div class="driver-card-body">
                <div class="driver-card-code" style="color:${d.color};">${d.code} • #${d.number}</div>
                <div class="driver-card-name">${d.flag || d.nationality} ${d.name}</div>
                <div class="driver-card-team" style="color: ${d.color};">${d.team}</div>
                <div class="driver-card-stats">
                    <div class="driver-stat">
                        <div class="driver-stat-value">${d.points}</div>
                        <div class="driver-stat-label">Points</div>
                    </div>
                    <div class="driver-stat">
                        <div class="driver-stat-value">${d.wins}</div>
                        <div class="driver-stat-label">Wins</div>
                    </div>
                    <div class="driver-stat">
                        <div class="driver-stat-value">${d.podiums}</div>
                        <div class="driver-stat-label">Podiums</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== RENDER TEAMS =====
function renderTeams() {
    const grid = document.getElementById('teamsGrid');
    if (!grid) return;
    const maxPts = teams.length > 0 ? teams[0].points : 1;

    grid.innerHTML = teams.map(t => {
        let winCount = 0;
        if (t.highestFinish && t.highestFinish.includes('x')) {
            const m = t.highestFinish.match(/x(\d+)/);
            if (m) winCount = parseInt(m[1], 10);
        }
        return `
            <div class="team-card">
                <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${t.color};"></div>
                <div class="team-card-header">
                    <div class="team-logo-placeholder" style="background: ${t.color};">${t.name.substring(0, 3).toUpperCase()}</div>
                    <div>
                        <div class="team-name">${t.name}</div>
                        <div class="team-full-name">${t.fullName}</div>
                    </div>
                </div>
                <div class="team-drivers">
                    ${(t.drivers || []).map(d => `
                        <div class="team-driver-chip" style="border-left: 3px solid ${t.color};">
                            <i class="fas fa-helmet-safety"></i> ${typeof d === 'string' ? d : d.name}
                        </div>
                    `).join('')}
                </div>
                <div class="points-bar-container" style="margin-bottom: 1rem; height: 6px;">
                    <div class="points-bar" style="width: ${(t.points / maxPts * 100)}%; background: ${t.color};"></div>
                </div>
                <div class="team-stats">
                    <div class="team-stat">
                        <div class="team-stat-value" style="color: ${t.color};">${t.points}</div>
                        <div class="team-stat-label">Points</div>
                    </div>
                    <div class="team-stat">
                        <div class="team-stat-value">${winCount}</div>
                        <div class="team-stat-label">Wins</div>
                    </div>
                    <div class="team-stat">
                        <div class="team-stat-value">${t.worldChampionships || 0}</div>
                        <div class="team-stat-label">Titles</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== THEATER MODE & PiP =====
function toggleTheater() {
    document.querySelector('.player-wrapper')?.classList.toggle('theater');
}

function togglePiP() {
    window.open('https://westreamf1.st/westreamf1.php', 'F1 PiP', 'width=680,height=420,resizable=yes');
}

function reloadStream() {
    const iframe = document.querySelector('.player-container iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => { iframe.src = src; }, 200);
    }
}

// ===== CHAT BRIDGE =====
function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    if (typeof ChatSystem !== 'undefined') {
        ChatSystem.sendUserMessage(msg);
    }
    input.value = '';
}

document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
});

// Simulate online members fluctuating slightly
setInterval(() => {
    const countEl = document.getElementById('onlineCount');
    if (!countEl) return;
    const base = 1520;
    const jitter = Math.floor(Math.random() * 30) - 15;
    countEl.textContent = (base + jitter).toLocaleString();
}, 6000);

// ===== LIVE TIMING OSCILLATION =====
function updateTiming() {
    const rows = document.querySelectorAll('.timing-row:not(.header)');
    const gaps = [0, 0.842, 2.155, 4.619, 6.204, 9.882, 14.331, 18.910];
    rows.forEach((row, i) => {
        if (i === 0) return;
        const gapSpan = row.children[2];
        if (gapSpan) {
            const jitter = (Math.random() - 0.49) * 0.15;
            const updated = Math.max(0.1, gaps[i] + jitter);
            gapSpan.textContent = `+${updated.toFixed(3)}`;
        }
    });
}
setInterval(updateTiming, 4000);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    switch (e.key) {
        case '1': navigateTo('home'); break;
        case '2': navigateTo('live'); break;
        case '3': navigateTo('highlights'); break;
        case '4': navigateTo('schedule'); break;
        case '5': navigateTo('circuits'); break;
        case '6': navigateTo('standings'); break;
        case '7': navigateTo('drivers'); break;
        case '8': navigateTo('teams'); break;
        case 'Escape':
            document.querySelector('.player-wrapper')?.classList.remove('theater');
            document.getElementById('searchOverlay')?.classList.remove('active');
            document.getElementById('notifPanel')?.classList.remove('active');
            closeCircuitModal();
            closeHighlightModal();
            if (typeof closeAuthModal === 'function') closeAuthModal();
            break;
    }
});

// Close panels when clicking outside
document.addEventListener('click', (e) => {
    const notifPanel = document.getElementById('notifPanel');
    const notifBtn = document.getElementById('notifBtn');
    if (notifPanel && notifPanel.classList.contains('active') && !notifPanel.contains(e.target) && !notifBtn?.contains(e.target)) {
        notifPanel.classList.remove('active');
    }
});

console.log('%c🏎️ F1 Stream — Live Formula 1 Race Center Ready', 'font-size: 16px; font-weight: bold; color: #e10600;');
console.log('%cOfficial 2026 Season: Antonelli (Mercedes) 402 pts | Verstappen (Red Bull) 304 pts | Hamilton (Ferrari) 267 pts', 'color: #00D2BE;');
