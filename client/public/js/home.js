document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal
    ModalManager.init();
    
    // Load event data
    loadEvents();
});

async function loadEvents() {
    const container = document.getElementById('events-container');
    
    try {
        DOMUtils.showLoading(container);
        
        // Get upcoming events
        const response = await ApiService.get('/events?type=upcoming&limit=12');
        
        if (response.success) {
            EventRenderer.renderEvents(container, response.data);
        } else {
            throw new Error(response.error || 'Failed to fetch event data');
        }
        
    } catch (error) {
        console.error('Failed to load events:', error);
        DOMUtils.showError(container, 'Failed to load events, please try again later');
    }
}

// Global function for use by other scripts
window.loadEvents = loadEvents;