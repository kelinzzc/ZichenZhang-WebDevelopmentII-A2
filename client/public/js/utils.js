// API基础URL
const API_BASE_URL = 'http://localhost:3000/api';

// 通用API调用函数
class ApiService {
    static async get(url) {
        try {
            const response = await fetch(`${API_BASE_URL}${url}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API请求失败:', error);
            throw error;
        }
    }

    static async post(url, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API请求失败:', error);
            throw error;
        }
    }
}

// DOM工具函数
class DOMUtils {
    static showLoading(element) {
        element.innerHTML = '<div class="loading">加载中...</div>';
    }

    static showError(element, message) {
        element.innerHTML = `<div class="error">${message}</div>`;
    }

    static clearElement(element) {
        element.innerHTML = '';
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    static formatCurrency(amount) {
        return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY'
        }).format(amount);
    }

    static createElement(tag, className, content) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }
}

// 事件卡片渲染器
class EventRenderer {
    static createEventCard(event) {
        const progressPercentage = Math.min(event.progress_percentage || 0, 100);
        
        return `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-image">
                    ${event.image_url ? 
                        `<img src="${event.image_url}" alt="${event.title}" style="width:100%;height:100%;object-fit:cover;">` : 
                        event.category_name
                    }
                </div>
                <div class="event-content">
                    <div class="event-meta">
                        <span class="event-category">${event.category_name}</span>
                        <span>${DOMUtils.formatDate(event.event_date)}</span>
                    </div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>已筹集: ${DOMUtils.formatCurrency(event.current_amount)}</span>
                            <span>${progressPercentage}%</span>
                        </div>
                    </div>
                    <div class="event-meta">
                        <span>📍 ${event.location}</span>
                        <span>🎫 ${event.ticket_price === 0 ? '免费' : DOMUtils.formatCurrency(event.ticket_price)}</span>
                    </div>
                    <a href="/event/${event.id}" class="btn" style="margin-top:1rem;display:block;text-align:center;">查看详情</a>
                </div>
            </div>
        `;
    }

    static renderEvents(container, events) {
        if (!events || events.length === 0) {
            container.innerHTML = '<div class="no-results">没有找到相关活动</div>';
            return;
        }

        const eventsHTML = events.map(event => this.createEventCard(event)).join('');
        container.innerHTML = eventsHTML;
    }
}

// 模态框管理器
class ModalManager {
    static showModal(message) {
        const modal = document.getElementById('infoModal');
        const modalMessage = document.getElementById('modalMessage');
        
        if (modal && modalMessage) {
            modalMessage.textContent = message;
            modal.style.display = 'block';
        }
    }

    static hideModal() {
        const modal = document.getElementById('infoModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    static init() {
        const modal = document.getElementById('infoModal');
        const closeBtn = document.querySelector('.modal-close');
        
        if (modal && closeBtn) {
            closeBtn.onclick = () => this.hideModal();
            window.onclick = (event) => {
                if (event.target === modal) {
                    this.hideModal();
                }
            };
        }
    }
}

// 导出到全局作用域
window.ApiService = ApiService;
window.DOMUtils = DOMUtils;
window.EventRenderer = EventRenderer;
window.ModalManager = ModalManager;