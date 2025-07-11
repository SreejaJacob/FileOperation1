// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const envelope = document.getElementById('envelope');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const letterContent = document.getElementById('letterContent');
    const loveButton = document.getElementById('loveButton');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const loveStatsSection = document.getElementById('loveStats');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const pages = document.querySelectorAll('.page');
    
    // New interactive elements
    const loveActions = document.querySelectorAll('.love-action');
    const loveMeter = document.querySelector('.love-meter');
    const loveMeterFill = document.getElementById('loveMeterFill');
    const loveMeterText = document.getElementById('loveMeterText');
    const returnButton = document.getElementById('returnButton');
    const prevQuoteBtn = document.getElementById('prevQuote');
    const nextQuoteBtn = document.getElementById('nextQuote');
    const quoteDots = document.querySelectorAll('.dot');
    const quotes = document.querySelectorAll('.romantic-quote');
    
    // State variables
    let isEnvelopeOpened = false;
    let isLetterShown = false;
    let isLoveButtonClicked = false;
    let currentPage = 1;
    const totalPages = 7;
    
    // New interactive state variables
    let currentQuote = 0;
    let loveMeterClicked = false;
    let loveMeterLevel = 0;
    
    // Envelope click/touch event
    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent double-tap zoom
        openEnvelope();
    });
    
    // Love button click/touch event
    loveButton.addEventListener('click', sendLove);
    loveButton.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent double-tap zoom
        sendLove();
    });
    
    // Individual stat items click/touch events
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            animateIndividualStat(item, index);
        });
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            animateIndividualStat(item, index);
        });
    });
    
    // Love actions event listeners
    loveActions.forEach((action, index) => {
        action.addEventListener('click', function(e) {
            e.stopPropagation();
            handleLoveAction(action.dataset.action);
        });
        action.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleLoveAction(action.dataset.action);
        });
    });
    
    // Love meter event listeners
    if (loveMeter) {
        loveMeter.addEventListener('click', function(e) {
            e.stopPropagation();
            animateLoveMeter();
        });
        loveMeter.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            animateLoveMeter();
        });
    }
    
    // Quote navigation event listeners
    if (prevQuoteBtn) {
        prevQuoteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showPreviousQuote();
        });
    }
    
    if (nextQuoteBtn) {
        nextQuoteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextQuote();
        });
    }
    
    // Quote dots event listeners
    quoteDots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            showQuote(index);
        });
    });
    
    // Return button event listeners
    if (returnButton) {
        returnButton.addEventListener('click', function(e) {
            e.stopPropagation();
            returnToLetter();
        });
        returnButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            returnToLetter();
        });
    }
    
    // Book navigation event listeners
    if (prevButton) {
        prevButton.addEventListener('click', goToPreviousPage);
        prevButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            goToPreviousPage();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNextPage);
        nextButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            goToNextPage();
        });
    }
    
    // Function to open envelope
    function openEnvelope() {
        if (isEnvelopeOpened) return;
        
        isEnvelopeOpened = true;
        
        // Add opening animation class
        envelope.classList.add('opening');
        
        // Add enhanced envelope opening effect
        enhancedEnvelopeOpen();
        
        // Add gentle vibration for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
        
        // After envelope animation, show letter
        setTimeout(() => {
            showLetter();
        }, 800);
    }
    
    // Function to show letter content
    function showLetter() {
        if (isLetterShown) return;
        
        isLetterShown = true;
        
        // Hide welcome screen
        welcomeScreen.classList.add('hidden');
        
        // Show letter content after welcome screen fades
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            letterContent.classList.add('show');
            
            // Initialize book
            initializeBook();
        }, 500);
    }
    
    // Function to initialize book
    function initializeBook() {
        currentPage = 1;
        updatePageDisplay();
        updateNavigationButtons();
        
        // Show first page
        pages.forEach((page, index) => {
            if (index === 0) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }
    
    // Function to go to next page
    function goToNextPage() {
        if (currentPage < totalPages) {
            // Add page flip effect
            const currentPageElement = pages[currentPage - 1];
            const nextPageElement = pages[currentPage];
            
            currentPageElement.classList.remove('active');
            currentPageElement.classList.add('prev');
            
            setTimeout(() => {
                nextPageElement.classList.add('active');
                currentPage++;
                updatePageDisplay();
                updateNavigationButtons();
                
                // Add gentle vibration
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }, 100);
        }
    }
    
    // Function to go to previous page
    function goToPreviousPage() {
        if (currentPage > 1) {
            // Add page flip effect
            const currentPageElement = pages[currentPage - 1];
            const prevPageElement = pages[currentPage - 2];
            
            currentPageElement.classList.remove('active');
            
            setTimeout(() => {
                prevPageElement.classList.remove('prev');
                prevPageElement.classList.add('active');
                currentPage--;
                updatePageDisplay();
                updateNavigationButtons();
                
                // Add gentle vibration
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }, 100);
        }
    }
    
    // Function to update page display
    function updatePageDisplay() {
        if (currentPageSpan) {
            currentPageSpan.textContent = currentPage;
        }
        if (totalPagesSpan) {
            totalPagesSpan.textContent = totalPages;
        }
    }
    
    // Function to update navigation buttons
    function updateNavigationButtons() {
        if (prevButton) {
            prevButton.disabled = currentPage === 1;
        }
        if (nextButton) {
            nextButton.disabled = currentPage === totalPages;
        }
    }
    

    
    // Function to send love
    function sendLove() {
        if (isLoveButtonClicked) return;
        
        isLoveButtonClicked = true;
        
        // Button animation
        loveButton.style.transform = 'scale(0.95)';
        
        // Add gentle vibration for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
        
        // Create floating hearts effect
        createFloatingHearts();
        
        // Reset button and show thank you message
        setTimeout(() => {
            loveButton.style.transform = 'scale(1)';
            showThankYouMessage();
        }, 300);
    }
    
    // Function to create floating hearts effect
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.hearts-background');
        
        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = ['💕', '💖', '💗', '💝', '💟'][Math.floor(Math.random() * 5)];
            
            // Random position
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            // Add to container
            heartsContainer.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }
    }
    
    // Function to show thank you message
    function showThankYouMessage() {
        // Hide letter content
        letterContent.style.opacity = '0';
        letterContent.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            letterContent.style.display = 'none';
            thankYouMessage.classList.add('show');
            
            // No auto-hide - let the user stay and interact with all elements
            // They can use the "Return to Letter" button when they're ready
        }, 500);
    }
    
    // Function to hide thank you message and show letter again
    function hideThankYouMessage() {
        thankYouMessage.classList.remove('show');
        
        setTimeout(() => {
            thankYouMessage.style.display = 'none';
            letterContent.style.display = 'block';
            letterContent.style.opacity = '1';
            letterContent.style.transform = 'translateY(0)';
            
            // Reset love button
            isLoveButtonClicked = false;
        }, 500);
    }
    
    // Function to handle love actions
    function handleLoveAction(action) {
        const actionMessages = {
            'promise': {
                message: 'I promise to wait for you forever! 🤞',
                emojis: ['🤞', '💕', '⭐', '💖', '✨']
            },
            'kiss': {
                message: 'Sending you a thousand kisses! 💋',
                emojis: ['💋', '😘', '💕', '💖', '😍']
            },
            'hug': {
                message: 'Wrapping you in the warmest hug! 🤗',
                emojis: ['🤗', '🤗', '💕', '💖', '🥰']
            },
            'star': {
                message: 'I wish for us to be together soon! ⭐',
                emojis: ['⭐', '🌟', '✨', '💫', '🌠']
            },
            'moon': {
                message: 'We look at the same moon every night! 🌙',
                emojis: ['🌙', '🌟', '💕', '✨', '🌌']
            },
            'rainbow': {
                message: 'After every storm comes a rainbow! 🌈',
                emojis: ['🌈', '🌈', '☀️', '💕', '✨']
            }
        };
        
        const selectedAction = actionMessages[action];
        if (selectedAction) {
            showTemporaryMessage(selectedAction.message, selectedAction.emojis);
            
            // Add vibration
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
        }
    }
    
    // Function to show temporary message
    function showTemporaryMessage(message, emojis) {
        // Create temporary message element
        const tempMessage = document.createElement('div');
        tempMessage.className = 'temporary-message';
        tempMessage.innerHTML = `
            <div class="temp-message-content">
                <p>${message}</p>
                <div class="temp-message-emojis">
                    ${emojis.map(emoji => `<span>${emoji}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(tempMessage);
        
        // Show message
        setTimeout(() => {
            tempMessage.classList.add('show');
        }, 100);
        
        // Hide and remove message after longer duration for better experience
        setTimeout(() => {
            tempMessage.classList.remove('show');
            setTimeout(() => {
                if (tempMessage.parentNode) {
                    tempMessage.parentNode.removeChild(tempMessage);
                }
            }, 300);
        }, 5000);
    }
    
    // Function to animate love meter
    function animateLoveMeter() {
        if (loveMeterClicked) return;
        
        loveMeterClicked = true;
        loveMeterLevel++;
        
        const levels = [
            { width: '25%', text: 'I love you!' },
            { width: '50%', text: 'I love you so much!' },
            { width: '75%', text: 'I love you beyond words!' },
            { width: '100%', text: 'I love you infinitely! ∞' }
        ];
        
        const currentLevel = Math.min(loveMeterLevel - 1, levels.length - 1);
        const level = levels[currentLevel];
        
        if (loveMeterFill && loveMeterText) {
            loveMeterFill.style.width = level.width;
            loveMeterText.textContent = level.text;
        }
        
        // Create love explosion effect
        createLoveExplosion();
        
        // Add vibration
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 50, 100]);
        }
        
        // Reset after shorter animation for better long-term interaction
        setTimeout(() => {
            loveMeterClicked = false;
        }, 1000);
        
        // If meter is at 100%, cycle back to allow continuous interaction
        if (loveMeterLevel >= levels.length) {
            setTimeout(() => {
                loveMeterLevel = 0;
                if (loveMeterFill && loveMeterText) {
                    loveMeterFill.style.width = '0%';
                    loveMeterText.textContent = 'Click to fill my heart with love again! 💕';
                }
            }, 3000);
        }
    }
    
    // Function to create love explosion effect
    function createLoveExplosion() {
        const container = document.querySelector('.hearts-background');
        const explosionEmojis = ['💕', '💖', '💗', '💝', '💞', '💘', '❤️', '💓'];
        
        for (let i = 0; i < 12; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'love-explosion-emoji';
            emoji.innerHTML = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];
            
            // Random position around the meter
            const angle = (i / 12) * 360;
            const radius = 100 + Math.random() * 50;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            emoji.style.left = `calc(50% + ${x}px)`;
            emoji.style.top = `calc(50% + ${y}px)`;
            emoji.style.fontSize = (Math.random() * 15 + 20) + 'px';
            emoji.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(emoji);
            
            // Remove after animation
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 3000);
        }
    }
    
    // Function to show next quote
    function showNextQuote() {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }
    
    // Function to show previous quote
    function showPreviousQuote() {
        currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
        showQuote(currentQuote);
    }
    
    // Function to show specific quote
    function showQuote(index) {
        // Remove active class from all quotes and dots
        quotes.forEach(quote => quote.classList.remove('active'));
        quoteDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current quote and dot
        if (quotes[index]) {
            quotes[index].classList.add('active');
        }
        if (quoteDots[index]) {
            quoteDots[index].classList.add('active');
        }
        
        currentQuote = index;
        
        // Add vibration
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    // Function to return to letter
    function returnToLetter() {
        hideThankYouMessage();
        
        // Add vibration
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
    }
    
    // Function to animate individual stat
    function animateIndividualStat(statItem, index) {
        // Check if this stat is already animated
        if (statItem.classList.contains('animated')) {
            return; // Don't animate again
        }
        
        const numberElement = statItem.querySelector('.stat-number');
        const target = numberElement.getAttribute('data-target');
        
        // Mark as animated
        statItem.classList.add('animated');
        
        // Reset counter
        numberElement.textContent = '0';
        numberElement.classList.add('counting');
        
        // Special handling for infinity symbol
        if (target === '∞') {
            animateToInfinity(numberElement);
        } else {
            animateCounter(numberElement, parseInt(target));
        }
        
        // Create floating effect for this specific stat
        createIndividualStatsEffect(statItem, index);
        
        // Add gentle vibration
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    // Function to animate counter
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // 50 steps
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                element.textContent = target.toLocaleString();
                element.classList.remove('counting');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }
    
    // Function to animate to infinity
    function animateToInfinity(element) {
        const numbers = ['1', '100', '1000', '10K', '100K', '1M', '∞'];
        let index = 0;
        
        const timer = setInterval(() => {
            element.textContent = numbers[index];
            index++;
            if (index >= numbers.length) {
                element.classList.remove('counting');
                clearInterval(timer);
            }
        }, 200);
    }
    
    // Function to create individual stats effect
    function createIndividualStatsEffect(statItem, index) {
        const statsEmojis = ['💕', '💖', '💗', '✨', '🌟', '💝', '💞'];
        const container = document.querySelector('.hearts-background');
        
        // Get the position of the clicked stat item
        const rect = statItem.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Create fewer emojis for individual effect (3-5)
        const numEmojis = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < numEmojis; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'floating-stats-emoji';
            emoji.innerHTML = statsEmojis[Math.floor(Math.random() * statsEmojis.length)];
            
            // Position emojis around the clicked stat item
            const startX = ((rect.left + rect.width / 2 - containerRect.left) / containerRect.width) * 100;
            const variance = 15; // How spread out the emojis are
            emoji.style.left = Math.max(5, Math.min(95, startX + (Math.random() - 0.5) * variance)) + '%';
            emoji.style.fontSize = (Math.random() * 10 + 18) + 'px';
            emoji.style.animationDelay = Math.random() * 0.5 + 's';
            emoji.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            container.appendChild(emoji);
            
            // Remove after animation
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 5000);
        }
    }
    

    
    // Add CSS for floating hearts and other effects
    const style = document.createElement('style');
    style.textContent = `
        .floating-heart {
            position: absolute;
            animation: floatUp 4s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        }
        
        .floating-stats-emoji {
            position: absolute;
            animation: floatUp 6s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
            color: #ff6b9d;
        }
        
        @keyframes floatUp {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes fadeInOut {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
        
        /* Sound waves effect */
        .sound-waves {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            gap: 3px;
        }
        
        .wave {
            width: 2px;
            height: 10px;
            background: #ff6b9d;
            animation: soundWave 0.5s infinite alternate;
        }
        
        .wave:nth-child(2) {
            animation-delay: 0.1s;
        }
        
        .wave:nth-child(3) {
            animation-delay: 0.2s;
        }
        
        @keyframes soundWave {
            0% {
                height: 10px;
            }
            100% {
                height: 20px;
            }
        }
        
        /* Enhanced love button pulse */
        @keyframes lovePulse {
            0% {
                transform: scale(1);
                box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 10px 25px rgba(255, 107, 107, 0.6);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
            }
        }
        
        /* Enhanced mobile touch experience */
        @media (max-width: 768px) {
            .envelope {
                touch-action: manipulation;
            }
            
            .love-button {
                touch-action: manipulation;
            }
            
            .love-stats-section {
                touch-action: manipulation;
            }
            
            .stat-item {
                touch-action: manipulation;
            }
            
            .nav-button {
                touch-action: manipulation;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add sparkle effect to title
    function addSparkleEffect() {
        const title = document.querySelector('.main-title');
        if (title) {
            title.addEventListener('mouseover', function() {
                this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.5)';
            });
            
            title.addEventListener('mouseout', function() {
                this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
            });
        }
    }
    
    // Initialize sparkle effect after letter is shown
    setTimeout(addSparkleEffect, 2000);
    
    // Add random heart emoji generation for background
    function generateRandomHearts() {
        const heartsBackground = document.querySelector('.hearts-background');
        const hearts = heartsBackground.querySelectorAll('.heart');
        
        hearts.forEach(heart => {
            const emojis = ['💕', '💖', '💗', '💝', '💟', '💞', '💘'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            heart.textContent = randomEmoji;
        });
    }
    
    // Generate random hearts every 10 seconds
    setInterval(generateRandomHearts, 10000);
    
    // Initial call
    generateRandomHearts();
    
    // Add typewriter effect for messages
    function typeWriterEffect() {
        const messages = document.querySelectorAll('.message-section p');
        messages.forEach((msg, index) => {
            const text = msg.textContent;
            msg.textContent = '';
            msg.style.borderRight = '2px solid #764ba2';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    msg.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    msg.style.borderRight = 'none';
                }
            }, 50);
        });
    }
    
    // Enhanced envelope opening with sound simulation
    function enhancedEnvelopeOpen() {
        // Create sound wave effect
        const soundWaves = document.createElement('div');
        soundWaves.className = 'sound-waves';
        soundWaves.innerHTML = `
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        `;
        envelope.appendChild(soundWaves);
        
        setTimeout(() => {
            if (soundWaves.parentNode) {
                soundWaves.parentNode.removeChild(soundWaves);
            }
        }, 1000);
    }
    
    // Add pulse effect to love button
    function addPulseEffect() {
        const loveButton = document.getElementById('loveButton');
        if (loveButton) {
            loveButton.style.animation = 'lovePulse 2s infinite';
        }
    }
    
    // Initialize enhanced effects after letter is shown
    setTimeout(() => {
        addPulseEffect();
        // typeWriterEffect(); // Uncomment if you want typewriter effect
    }, 3000);
    
    // Prevent context menu on mobile for better UX
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate positions if needed
            const container = document.querySelector('.container');
            container.style.height = window.innerHeight + 'px';
        }, 100);
    });
    
    // Add keyboard navigation for book
    document.addEventListener('keydown', function(e) {
        if (isLetterShown) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                goToPreviousPage();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                goToNextPage();
            }
        }
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 