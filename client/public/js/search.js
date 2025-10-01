document.addEventListener('DOMContentLoaded', function() {
    // 初始化模态框
    ModalManager.init();
    
    // 加载类别数据
    loadCategories();
    
    // 绑定搜索表单提交事件
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
            throw new Error(response.error || '加载类别失败');
        }
    } catch (error) {
        console.error('加载类别失败:', error);
        ModalManager.showModal('加载类别失败，请刷新页面重试');
    }
}

function populateCategoryDropdown() {
    const categorySelect = document.getElementById('searchCategory');
    
    // 清空现有选项（除了"所有类别"）
    while (categorySelect.children.length > 1) {
        categorySelect.removeChild(categorySelect.lastChild);
    }
    
    // 添加类别选项
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
    
    // 收集搜索参数
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
                        <h3>没有找到匹配的活动</h3>
                        <p>尝试调整搜索条件或清除筛选器</p>
                        <button class="btn" onclick="clearFilters()">清除筛选</button>
                    </div>
                `;
            } else {
                EventRenderer.renderEvents(resultsContainer, response.data);
            }
        } else {
            throw new Error(response.error || '搜索失败');
        }
    } catch (error) {
        console.error('搜索失败:', error);
        DOMUtils.showError(resultsContainer, '搜索失败，请稍后重试');
    }
}

function clearFilters() {
    document.getElementById('searchForm').reset();
    document.getElementById('search-results').innerHTML = '<div class="no-results">使用上面的表单搜索活动</div>';
}

// 全局函数
window.clearFilters = clearFilters;
window.handleSearch = handleSearch;