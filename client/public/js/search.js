document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal
    ModalManager.init();
    
    // Load category data
    loadCategories();
    
    // Bind search form submit event
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
});

let categories = [];

async function loadCategories() {
    try {
        const response = await ApiService.get('/categories');
        
        if (response.success) {
            categories = response.data;
            populateCategoryDropdown();
        } else {
            throw new Error(response.error || 'Failed to load categories');
        }
    } catch (error) {
        console.error('Failed to load categories:', error);
        ModalManager.showModal('Failed to load categories, please refresh the page and try again');
    }
}

function populateCategoryDropdown() {
    const categorySelect = document.getElementById('searchCategory');
    
    // Clear existing options
    while (categorySelect.children.length > 1) {
        categorySelect.removeChild(categorySelect.lastChild);
    }
    
    // Add category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = `${category.name} (${category.event_count})`;
        categorySelect.appendChild(option);
    });
}

async function handleSearch(event) {
    event.preventDefault();
    
    const resultsContainer = document.getElementById('search-results');
    DOMUtils.showLoading(resultsContainer);
    
    // Collect search parameters
    const searchParams = new URLSearchParams();
    
    const keyword = document.getElementById('searchKeyword').value.trim();
    const date = document.getElementById('searchDate').value;
    const location = document.getElementById('searchLocation').value.trim();
    const category = document.getElementById('searchCategory').value;
    
    if (keyword) searchParams.append('keyword', keyword);
    if (date) searchParams.append('date', date);
    if (location) searchParams.append('location', location);
    if (category) searchParams.append('category', category);
    
    try {
        const response = await ApiService.get(`/events/search?${searchParams.toString()}`);
        
        if (response.success) {
            if (response.data.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <h3>No matching events found</h3>
                        <p>Try adjusting your search criteria or clear filters</p>
                        <button class="btn" onclick="clearFilters()">Clear Filters</button>
                    </div>
                `;
            } else {
                EventRenderer.renderEvents(resultsContainer, response.data);
            }
        } else {
            throw new Error(response.error || 'Search failed');
        }
    } catch (error) {
        console.error('Search failed:', error);
        DOMUtils.showError(resultsContainer, 'Search failed, please try again later');
    }
}

function clearFilters() {
    document.getElementById('searchForm').reset();
    document.getElementById('search-results').innerHTML = '<div class="no-results">Use the form above to search for events</div>';
}

// Global functions
window.clearFilters = clearFilters;
window.handleSearch = handleSearch;