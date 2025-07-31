import React from 'react';
import { User, PatientNeed, Donor, BloodBank } from '../App';
import { MapPin, Users, Droplet, Shield, Trophy, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  user: User;
  patientNeeds: PatientNeed[];
  donors: Donor[];
  bloodBanks: BloodBank[];
}

export function Dashboard({ user, patientNeeds, donors, bloodBanks }: DashboardProps) {
  const urgentNeeds = patientNeeds.filter(need => need.urgency === 'high');
  const availableDonors = donors.filter(donor => donor.availability);
  const totalBloodUnits = bloodBanks.reduce((total, bank) => 
    total + Object.values(bank.inventory).reduce((sum, units) => sum + units, 0), 0
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-600 mt-1">Your actions save lives. Here's what's happening now.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Impact</p>
            <p className="text-2xl font-bold text-red-600">{user.points} Points</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {urgentNeeds.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Urgent Blood Requirement</h3>
              <p className="text-red-700 mb-4">
                {urgentNeeds.length} patient{urgentNeeds.length > 1 ? 's' : ''} urgently need{urgentNeeds.length === 1 ? 's' : ''} blood transfusion
              </p>
              <div className="space-y-2">
                {urgentNeeds.map(need => (
                  <div key={need.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{need.bloodType}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{need.description}</p>
                        <p className="text-sm text-gray-600">{need.unitsNeeded} units needed</p>
                      </div>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Help Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Needs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{patientNeeds.length}</p>
              <p className="text-red-600 text-sm mt-1">{urgentNeeds.length} urgent</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Available Donors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{availableDonors.length}</p>
              <p className="text-green-600 text-sm mt-1">Ready to help</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Blood Banks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{bloodBanks.length}</p>
              <p className="text-blue-600 text-sm mt-1">{totalBloodUnits} units available</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Droplet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Your Level</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{user.level}</p>
              <p className="text-purple-600 text-sm mt-1">{user.badges.length} badges earned</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Blood Requests</h3>
            <button className="text-red-600 hover:text-red-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {patientNeeds.slice(0, 3).map(need => (
              <div key={need.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{need.bloodType}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{need.description}</p>
                  <p className="text-sm text-gray-600">{need.unitsNeeded} units • {need.urgency} priority</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{need.createdAt}</p>
                  <MapPin className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Impact This Month</h3>
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Lives Potentially Saved</p>
              <p className="text-gray-600">Through your donations and referrals</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">2</p>
                <p className="text-sm text-gray-600">Donations Made</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-sm text-gray-600">People Referred</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}