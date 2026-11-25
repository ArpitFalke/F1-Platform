// ==========================================
// F1 STREAM — Real-Time Paddock Chat System
// 100% Real Users Only (Zero Bots)
// Supports multi-tab live discussion via BroadcastChannel & localStorage
// Created by ArpitFalke (https://github.com/ArpitFalke)
// ==========================================

const ChatSystem = {
    STORAGE_PREFIX: 'f1stream_real_chat_v2_',
    CHANNEL_NAME: 'f1stream_live_chat_channel',
    MAX_MESSAGES: 250,
    currentRoom: 'main-race',
    channel: null,
    tabId: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    activePeers: new Map(),
    typingUsers: new Map(),
    typingTimeout: null,
    presenceInterval: null,

    getStorageKey() {
        return `${this.STORAGE_PREFIX}${this.currentRoom}`;
    },

    getMessages() {
        try {
            return JSON.parse(localStorage.getItem(this.getStorageKey()) || '[]');
        } catch {
            return [];
        }
    },

    saveMessages(messages) {
        if (messages.length > this.MAX_MESSAGES) {
            messages = messages.slice(-this.MAX_MESSAGES);
        }
        try {
            localStorage.setItem(this.getStorageKey(), JSON.stringify(messages));
        } catch (e) {
            console.warn('Could not persist chat messages:', e);
        }
    },

    init() {
        // Remove legacy bot chat cache if present
        if (localStorage.getItem('f1stream_chat')) {
            localStorage.removeItem('f1stream_chat');
        }

        // Restore saved room if functional cookies allowed
        const savedRoom = localStorage.getItem('f1stream_chat_room');
        if (savedRoom) {
            this.currentRoom = savedRoom;
        }

        this.setupRealtimeSync();
        this.renderRoomControls();
        this.renderAll();
        this.startPresenceHeartbeat();
    },

    setupRealtimeSync() {
        // Close existing channel if re-initializing
        if (this.channel) {
            try { this.channel.close(); } catch {}
        }

        if (typeof BroadcastChannel !== 'undefined') {
            this.channel = new BroadcastChannel(this.CHANNEL_NAME);
            this.channel.onmessage = (event) => {
                const payload = event.data;
                if (!payload || payload.tabId === this.tabId) return;

                if (payload.type === 'new_message' && payload.room === this.currentRoom) {
                    this.renderNewMessage(payload.message);
                    this.typingUsers.delete(payload.message.username);
                    this.renderTypingIndicator();
                } else if (payload.type === 'clear_room' && payload.room === this.currentRoom) {
                    this.renderAll();
                } else if (payload.type === 'typing' && payload.room === this.currentRoom) {
                    this.typingUsers.set(payload.username, Date.now());
                    this.renderTypingIndicator();
                } else if (payload.type === 'presence_ping') {
                    this.activePeers.set(payload.tabId, {
                        username: payload.username || 'Viewer',
                        lastSeen: Date.now()
                    });
                    this.updateOnlineCount();
                } else if (payload.type === 'presence_leave') {
                    this.activePeers.delete(payload.tabId);
                    this.updateOnlineCount();
                }
            };
        }

        // Fallback sync across tabs via storage event
        window.addEventListener('storage', (e) => {
            if (e.key === this.getStorageKey()) {
                this.renderAll();
            }
        });

        window.addEventListener('beforeunload', () => {
            this.broadcast({ type: 'presence_leave', tabId: this.tabId });
        });
    },

    broadcast(data) {
        if (this.channel) {
            try {
                this.channel.postMessage(data);
            } catch {}
        }
    },

    startPresenceHeartbeat() {
        if (this.presenceInterval) clearInterval(this.presenceInterval);
        this.activePeers.set(this.tabId, { username: this.getCurrentUsername(), lastSeen: Date.now() });
        this.updateOnlineCount();

        const ping = () => {
            const now = Date.now();
            this.activePeers.set(this.tabId, { username: this.getCurrentUsername(), lastSeen: now });
            // Prune peers silent for > 8s
            for (const [id, info] of this.activePeers.entries()) {
                if (id !== this.tabId && now - info.lastSeen > 8000) {
                    this.activePeers.delete(id);
                }
            }
            // Prune stale typing indicators > 3s
            let typingChanged = false;
            for (const [user, ts] of this.typingUsers.entries()) {
                if (now - ts > 3000) {
                    this.typingUsers.delete(user);
                    typingChanged = true;
                }
            }
            if (typingChanged) this.renderTypingIndicator();

            this.broadcast({
                type: 'presence_ping',
                tabId: this.tabId,
                username: this.getCurrentUsername()
            });
            this.updateOnlineCount();
        };

        ping();
        this.presenceInterval = setInterval(ping, 2500);
    },

    getCurrentUsername() {
        const session = typeof AuthSystem !== 'undefined' ? AuthSystem.getSession() : null;
        return session ? session.username : 'Guest';
    },

    updateOnlineCount() {
        const countEl = document.getElementById('onlineCount');
        if (!countEl) return;
        const count = Math.max(1, this.activePeers.size);
        countEl.textContent = count;
    },

    switchRoom(roomName) {
        const cleanRoom = (roomName || 'main-race').trim().toLowerCase().replace(/[^a-z0-9-_]/g, '') || 'main-race';
        this.currentRoom = cleanRoom;
        localStorage.setItem('f1stream_chat_room', cleanRoom);
        this.typingUsers.clear();
        this.renderTypingIndicator();
        this.renderRoomControls();
        this.renderAll();
    },

    renderRoomControls() {
        const roomBadge = document.getElementById('chatRoomSelect');
        if (roomBadge) {
            roomBadge.value = this.currentRoom;
        }
        const roomLabel = document.getElementById('activeRoomLabel');
        if (roomLabel) {
            roomLabel.textContent = `#${this.currentRoom}`;
        }
    },

    addMessage(username, text, color, favTeam = '', userId = '') {
        const messages = this.getMessages();
        const msg = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            username,
            userId,
            favTeam,
            text,
            color: color || '#e10600',
            timestamp: Date.now()
        };
        messages.push(msg);
        this.saveMessages(messages);
        this.renderNewMessage(msg);

        this.broadcast({
            type: 'new_message',
            tabId: this.tabId,
            room: this.currentRoom,
            message: msg
        });
        return msg;
    },

    sendUserMessage(text) {
        const session = typeof AuthSystem !== 'undefined' ? AuthSystem.getSession() : null;
        if (!session) {
            if (typeof openAuthModal === 'function') openAuthModal('login');
            return;
        }
        const clean = (text || '').trim();
        if (!clean) return;

        this.addMessage(session.username, clean, session.chatColor, session.favTeam || '', session.id);
    },

    notifyTyping() {
        const session = typeof AuthSystem !== 'undefined' ? AuthSystem.getSession() : null;
        if (!session) return;
        this.broadcast({
            type: 'typing',
            tabId: this.tabId,
            room: this.currentRoom,
            username: session.username
        });
    },

    renderTypingIndicator() {
        const el = document.getElementById('chatTypingIndicator');
        if (!el) return;
        const users = Array.from(this.typingUsers.keys());
        if (users.length === 0) {
            el.innerHTML = '';
            el.style.display = 'none';
            return;
        }
        const text = users.length === 1
            ? `${this.escapeHtml(users[0])} is typing...`
            : `${users.slice(0, 2).map(u => this.escapeHtml(u)).join(', ')} are typing...`;
        el.innerHTML = `<span class="typing-dots"><i></i><i></i><i></i></span> ${text}`;
        el.style.display = 'flex';
    },

    insertEmoji(emoji) {
        const input = document.getElementById('chatInput');
        if (!input) {
            if (typeof openAuthModal === 'function') openAuthModal('login');
            return;
        }
        input.value = (input.value + ' ' + emoji).trimStart();
        input.focus();
    },

    clearRoomChat() {
        localStorage.removeItem(this.getStorageKey());
        this.renderAll();
        this.broadcast({
            type: 'clear_room',
            tabId: this.tabId,
            room: this.currentRoom
        });
    },

    openFriendTabHelper() {
        window.open(window.location.href, '_blank');
    },

    renderNewMessage(msg) {
        const chatBox = document.getElementById('chatBox');
        if (!chatBox) return;

        // Remove empty state if present
        const emptyState = chatBox.querySelector('.chat-empty-state');
        if (emptyState) emptyState.remove();

        // Prevent duplicate DOM entry if already rendered
        if (chatBox.querySelector(`[data-msg-id="${msg.id}"]`)) return;

        const session = typeof AuthSystem !== 'undefined' ? AuthSystem.getSession() : null;
        const isOwn = session && (session.id === msg.userId || session.username === msg.username);

        const div = document.createElement('div');
        div.className = `chat-msg ${isOwn ? 'chat-msg-user' : ''} chat-msg-new`;
        div.dataset.msgId = msg.id;
        div.innerHTML = `
            <div class="chat-msg-avatar" style="background: ${msg.color};">${msg.username[0].toUpperCase()}</div>
            <div class="chat-msg-body">
                <div class="chat-user-row">
                    <span class="chat-username" style="color: ${msg.color};">${this.escapeHtml(msg.username)}</span>
                    ${msg.favTeam ? `<span class="chat-team-flair">${this.escapeHtml(msg.favTeam)}</span>` : ''}
                    ${isOwn ? '<span class="chat-you-badge">YOU</span>' : ''}
                </div>
                <span class="chat-text">${this.escapeHtml(msg.text)}</span>
            </div>
            <span class="chat-time">${this.formatTime(msg.timestamp)}</span>
        `;
        chatBox.appendChild(div);
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });

        while (chatBox.children.length > 100) {
            chatBox.removeChild(chatBox.firstChild);
        }
    },

    renderAll() {
        const chatBox = document.getElementById('chatBox');
        if (!chatBox) return;

        chatBox.innerHTML = '';
        const messages = this.getMessages();

        if (messages.length === 0) {
            chatBox.innerHTML = `
                <div class="chat-empty-state">
                    <div class="chat-empty-icon"><i class="fas fa-comments"></i></div>
                    <h4>Live Paddock Discussion — Real Fans Only</h4>
                    <p>No bot messages here! Discuss live race strategy, pit stops, and overtakes with friends in real time.</p>
                    <button class="btn-outline btn-sm" onclick="ChatSystem.openFriendTabHelper()" style="margin-top:0.5rem;">
                        <i class="fas fa-external-link-alt"></i> Open 2nd Tab to Test Friend Chat
                    </button>
                </div>
            `;
            return;
        }

        const recent = messages.slice(-80);
        recent.forEach(msg => this.renderNewMessage(msg));
        chatBox.scrollTop = chatBox.scrollHeight;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
};
