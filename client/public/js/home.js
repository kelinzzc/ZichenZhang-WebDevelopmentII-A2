document.addEventListener('DOMContentLoaded', function() {
    // 初始化模态框
    ModalManager.init();
    
    // 加载活动数据
    loadEvents();
});

async function loadEvents() {
    const container = document.getElementById('events-container');
    
    try {
        DOMUtils.showLoading(container);
        
        // 获取即将到来的活动
        const response = await ApiService.get('/events?type=upcoming&limit=12');
        
        if (response.success) {
            EventRenderer.renderEvents(container, response.data);
        } else {
            throw new Error(response.error || '获取活动数据失败');
        }
        
    } catch (error) {
        console.error('加载活动失败:', error);
        DOMUtils.showError(container, '加载活动失败，请稍后重试');
    }
}

// 全局函数，供其他脚本使用
window.loadEvents = loadEvents;