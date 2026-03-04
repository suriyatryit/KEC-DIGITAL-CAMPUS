/**
 * AxisPrime Technologies - Global JavaScript
 * Handles Fake Activity Counter, Interactive Forms, and Portal Simulations
 */

document.addEventListener('DOMContentLoaded', () => {
    initFakeActivityCounter();
    initContactForms();
    initLoginSimulation();
});

/* ==========================================================================
   FAKE ACTIVITY COUNTER WIDGET
   ========================================================================== */
function initFakeActivityCounter() {
    const counterElements = document.querySelectorAll('.js-activity-counter');
    
    // If no counter widgets exist on this specific page, exit early.
    if (!counterElements || counterElements.length === 0) return;

    // Keys for localStorage
    const STORAGE_KEY_DOMAINS = 'axisprime_domains_registered';
    const STORAGE_KEY_SITES = 'axisprime_sites_hosted';

    // Baseline fallback values if this is the user's very first visit
    let domainsCount = parseInt(localStorage.getItem(STORAGE_KEY_DOMAINS)) || 412;
    let sitesCount = parseInt(localStorage.getItem(STORAGE_KEY_SITES)) || 84;

    // Update DOM initially
    updateCounterDOM(counterElements, domainsCount, sitesCount);

    // Set Random Interval to increment values (between 10 and 25 seconds)
    function scheduleNextIncrement() {
        const randomDelay = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000;
        
        setTimeout(() => {
            // Randomly decide which metric to increment to simulate organic activity
            const incrementDomains = Math.random() > 0.4; // 60% chance
            const incrementSites = Math.random() > 0.6; // 40% chance

            if (incrementDomains) domainsCount++;
            if (incrementSites) sitesCount++;
            
            // Save new state immediately so page navigation doesn't lose data
            localStorage.setItem(STORAGE_KEY_DOMAINS, domainsCount);
            localStorage.setItem(STORAGE_KEY_SITES, sitesCount);

            // Update visible DOM elements
            updateCounterDOM(counterElements, domainsCount, sitesCount);

            // Schedule next ping
            scheduleNextIncrement();
        }, randomDelay);
    }

    // Start the recursive interval
    scheduleNextIncrement();
}

function updateCounterDOM(elements, domains, sites) {
    elements.forEach(el => {
        const domainSpan = el.querySelector('.js-count-domains');
        const siteSpan = el.querySelector('.js-count-sites');
        
        if (domainSpan) {
            // Add subtle animation class
            domainSpan.classList.add('flash-update');
            domainSpan.textContent = domains.toLocaleString();
            setTimeout(() => domainSpan.classList.remove('flash-update'), 500);
        }
        
        if (siteSpan) {
            siteSpan.classList.add('flash-update');
            siteSpan.textContent = sites.toLocaleString();
            setTimeout(() => siteSpan.classList.remove('flash-update'), 500);
        }
    });
}


/* ==========================================================================
   CONTACT & REGISTRATION FORM VALIDATION (CLIENT-SIDE)
   ========================================================================== */
function initContactForms() {
    const registrationForm = document.getElementById('registrationForm');
    const inquiryForm = document.getElementById('inquiryForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard POST
            
            // Basic Check for empty required fields (Browser usually handles this via 'required' attribute, but this is a fallback)
            let isValid = true;
            const requiredFields = registrationForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error-border'); // Hypothetical CSS class
                } else {
                    field.classList.remove('error-border');
                }
            });

            if (!isValid) return;

            // Simulate Network Request Delay
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            setTimeout(() => {
                // Hide Form, Show Success Message directly injected into DOM
                registrationForm.style.display = 'none';
                
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success-message';
                successMsg.style.display = 'block';
                // Note: Email must precisely match hello@axisprime.tech as requested
                successMsg.innerHTML = `
                    <div style="text-align:center; padding: 2rem 0;">
                        <svg style="width: 48px; height: 48px; fill: #22c55e; margin: 0 auto 1rem auto;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        <h3 style="color: #15803d; margin-bottom: 0.5rem;">Registration Received</h3>
                        <p>Our team will email you shortly at <strong>hello@axisprime.tech</strong>.</p>
                    </div>
                `;
                
                registrationForm.parentNode.insertBefore(successMsg, registrationForm.nextSibling);

            }, 1200); // 1.2s fake delay
        });
    }

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = inquiryForm.querySelector('button');
            btn.textContent = 'Message Sent';
            btn.disabled = true;
            btn.style.backgroundColor = '#22c55e';
            inquiryForm.reset();
        });
    }
}


/* ==========================================================================
   CLIENT PORTAL LOGIN SIMULATION
   ========================================================================== */
function initLoginSimulation() {
    const loginForm = document.getElementById('portalLoginForm');
    
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        const errorContainer = document.getElementById('loginErrorMsg');
        
        // Hide previous errors
        if(errorContainer) errorContainer.style.display = 'none';

        // 1. Disable button and show spinner
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="loading-spinner"></span> Authenticating...';

        // 2. Wait 2.5 seconds (exact prompt requirement)
        setTimeout(() => {
            // Restore button
            loginBtn.disabled = false;
            loginBtn.textContent = 'Access Portal';

            // 3. Show predefined Offline Maintenance Error
            if (errorContainer) {
                errorContainer.style.display = 'block';
                errorContainer.innerHTML = '<strong>Connection Refused:</strong> Client Portal is currently offline for scheduled maintenance.';
            } else {
                // Fallback creation if container wasn't built into HTML
                const fallbackError = document.createElement('div');
                fallbackError.id = 'loginErrorMsg';
                fallbackError.className = 'form-error-message';
                fallbackError.style.display = 'block';
                fallbackError.innerHTML = '<strong>Connection Refused:</strong> Client Portal is currently offline for scheduled maintenance.';
                loginForm.insertBefore(fallbackError, loginForm.firstChild);
            }
            
            // Highlight password field to simulate rejection
            const passField = document.getElementById('loginPassword');
            if(passField) {
                 passField.value = '';
                 passField.focus();
            }

        }, 2500); // Exactly 2.5 seconds
    });
}


/* ==========================================================================
   INTERACTIVE FAQ ACCORDION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions first (optional, for accordion styling)
            faqButtons.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                btn.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current
            if (!isExpanded) {
                button.setAttribute('aria-expanded', 'true');
                const answer = button.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
