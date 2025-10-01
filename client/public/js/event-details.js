document.addEventListener('DOMContentLoaded', function() {
    // 初始化模态框
    ModalManager.init();
    
    // 从URL获取活动ID并加载详情
    const eventId = getEventIdFromUrl();
    if (eventId) {
        loadEventDetails(eventId);
    } else {
        showError('无效的活动ID');
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
            throw new Error(response.error || '获取活动详情失败');
        }
        
    } catch (error) {
        console.error('加载活动详情失败:', error);
        showError('加载活动详情失败，请稍后重试');
    }
}

function renderEventDetails(container, event) {
    const progressPercentage = Math.min(event.progress_percentage || 0, 100);
    const remainingAmount = event.remaining_amount > 0 ? event.remaining_amount : 0;
    
    const eventHTML = `
        <article class="event-detail">
            <div class="detail-header">
                <h1>${event.title}</h1>
                <p>由 ${event.organization_name} 主办</p>
            </div>
            
            <div class="detail-content">
                <div class="detail-info">
                    <h2>活动详情</h2>
                    <p>${event.full_description || event.description}</p>
                    
                    <div class="detail-meta">
                        <div class="meta-item">
                            <span class="meta-label">📅 活动时间</span>
                            <span>${DOMUtils.formatDate(event.event_date)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">📍 活动地点</span>
                            <span>${event.location}</span>
                            ${event.venue_details ? `<small>${event.venue_details}</small>` : ''}
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">🎯 活动类别</span>
                            <span>${event.category_name}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">👥 主办组织</span>
                            <span>${event.organization_name}</span>
                        </div>
                    </div>
                    
                    <h3>筹款进度</h3>
                    <div class="event-progress" style="margin:1.5rem 0;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>已筹集: ${DOMUtils.formatCurrency(event.current_amount)}</span>
                            <span>目标: ${DOMUtils.formatCurrency(event.goal_amount)}</span>
                            <span>${progressPercentage}%</span>
                        </div>
                        ${remainingAmount > 0 ? 
                            `<p style="text-align:center;margin-top:0.5rem;color:#666;">
                                还需筹集 ${DOMUtils.formatCurrency(remainingAmount)} 达成目标
                            </p>` : 
                            `<p style="text-align:center;margin-top:0.5rem;color:var(--success-color);">
                                🎉 筹款目标已达成！
                            </p>`
                        }
                    </div>
                    
                    ${event.organization_description ? `
                        <h3>关于主办方</h3>
                        <p>${event.organization_description}</p>
                        ${event.mission_statement ? `<blockquote style="border-left:4px solid var(--accent-color);padding-left:1rem;margin:1rem 0;font-style:italic;">
                            ${event.mission_statement}
                        </blockquote>` : ''}
                    ` : ''}
                </div>
                
                <div class="detail-sidebar">
                    <div class="ticket-info">
                        <h3>参与活动</h3>
                        <div class="ticket-price">
                            ${event.ticket_price === 0 ? '免费' : DOMUtils.formatCurrency(event.ticket_price)}
                        </div>
                        <p>${event.ticket_price === 0 ? '免费参与，欢迎捐款支持' : '票价包含活动参与和基础服务'}</p>
                    </div>
                    
                    <button class="btn" style="width:100%;margin-bottom:1rem;" onclick="handleRegistration()">
                        立即注册
                    </button>
                    
                    <div style="background:white;padding:1rem;border-radius:4px;border:1px solid var(--border-color);">
                        <h4>📞 联系方式</h4>
                        ${event.contact_email ? `<p>邮箱: ${event.contact_email}</p>` : ''}
                        ${event.contact_phone ? `<p>电话: ${event.contact_phone}</p>` : ''}
                        ${event.address ? `<p>地址: ${event.address}</p>` : ''}
                    </div>
                </div>
            </div>
        </article>
    `;
    
    container.innerHTML = eventHTML;
}

function handleRegistration() {
    ModalManager.showModal('此功能正在建设中，将在后续版本中开放。');
}

function showError(message) {
    const container = document.getElementById('event-detail-container');
    DOMUtils.showError(container, message);
}

// 全局函数
window.handleRegistration = handleRegistration;