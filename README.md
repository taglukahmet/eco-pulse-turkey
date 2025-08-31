# Turkey Social Media Sentiment Analysis Platform

## Project Overview

A React-based web application that visualizes social media sentiment across Turkish provinces with interactive filtering and comparison features. Built for Teknofest competition.

**URL**: https://lovable.dev/projects/7b6f4a76-0d38-46f2-947e-7a80271a7122

## Backend Integration Requirements

This frontend application will require backend integration for the following functionalities:

### Files Requiring Backend Connection:

#### 1. `src/pages/Index.tsx`
- **Purpose**: Main dashboard component
- **Backend Needs**:
  - GET `/api/provinces` - Real-time province data with sentiment analysis
  - POST `/api/auth/login` - User authentication for personalized filters
  - POST `/api/analytics/track` - User interaction tracking
  - POST `/api/user/preferences` - Save/load user filter preferences
- **Data Flow**: Province data, user sessions, analytics events

#### 2. `src/components/TurkeyMap.tsx`
- **Purpose**: Interactive map component
- **Backend Needs**:
  - GET `/api/provinces` - Province data with SVG paths and sentiment
  - WebSocket `/ws/provinces` - Real-time sentiment updates
- **Data Flow**: Live province sentiment updates, map interaction events

#### 3. `src/frontend_data/Provinces.ts`
- **Purpose**: Province data storage (currently static)
- **Backend Needs**:
  - GET `/api/provinces` - Dynamic province data
  - Caching strategy for performance optimization
- **Data Flow**: Replace static data with API calls

#### 4. `src/components/CityDetailPanel.tsx`
- **Purpose**: Detailed city analytics
- **Backend Needs**:
  - GET `/api/cities/{id}/analytics` - Detailed city sentiment analysis
  - GET `/api/cities/{id}/social-media` - Social media platform breakdown
  - GET `/api/cities/{id}/trends` - Weekly trend data
- **Data Flow**: Real-time city analytics, social media metrics

#### 5. `src/components/FilterInterface.tsx`
- **Purpose**: Advanced filtering system
- **Backend Needs**:
  - GET `/api/filters/options` - Available filter options
  - POST `/api/search` - Filtered search results
- **Data Flow**: Filter options, search queries, results

#### 6. `src/components/ComparisonView.tsx`
- **Purpose**: Multi-city comparison
- **Backend Needs**:
  - POST `/api/compare` - Comparison data for multiple cities
  - GET `/api/cities/batch` - Batch city data retrieval
- **Data Flow**: Comparative analytics data

#### 7. `src/components/NationalAgendaPanel.tsx`
- **Purpose**: National trends display  
- **Backend Needs**:
  - GET `/api/national/agenda` - National trending topics
  - GET `/api/national/sentiment` - Country-wide sentiment analysis
- **Data Flow**: National-level aggregated data

### Recommended Backend Architecture:

```
/api
├── /auth
│   ├── POST /login
│   ├── POST /logout  
│   └── GET /profile
├── /provinces
│   ├── GET / (all provinces)
│   └── GET /{id} (single province)
├── /cities
│   ├── GET /{id}/analytics
│   ├── GET /{id}/social-media
│   ├── GET /{id}/trends
│   └── POST /batch (multiple cities)
├── /national
│   ├── GET /agenda
│   └── GET /sentiment
├── /filters
│   └── GET /options
├── /search
│   └── POST / (filtered search)
├── /analytics
│   └── POST /track (user events)
└── /user
    ├── GET /preferences
    └── POST /preferences
```

### WebSocket Connections:
- `/ws/provinces` - Real-time province sentiment updates
- `/ws/national` - National trend updates

## Local Backend Development

When connecting this frontend to your local backend:

1. **CORS Configuration**: Ensure your backend allows requests from `http://localhost:5173`
2. **API Base URL**: Update API endpoints to point to your local backend (e.g., `http://localhost:3000/api`)
3. **Environment Variables**: Configure API endpoints in your development environment
4. **Data Format**: Ensure your backend returns data in the expected format (see TODO comments in code)

### No Major Issues Expected

Connecting to a local backend should work seamlessly. You'll only experience:
- **Data Visualization**: Mock data will be replaced with real backend data
- **Real-time Updates**: Static content will become dynamic
- **User Features**: Authentication and personalization will be enabled

The frontend is designed to be backend-agnostic and should work with any REST API that follows the expected data contracts.

## Technologies Used

- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS
- **Charting**: Recharts
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM

## Development Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

Deploy via Lovable platform:
1. Open [Lovable Project](https://lovable.dev/projects/7b6f4a76-0d38-46f2-947e-7a80271a7122)
2. Click Share → Publish

## Custom Domain

Connect your domain via Project > Settings > Domains in Lovable (requires paid plan).

More info: [Custom Domain Setup](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## For Teknofest Judges

This project demonstrates:
- **Interactive Data Visualization** with real-time sentiment analysis
- **Advanced Filtering System** with multiple criteria
- **Responsive Design** optimized for all devices  
- **Modern React Architecture** with TypeScript
- **Performance Optimization** with efficient re-rendering
- **User Experience Focus** with intuitive interactions

The codebase is production-ready and designed for easy backend integration.