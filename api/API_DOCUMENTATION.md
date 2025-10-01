# Charity Activity API Documentation 
## Basic Information
- **Base URL**: `http://localhost:3000/api`
- **Content Type**: `application/json` 
## Endpoint Overview 
Activity-related endpoints 
#### Obtain the list of activities - **URL**: `/events`
- **Method**: `GET`
- **Parameters**:
- `page` (optional): Page number, default is 1
- `limit` (optional): Number of items per page, default is 10
- `type` (optional): Activity type, either `upcoming` (coming soon) or `past` (past) 
Please provide an accurate and fluent English translation of the following text, following the natural and smooth expression habits of English ```bash
GET /api/events? page=1&limit=5&type=upcoming