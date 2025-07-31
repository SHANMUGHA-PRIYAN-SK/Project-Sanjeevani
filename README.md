# Project Sanjeevani - Living Lifeline

> The intelligent, community-driven ecosystem revolutionizing Thalassemia care in India

## 🎯 Overview

Project Sanjeevani is a comprehensive web application designed to address the critical need for blood donation and Thalassemia care in India. The platform connects patients, donors, and blood banks through an intelligent, gamified ecosystem that encourages community participation and sustainable support systems.

### Key Objectives:
- **Emergency Response**: Real-time blood requirement matching
- **Community Building**: Gamified donation system with rewards
- **Genetic Awareness**: Thalassemia screening and prevention
- **Sustainable Support**: Relay team system for regular patients
- **Awareness Campaigns**: AI-powered content creation tools

## ✨ Features

### 🏠 **Dashboard**
- Real-time statistics and urgent blood requirements
- User impact tracking and achievement display
- Quick action buttons for immediate response

### 🗺️ **Live Blood Radar**
- Interactive map showing patients, donors, and blood banks
- Blood type filtering and availability tracking
- Real-time location-based matching

### 🔄 **Relay System**
- Sustainable support teams for Thalassemia patients
- Monthly commitment tracking
- Team coordination and scheduling

### 🎨 **Awareness Toolkit**
- AI-powered poster generation
- Social media integration
- Customizable templates and messaging

### 🏆 **Gamification**
- Point-based reward system
- Achievement badges and levels
- Leaderboard and community recognition

### 🛡️ **Genetic Shield**
- Thalassemia screening program
- Genetic counseling resources
- Prevention-focused education

### 👤 **User Profile**
- Complete profile management
- Donation history tracking
- Achievement showcase

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful icon library

### Development Tools
- **ESLint 9.9.1** - Code linting and quality
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - CSS vendor prefixing

### PWA Features
- **Service Worker** - Offline functionality
- **Web App Manifest** - Installable app experience
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
sanjeevani-project/
├── public/                          # Static assets
│   ├── sanjeevani-logo.png         # Main application logo
│   ├── manifest.json               # PWA configuration
│   └── sw.js                      # Service worker
├── src/
│   ├── components/                 # React components
│   │   ├── App.tsx                # Main application component
│   │   ├── Navigation.tsx         # Sidebar navigation
│   │   ├── Dashboard.tsx          # Main dashboard view
│   │   ├── LiveMap.tsx            # Interactive map component
│   │   ├── RelaySystem.tsx        # Relay team management
│   │   ├── AwarenessTool.tsx      # Content creation tools
│   │   ├── Gamification.tsx       # Rewards and achievements
│   │   ├── GeneticShield.tsx      # Genetic screening
│   │   ├── UserProfile.tsx        # User profile management
│   │   ├── AuthModal.tsx          # Authentication modal
│   │   └── NotificationSystem.tsx # Toast notifications
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts             # Vite type definitions
├── package.json                   # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # This file
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (for version control)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd sanjeevani-project
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
The application uses sample data for demonstration. For production, you'll need to:
1. Set up environment variables
2. Configure API endpoints
3. Set up database connections

### Step 4: Add Logo
Place your Sanjeevani logo in the `public/` directory:
```bash
# Copy your logo file to:
public/sanjeevani-logo.png
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
- Starts development server at `http://localhost:5173`
- Hot module replacement enabled
- Real-time error reporting

### Production Build
```bash
npm run build
```
- Creates optimized production build in `dist/` directory
- Minified and compressed assets
- Service worker generation

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Tests the built application

### Code Linting
```bash
npm run lint
```
- Runs ESLint to check code quality
- Identifies potential issues and style violations

## 📚 Component Documentation

### 🏠 **App.tsx** - Main Application Component
**Location**: `src/App.tsx`  
**Purpose**: Central application orchestrator

**Key Features**:
- Application state management
- User authentication flow
- Navigation routing
- Sample data initialization

**State Management**:
```typescript
const [currentView, setCurrentView] = useState('dashboard');
const [user, setUser] = useState<User | null>(null);
const [showAuthModal, setShowAuthModal] = useState(false);
const [notifications, setNotifications] = useState<any[]>([]);
```

**Sample Data**:
- Patient needs with urgency levels
- Available donors with locations
- Blood bank inventory
- Relay team assignments

### 🧭 **Navigation.tsx** - Sidebar Navigation
**Location**: `src/components/Navigation.tsx`  
**Purpose**: Main navigation sidebar

**Features**:
- User profile display
- Navigation menu items
- Active state highlighting
- Responsive design

**Props**:
```typescript
interface NavigationProps {
  items: Array<{id: string; label: string; icon: React.ComponentType<any>}>;
  currentView: string;
  onViewChange: (view: string) => void;
  user: User;
}
```

### 📊 **Dashboard.tsx** - Main Dashboard
**Location**: `src/components/Dashboard.tsx`  
**Purpose**: Overview and statistics display

**Features**:
- Urgent blood requirement alerts
- Real-time statistics cards
- User impact tracking
- Quick action buttons

**Statistics Displayed**:
- Active patient needs
- Available donors
- Blood bank inventory
- User points and level

### 🗺️ **LiveMap.tsx** - Interactive Map
**Location**: `src/components/LiveMap.tsx`  
**Purpose**: Real-time blood radar

**Features**:
- Interactive map interface
- Blood type filtering
- Location-based matching
- Real-time availability updates

**Map Elements**:
- Patient need markers (red)
- Donor availability markers (green)
- Blood bank locations (blue)
- Filter controls and search

### 🔄 **RelaySystem.tsx** - Relay Team Management
**Location**: `src/components/RelaySystem.tsx`  
**Purpose**: Sustainable support system

**Features**:
- Relay team formation
- Monthly commitment tracking
- Team coordination tools
- Progress visualization

**Relay Team Structure**:
- 4 donors per team
- Monthly rotation system
- Status tracking (confirmed/pending)
- Team sharing and coordination

### 🎨 **AwarenessTool.tsx** - Content Creation
**Location**: `src/components/AwarenessTool.tsx`  
**Purpose**: AI-powered awareness campaigns

**Features**:
- Poster generation
- Template customization
- Social media integration
- Campaign tracking

**Templates Available**:
- Modern design
- Medical professional
- Community focused
- Urgent appeal

### 🏆 **Gamification.tsx** - Rewards System
**Location**: `src/components/Gamification.tsx`  
**Purpose**: User engagement and motivation

**Features**:
- Point-based rewards
- Achievement badges
- Leaderboard system
- Progress tracking

**Badge Categories**:
- New Member
- First Drop
- Relay Champion
- Awareness Warrior
- Genetic Guardian
- Life Saver

### 🛡️ **GeneticShield.tsx** - Genetic Screening
**Location**: `src/components/GeneticShield.tsx`  
**Purpose**: Thalassemia prevention

**Features**:
- Genetic screening program
- Educational resources
- Test result upload
- Counseling support

**Screening Process**:
1. Express interest
2. HbA2 blood test
3. Upload certificate
4. Medical verification

### 👤 **UserProfile.tsx** - Profile Management
**Location**: `src/components/UserProfile.tsx`  
**Purpose**: User account management

**Features**:
- Profile editing
- Donation history
- Achievement display
- Account settings

**Editable Fields**:
- Personal information
- Contact details
- Blood type
- Location

### 🔐 **AuthModal.tsx** - Authentication
**Location**: `src/components/AuthModal.tsx`  
**Purpose**: User registration and login

**Features**:
- User registration form
- Data validation
- Welcome points system
- Profile completion

**Registration Fields**:
- Full name
- Email address
- Phone number
- Location
- Blood type

### 🔔 **NotificationSystem.tsx** - Toast Notifications
**Location**: `src/components/NotificationSystem.tsx`  
**Purpose**: User feedback and alerts

**Features**:
- Toast notifications
- Auto-dismiss functionality
- Multiple notification types
- Responsive positioning

**Notification Types**:
- Success (green)
- Warning (yellow)
- Info (blue)

## 📊 Data Models

### User Model
```typescript
export type User = {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  location: string;
  phone: string;
  points: number;
  level: number;
  badges: string[];
  donationHistory: any[];
  isVerified: boolean;
  geneticShieldStatus: 'interested' | 'verified' | 'not_interested';
  profileComplete: boolean;
};
```

### Patient Need Model
```typescript
export type PatientNeed = {
  id: string;
  bloodType: string;
  location: { lat: number; lng: number };
  urgency: 'high' | 'medium' | 'low';
  unitsNeeded: number;
  contactInfo: string;
  relayTeam?: RelayMember[];
  description: string;
  createdAt: string;
};
```

### Donor Model
```typescript
export type Donor = {
  id: string;
  name: string;
  bloodType: string;
  location: { lat: number; lng: number };
  lastDonation: string;
  availability: boolean;
  phone: string;
};
```

### Blood Bank Model
```typescript
export type BloodBank = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  inventory: Record<string, number>;
  contact: string;
};
```

### Relay Member Model
```typescript
export type RelayMember = {
  id: string;
  name: string;
  month: string;
  status: 'confirmed' | 'pending';
};
```

## 🔌 API Integration

### Current Implementation
The application currently uses sample data for demonstration purposes. For production deployment, you'll need to integrate with:

1. **Authentication API**
   - User registration and login
   - JWT token management
   - Session handling

2. **Blood Bank API**
   - Real-time inventory updates
   - Location-based search
   - Availability tracking

3. **Donor Management API**
   - Donor registration
   - Availability updates
   - Donation history

4. **Patient Management API**
   - Blood requirement posting
   - Urgency updates
   - Relay team coordination

### API Endpoints Structure
```typescript
// Example API structure
const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout'
  },
  patients: {
    needs: '/api/patients/needs',
    create: '/api/patients/needs',
    update: '/api/patients/needs/:id'
  },
  donors: {
    list: '/api/donors',
    register: '/api/donors/register',
    update: '/api/donors/:id'
  },
  bloodBanks: {
    list: '/api/blood-banks',
    inventory: '/api/blood-banks/:id/inventory'
  }
};
```

## 🎨 Styling & UI

### Design System
- **Color Palette**: Red (#DC2626) primary, with supporting blues and greens
- **Typography**: Modern, readable fonts with proper hierarchy
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable, accessible UI components

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        secondary: '#1E40AF'
      }
    },
  },
  plugins: [],
};
```

### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface elements
- **Accessible** design patterns

### Icon System
- **Lucide React** for consistent iconography
- **Semantic** icon usage
- **Scalable** vector graphics
- **Accessible** with proper labels
