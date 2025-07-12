
# Python Backend Integration Guide

This document explains how to integrate your existing Python backend with this React frontend.

## Backend Requirements

Your Python backend needs to expose an HTTP API endpoint that can handle POST requests with JSON data.

### Expected Request Format

```json
{
  "query": "Best skills to learn in 2025",
  "email": "user@example.com"
}
```

### Expected Response Format

```json
{
  "success": true,
  "message": "Detailed report sent to user@example.com",
  "reportContent": "<div>HTML content of the report</div>",
  "email": "user@example.com"
}
```

## Sample Python Flask Backend

Here's a simple Flask server that integrates with this frontend:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/api/research', methods=['POST'])
def generate_research_report():
    try:
        data = request.get_json()
        query = data.get('query')
        email = data.get('email')
        
        if not query or not email:
            return jsonify({
                'success': False,
                'message': 'Missing query or email'
            }), 400
        
        # Your existing research logic here
        print(f"Detailed report sent to {email}")
        
        # Generate your report content
        report_content = generate_report_content(query)
        
        # Send email (your existing email logic)
        # send_email_report(email, report_content)
        
        return jsonify({
            'success': True,
            'message': f'Detailed report sent to {email}',
            'reportContent': report_content,
            'email': email
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

def generate_report_content(query):
    # Your existing report generation logic
    return f"<h2>Report for: {query}</h2><p>Detailed analysis...</p>"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## FastAPI Alternative

If you prefer FastAPI:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    query: str
    email: str

@app.post("/api/research")
async def generate_research_report(request: ResearchRequest):
    try:
        print(f"Detailed report sent to {request.email}")
        
        # Your existing research logic here
        report_content = generate_report_content(request.query)
        
        return {
            "success": True,
            "message": f"Detailed report sent to {request.email}",
            "reportContent": report_content,
            "email": request.email
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def generate_report_content(query: str) -> str:
    # Your existing report generation logic
    return f"<h2>Report for: {query}</h2><p>Detailed analysis...</p>"
```

## Deployment Notes

1. **Development**: Run your Python backend on `http://localhost:5000`
2. **Production**: Update the API endpoint in `src/utils/api.ts` to point to your production backend
3. **CORS**: Make sure your backend allows requests from your frontend domain
4. **Environment Variables**: Consider using environment variables for API endpoints

## Integration Steps

1. Replace the mock API call in the frontend with your actual backend endpoint
2. Update the `generateResearchReport` function in `src/utils/api.ts`
3. Ensure your backend returns HTML content that can be safely rendered
4. Test the integration thoroughly

The frontend is ready to work with your Python backend as soon as you implement the API endpoint!
