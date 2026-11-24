// ===========================
// F1 STREAM — Chat System
// Real-time style chat with localStorage persistence
// ===========================

const ChatSystem = {
    STORAGE_KEY: 'f1stream_chat',
    MAX_MESSAGES: 200,
    BOT_INTERVAL: null,

    // Predefined bot users
    bots: [
        { name: 'SpeedKing', color: '#e10600' },
        { name: 'F1Fanatic', color: '#3b82f6' },
        { name: 'PitWall', color: '#10b981' },
        { name: 'GridWalker', color: '#ffd700' },
        { name: 'ApexHunter', color: '#f97316' },
        { name: 'DRSZone', color: '#8b5cf6' },
        { name: 'TyreWhisperer', color: '#06b6d4' },
        { name: 'SafetyCar', color: '#ec4899' },
        { name: 'PolePosition', color: '#84cc16' },
        { name: 'Undercut', color: '#f43f5e' },
        { name: 'RacePace', color: '#0ea5e9' },
        { name: 'Chequered', color: '#a855f7' },
        { name: 'DeltaTime', color: '#14b8a6' },
        { name: 'BoxBox', color: '#fb923c' },
        { name: 'SlipStream', color: '#22d3ee' },
    ],

    // Categorized messages for realistic chat
    messages: {
        excitement: [
            "WHAT A MOVE!! 🔥🔥", "INCREDIBLE OVERTAKE! 😱", "THIS IS INSANE!!!", "GOAT move right there!",
            "No way he just did that!", "ABSOLUTE SCENES! 🏎️💨", "I'm literally shaking rn!!",
            "THAT'S why we watch F1!", "History being made!! 🏆", "My heart can't take this!!!"
        ],
        analysis: [
            "Soft tires are degrading fast, expect a pit window soon 🔧",
            "Undercut is the play here, the overcut won't work on this circuit",
            "DRS detection zone is crucial at turn 1, watch the gap 📊",
            "Wind direction changed — that affects sector 2 significantly",
            "Tire temps are critical on this track surface",
            "Strategy calls are going to decide this race",
            "Fuel load is coming down, pace should improve now",
            "Track evolution is massive today, times dropping lap by lap",
            "The medium compound is the race tire today",
            "Interesting to see the split strategies playing out"
        ],
        reactions: [
            "Let's gooo! 🏎️", "Come on!! 💪", "Yes yes YES!", "Noooo that's so unlucky 😩",
            "Fair play, great drive 👏", "This is peak F1 right here", "What a weekend so far",
            "Anyone else's heart racing? 😅", "This is better than any movie", "🏁🏁🏁"
        ],
        questions: [
            "What compound is P1 on?", "Will they pit this lap?", "How many laps left?",
            "Anyone else getting buffering?", "What happened to the safety car?",
            "Is DRS enabled?", "Who's on the alternate strategy?", "When did they pit last?",
            "What's the gap to P2?", "Track limits penalty incoming?"
        ],
        humor: [
            "My stream froze at the worst time 😭", "F5 F5 F5 F5 F5",
            "This race > sleep any day", "Mom: go study. Me: but F1...",
            "Race engineers are basically therapists 😂", "Bono my tires are gone (but somehow fastest lap)",
            "Tell me you're an F1 fan without telling me 🏎️", "Sleep is overrated anyway 🌙",
            "Who needs a social life when you have F1 weekends", "My neighbors probably think I'm crazy yelling at my TV"
        ],
        driver_specific: [
            "Verstappen is in a league of his own today", "Norris is pushing HARD 💪",
            "Hamilton in that Ferrari is something else! 🔴🏎️", "Leclerc masterclass incoming! 🇲🇨",
            "Audi's factory power unit top speed is looking lethal on the straights! ⚡",
            "Hulk driving the wheels off that Audi today!", "Bortoleto with a mega overtake for Audi!",
            "Piastri's tire management is wizardry 🧙‍♂️", "Russell and Antonelli locking horns at Mercedes!",
            "Sainz extracting maximum pace out of that Williams 🚀", "Alonso still a beast in 2026! Legend 🫡",
            "2026 new regulations delivered — these cars can follow so closely! 🔥"
        ]
    },

    // Get stored messages
    getMessages() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    // Save messages
    saveMessages(messages) {
        // Keep only last MAX_MESSAGES
        if (messages.length > this.MAX_MESSAGES) {
            messages = messages.slice(-this.MAX_MESSAGES);
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
    },

    // Add a message
    addMessage(username, text, color, isUser = false) {
        const messages = this.getMessages();
        const msg = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            username,
            text,
            color,
            isUser,
            timestamp: Date.now(),
        };
        messages.push(msg);
        this.saveMessages(messages);
        this.renderNewMessage(msg);
        return msg;
    },

    // Send user message
    sendUserMessage(text) {
        const session = AuthSystem.getSession();
        if (!session) {
            openAuthModal('login');
            return;
        }
        if (!text.trim()) return;
        
        this.addMessage(session.username, text.trim(), session.chatColor, true);

        // Trigger bot responses
        setTimeout(() => {
            this.generateBotReply();
        }, 500 + Math.random() * 2000);
    },

    // Generate a bot reply
    generateBotReply() {
        const bot = this.bots[Math.floor(Math.random() * this.bots.length)];
        const categories = Object.keys(this.messages);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const msgs = this.messages[category];
        const text = msgs[Math.floor(Math.random() * msgs.length)];
        this.addMessage(bot.name, text, bot.color);
    },

    // Render a single new message
    renderNewMessage(msg) {
        const chatBox = document.getElementById('chatBox');
        if (!chatBox) return;

        const div = document.createElement('div');
        div.className = `chat-msg ${msg.isUser ? 'chat-msg-user' : ''} chat-msg-new`;
        div.innerHTML = `
            <div class="chat-msg-avatar" style="background: ${msg.color};">${msg.username[0].toUpperCase()}</div>
            <div class="chat-msg-body">
                <span class="chat-username" style="color: ${msg.color};">${this.escapeHtml(msg.username)}</span>
                <span class="chat-text">${this.escapeHtml(msg.text)}</span>
            </div>
            <span class="chat-time">${this.formatTime(msg.timestamp)}</span>
        `;
        chatBox.appendChild(div);

        // Smooth scroll to bottom
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });

        // Keep chat size manageable in DOM
        while (chatBox.children.length > 80) {
            chatBox.removeChild(chatBox.firstChild);
        }
    },

    // Render all stored messages
    renderAll() {
        const chatBox = document.getElementById('chatBox');
        if (!chatBox) return;
        
        chatBox.innerHTML = '';
        const messages = this.getMessages();
        // Show last 50 messages
        const recent = messages.slice(-50);
        recent.forEach(msg => {
            const div = document.createElement('div');
            div.className = `chat-msg ${msg.isUser ? 'chat-msg-user' : ''}`;
            div.innerHTML = `
                <div class="chat-msg-avatar" style="background: ${msg.color};">${msg.username[0].toUpperCase()}</div>
                <div class="chat-msg-body">
                    <span class="chat-username" style="color: ${msg.color};">${this.escapeHtml(msg.username)}</span>
                    <span class="chat-text">${this.escapeHtml(msg.text)}</span>
                </div>
                <span class="chat-time">${this.formatTime(msg.timestamp)}</span>
            `;
            chatBox.appendChild(div);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    },

    // Start auto chat (simulated other users)
    startAutoChat() {
        if (this.BOT_INTERVAL) clearInterval(this.BOT_INTERVAL);
        
        this.BOT_INTERVAL = setInterval(() => {
            // Only generate if on live page
            const liveSection = document.getElementById('live');
            if (liveSection && liveSection.classList.contains('active')) {
                this.generateBotReply();
            }
        }, 3000 + Math.random() * 5000);
    },

    // Stop auto chat
    stopAutoChat() {
        if (this.BOT_INTERVAL) {
            clearInterval(this.BOT_INTERVAL);
            this.BOT_INTERVAL = null;
        }
    },

    // Utility
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
        return date.toLocaleDateString();
    },

    // Initialize
    init() {
        this.renderAll();
        this.startAutoChat();
        
        // If no messages, seed some initial ones
        const messages = this.getMessages();
        if (messages.length === 0) {
            this.seedInitialMessages();
        }
    },

    // Seed initial chat messages
    seedInitialMessages() {
        const seeds = [
            { bot: 0, cat: 'reactions', idx: 0 },
            { bot: 1, cat: 'excitement', idx: 3 },
            { bot: 2, cat: 'analysis', idx: 0 },
            { bot: 3, cat: 'reactions', idx: 6 },
            { bot: 4, cat: 'driver_specific', idx: 0 },
            { bot: 5, cat: 'humor', idx: 2 },
            { bot: 6, cat: 'analysis', idx: 5 },
            { bot: 7, cat: 'excitement', idx: 5 },
        ];
        
        seeds.forEach((s, i) => {
            const bot = this.bots[s.bot];
            const text = this.messages[s.cat][s.idx];
            const messages = this.getMessages();
            messages.push({
                id: (Date.now() - (seeds.length - i) * 30000).toString(36),
                username: bot.name,
                text,
                color: bot.color,
                isUser: false,
                timestamp: Date.now() - (seeds.length - i) * 30000,
            });
            this.saveMessages(messages);
        });
        this.renderAll();
    }
};
