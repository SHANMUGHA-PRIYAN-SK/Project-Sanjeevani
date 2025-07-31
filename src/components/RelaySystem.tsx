import React, { useState } from 'react';
import { User, PatientNeed } from '../App';
import { Users, Calendar, Share2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface RelaySystemProps {
  user: User;
  patientNeeds: PatientNeed[];
}

export function RelaySystem({ user, patientNeeds }: RelaySystemProps) {
  const [selectedPatient, setSelectedPatient] = useState<PatientNeed | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleJoinRelay = () => {
    if (selectedPatient && selectedMonth) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const generateRelayLink = (patientId: string) => {
    return `${window.location.origin}/relay/${patientId}`;
  };

  const copyRelayLink = (patientId: string) => {
    navigator.clipboard.writeText(generateRelayLink(patientId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Donor Relay System</h1>
        <p className="text-gray-600 text-lg">
          Form sustainable support teams for Thalassemia patients who need regular transfusions.
          Each relay team consists of up to 4 donors, ensuring consistent care throughout the year.
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">
            Successfully joined the relay team for {selectedMonth}! You've earned 50 points.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Patients Needing Relay Teams</h2>
          
          {patientNeeds.map(patient => {
            const relayTeam = patient.relayTeam || [];
            const availableSlots = 4 - relayTeam.length;
            
            return (
              <div key={patient.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">{patient.bloodType}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {patient.description}
                      </h3>
                      <p className="text-gray-600">Regular transfusions needed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Relay Team</p>
                    <p className="text-lg font-bold text-gray-900">
                      {relayTeam.length}/4 filled
                    </p>
                  </div>
                </div>

                {/* Relay Team Status */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {months.slice(0, 4).map(month => {
                    const member = relayTeam.find(m => m.month === month);
                    return (
                      <div
                        key={month}
                        className={`p-3 rounded-lg border-2 border-dashed ${
                          member 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{month}</span>
                          {member ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {member ? member.name : 'Open slot'}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">
                      {availableSlots} slot{availableSlots !== 1 ? 's' : ''} available
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyRelayLink(patient.id)}
                      className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                    
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Join Team
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Relay Form */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Join a Relay Team</h2>
            </div>

            {selectedPatient ? (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Selected Patient</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">{selectedPatient.bloodType}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedPatient.description}</p>
                      <p className="text-sm text-gray-600">{selectedPatient.contactInfo}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Your Month
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {months.slice(0, 4).map(month => {
                      const isOccupied = selectedPatient.relayTeam?.some(m => m.month === month);
                      return (
                        <button
                          key={month}
                          onClick={() => !isOccupied && setSelectedMonth(month)}
                          disabled={isOccupied}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                            selectedMonth === month
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : isOccupied
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-red-300'
                          }`}
                        >
                          {month}
                          {isOccupied && (
                            <div className="text-xs text-gray-500 mt-1">Occupied</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Your Commitment</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Donate blood once during your selected month</li>
                    <li>• Receive automated reminders 7 days before</li>
                    <li>• Coordinate with the patient's care team</li>
                    <li>• Earn 50 points for joining + 100 points for donation</li>
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleJoinRelay}
                    disabled={!selectedMonth}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Join for {selectedMonth}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Select a patient from the list to join their relay team
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">How Relay Teams Work</h4>
                  <ul className="text-sm text-gray-600 space-y-1 text-left">
                    <li>• 4 donors commit to one month each</li>
                    <li>• Ensures consistent blood supply year-round</li>
                    <li>• Reduces burden on individual donors</li>
                    <li>• Creates a supportive community</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* My Relay Commitments */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Relay Commitments</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Ansh's Care Team</p>
                  <p className="text-sm text-gray-600">March 2025 • B+ Blood</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Active
                </span>
              </div>
              
              <div className="text-center py-4 text-gray-500">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm">Join more relay teams to help more patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}