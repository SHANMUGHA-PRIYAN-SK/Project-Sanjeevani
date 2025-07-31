import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { LiveMap } from './components/LiveMap';
import { RelaySystem } from './components/RelaySystem';
import { AwarenessTool } from './components/AwarenessTool';
import { Gamification } from './components/Gamification';
import { GeneticShield } from './components/GeneticShield';
import { UserProfile } from './components/UserProfile';
import { AuthModal } from './components/AuthModal';
import { NotificationSystem } from './components/NotificationSystem';
import { User, MapPin, Users, Zap, Shield, Trophy } from 'lucide-react';

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

export type RelayMember = {
  id: string;
  name: string;
  month: string;
  status: 'confirmed' | 'pending';
};

export type Donor = {
  id: string;
  name: string;
  bloodType: string;
  location: { lat: number; lng: number };
  lastDonation: string;
  availability: boolean;
  phone: string;
};

export type BloodBank = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  inventory: Record<string, number>;
  contact: string;
};

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Sample data for demonstration
  const [patientNeeds] = useState<PatientNeed[]>([
    {
      id: '1',
      bloodType: 'B+',
      location: { lat: 28.6139, lng: 77.2090 },
      urgency: 'high',
      unitsNeeded: 2,
      contactInfo: 'Dr. Sharma - 9876543210',
      description: 'Thalassemia major patient needs regular transfusion',
      createdAt: '2025-01-14',
      relayTeam: [
        { id: '1', name: 'Arjun K.', month: 'January', status: 'confirmed' },
        { id: '2', name: 'Priya S.', month: 'February', status: 'confirmed' },
      ]
    },
    {
      id: '2',
      bloodType: 'O-',
      location: { lat: 19.0760, lng: 72.8777 },
      urgency: 'medium',
      unitsNeeded: 1,
      contactInfo: 'Apollo Hospital - 9123456789',
      description: 'Emergency requirement for Thalassemia patient',
      createdAt: '2025-01-14'
    }
  ]);

  const [donors] = useState<Donor[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      bloodType: 'B+',
      location: { lat: 28.6129, lng: 77.2295 },
      lastDonation: '2024-11-15',
      availability: true,
      phone: '9876543210'
    },
    {
      id: '2',
      name: 'Priya Patel',
      bloodType: 'O-',
      location: { lat: 19.0896, lng: 72.8656 },
      lastDonation: '2024-12-01',
      availability: true,
      phone: '9123456789'
    }
  ]);

  const [bloodBanks] = useState<BloodBank[]>([
    {
      id: '1',
      name: 'AIIMS Blood Bank',
      location: { lat: 28.5672, lng: 77.2100 },
      inventory: { 'A+': 15, 'B+': 8, 'AB+': 3, 'O+': 20, 'A-': 5, 'B-': 2, 'AB-': 1, 'O-': 7 },
      contact: '011-26588500'
    },
    {
      id: '2',
      name: 'Lilavati Hospital Blood Bank',
      location: { lat: 19.0544, lng: 72.8328 },
      inventory: { 'A+': 12, 'B+': 6, 'AB+': 4, 'O+': 18, 'A-': 3, 'B-': 1, 'AB-': 2, 'O-': 5 },
      contact: '022-26562222'
    }
  ]);

  const handleLogin = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      bloodType: userData.bloodType,
      location: userData.location,
      phone: userData.phone,
      points: 100,
      level: 1,
      badges: ['New Member'],
      donationHistory: [],
      isVerified: false,
      geneticShieldStatus: 'not_interested',
      profileComplete: true
    };
    setUser(newUser);
    setShowAuthModal(false);
    
    // Add welcome notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: 'Welcome to Sanjeevani! You earned 100 points for joining.',
      timestamp: new Date().toISOString()
    }]);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MapPin },
    { id: 'map', label: 'Live Radar', icon: MapPin },
    { id: 'relay', label: 'Relay System', icon: Users },
    { id: 'awareness', label: 'Awareness Tool', icon: Zap },
    { id: 'gamification', label: 'Achievements', icon: Trophy },
    { id: 'genetic', label: 'Genetic Shield', icon: Shield },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderCurrentView = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <img 
              src="/sanjeevani-logo.png" 
              alt="Sanjeevani Logo" 
              className="w-24 h-24 object-contain mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Sanjeevani</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              The intelligent, community-driven ecosystem revolutionizing Thalassemia care in India
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Join the Movement
            </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} patientNeeds={patientNeeds} donors={donors} bloodBanks={bloodBanks} />;
      case 'map':
        return <LiveMap patientNeeds={patientNeeds} donors={donors} bloodBanks={bloodBanks} />;
      case 'relay':
        return <RelaySystem user={user} patientNeeds={patientNeeds} />;
      case 'awareness':
        return <AwarenessTool user={user} />;
      case 'gamification':
        return <Gamification user={user} />;
      case 'genetic':
        return <GeneticShield user={user} setUser={setUser} />;
      case 'profile':
        return <UserProfile user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} patientNeeds={patientNeeds} donors={donors} bloodBanks={bloodBanks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationSystem notifications={notifications} setNotifications={setNotifications} />
      {user && (
        <Navigation
          items={navigationItems}
          currentView={currentView}
          onViewChange={setCurrentView}
          user={user}
        />
      )}
      <main className={user ? 'pl-64' : ''}>
        {renderCurrentView()}
      </main>
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;