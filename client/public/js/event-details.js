document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    ModalManager.init();
    
    // Get event ID from URL and load details
    const eventId = getEventIdFromUrl();
    if (eventId) {
        loadEventDetails(eventId);
    } else {
        showError('Invalid event ID');
    }
});

function getEventIdFromUrl() {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
}

async function loadEventDetails(eventId) {
    const container = document.getElementById('event-detail-container');
    
    try {
        DOMUtils.showLoading(container);
        
        const response = await ApiService.get(`/events/${eventId}`);
        
        if (response.success) {
            renderEventDetails(container, response.data);
        } else {
            throw new Error(response.error || 'Failed to get event details');
        }
        
    } catch (error) {
        console.error('Failed to load event details:', error);
        showError('Failed to load event details, please try again later');
    }
}

function renderEventDetails(container, event) {
    const progressPercentage = Math.min(event.progress_percentage || 0, 100);
    const remainingAmount = event.remaining_amount > 0 ? event.remaining_amount : 0;
    
    const eventHTML = `
        <article class="event-detail">
            <div class="detail-header">
                <h1>${event.title}</h1>
                <p>Organized by ${event.organization_name}</p>
            </div>
            
            <div class="detail-content">
                <div class="detail-info">
                    <h2>Event Details</h2>
                    <p>${event.full_description || event.description}</p>
                    
                    <div class="detail-meta">
                        <div class="meta-item">
                            <span class="meta-label">Event Date</span>
                            <span>${DOMUtils.formatDate(event.event_date)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Location</span>
                            <span>${event.location}</span>
                            ${event.venue_details ? `<small>${event.venue_details}</small>` : ''}
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category</span>
                            <span>${event.category_name}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Organizer</span>
                            <span>${event.organization_name}</span>
                        </div>
                    </div>
                    
                    <h3>Fundraising Progress</h3>
                    <div class="event-progress" style="margin:1.5rem 0;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>Raised: ${DOMUtils.formatCurrency(event.current_amount)}</span>
                            <span>Goal: ${DOMUtils.formatCurrency(event.goal_amount)}</span>
                            <span>${progressPercentage}%</span>
                        </div>
                        ${remainingAmount > 0 ? 
                            `<p style="text-align:center;margin-top:0.5rem;color:#666;">
                                Need ${DOMUtils.formatCurrency(remainingAmount)} more to reach goal
                            </p>` : 
                            `<p style="text-align:center;margin-top:0.5rem;color:var(--success-color);">
                                Fundraising goal achieved!
                            </p>`
                        }
                    </div>
                    
                    ${event.organization_description ? `
                        <h3>About the Organizer</h3>
                        <p>${event.organization_description}</p>
                        ${event.mission_statement ? `<blockquote style="border-left:4px solid var(--accent-color);padding-left:1rem;margin:1rem 0;font-style:italic;">
                            ${event.mission_statement}
                        </blockquote>` : ''}
                    ` : ''}
                </div>
                
                <div class="detail-sidebar">
                    <div class="ticket-info">
                        <h3>Join the Event</h3>
                        <div class="ticket-price">
                            ${event.ticket_price === 0 ? 'Free' : DOMUtils.formatCurrency(event.ticket_price)}
                        </div>
                        <p>${event.ticket_price === 0 ? 'Free participation, donations welcome' : 'Ticket includes event participation and basic services'}</p>
                    </div>
                    
                    <button class="btn" style="width:100%;margin-bottom:1rem;" onclick="handleRegistration()">
                        Register Now
                    </button>
                    
                    <div style="background:white;padding:1rem;border-radius:4px;border:1px solid var(--border-color);">
                        <h4>📞 Contact Information</h4>
                        ${event.contact_email ? `<p>Email: ${event.contact_email}</p>` : ''}
                        ${event.contact_phone ? `<p>Phone: ${event.contact_phone}</p>` : ''}
                        ${event.address ? `<p>Address: ${event.address}</p>` : ''}
                    </div>
                </div>
            </div>
        </article>
    `;
    
    container.innerHTML = eventHTML;
}

function handleRegistration() {
    ModalManager.showModal('This feature is under construction and will be available in future versions.');
}

function showError(message) {
    const container = document.getElementById('event-detail-container');
    DOMUtils.showError(container, message);
}

// Global functions
window.handleRegistration = handleRegistration;