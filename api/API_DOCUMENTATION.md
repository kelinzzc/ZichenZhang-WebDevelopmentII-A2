# 慈善活动API文档

## 基础信息
- **基础URL**: `http://localhost:3000/api`
- **内容类型**: `application/json`

## 端点概览

### 活动相关端点

#### 获取活动列表
- **URL**: `/events`
- **方法**: `GET`
- **参数**:
  - `page` (可选): 页码，默认1
  - `limit` (可选): 每页数量，默认10
  - `type` (可选): 活动类型，`upcoming`(即将到来) 或 `past`(过去)

**示例请求**:
```bash
GET /api/events?page=1&limit=5&type=upcoming