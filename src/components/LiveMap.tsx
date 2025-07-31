import { useState } from 'react';
import { PatientNeed, Donor, BloodBank } from '../App';
import { Users, Droplet, AlertTriangle } from 'lucide-react';

interface LiveMapProps {
  patientNeeds: PatientNeed[];
  donors: Donor[];
  bloodBanks: BloodBank[];
}

export function LiveMap({ patientNeeds, donors, bloodBanks }: LiveMapProps) {
  const [selectedBloodType, setSelectedBloodType] = useState<string>('all');
  const [showPatients, setShowPatients] = useState(true);
  const [showDonors, setShowDonors] = useState(true);
  const [showBloodBanks, setShowBloodBanks] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const bloodTypes = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredPatientNeeds = patientNeeds.filter(need => 
    selectedBloodType === 'all' || need.bloodType === selectedBloodType
  );

  const filteredDonors = donors.filter(donor => 
    selectedBloodType === 'all' || donor.bloodType === selectedBloodType
  );

  return (
    <div className="h-screen flex">
      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {/* Map Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Live Blood Radar</h2>
              <p className="text-gray-600">Real-time view of blood needs and availability</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                {bloodTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Blood Types' : type}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPatients(!showPatients)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    showPatients ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Patients</span>
                </button>
                
                <button
                  onClick={() => setShowDonors(!showDonors)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    showDonors ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Donors</span>
                </button>
                
                <button
                  onClick={() => setShowBloodBanks(!showBloodBanks)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    showBloodBanks ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Blood Banks</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated Map View */}
        <div className="pt-24 h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
          {/* Map Grid */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-px bg-gray-400"
                style={{ left: `${i * 5}%` }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-px bg-gray-400"
                style={{ top: `${i * 5}%` }}
              />
            ))}
          </div>

          {/* Patient Needs (Red Dots) */}
          {showPatients && filteredPatientNeeds.map(need => (
            <div
              key={need.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${20 + (need.id === '1' ? 25 : 60)}%`,
                top: `${30 + (need.id === '1' ? 10 : 40)}%`
              }}
              onClick={() => setSelectedItem(need)}
            >
              <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse ${
                need.urgency === 'high' ? 'bg-red-600' : 'bg-red-400'
              }`}>
                <div className="absolute -inset-2 bg-red-500 rounded-full opacity-30 animate-ping"></div>
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                {need.bloodType} - {need.urgency}
              </div>
            </div>
          ))}

          {/* Donors (Green Dots) */}
          {showDonors && filteredDonors.map(donor => (
            <div
              key={donor.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${30 + (donor.id === '1' ? 20 : 45)}%`,
                top: `${25 + (donor.id === '1' ? 15 : 35)}%`
              }}
              onClick={() => setSelectedItem(donor)}
            >
              <div className="w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-lg">
                <div className="absolute -inset-1 bg-green-400 rounded-full opacity-50"></div>
              </div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                {donor.bloodType} - Available
              </div>
            </div>
          ))}

          {/* Blood Banks (Blue Dots) */}
          {showBloodBanks && bloodBanks.map(bank => (
            <div
              key={bank.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${40 + (bank.id === '1' ? 15 : 35)}%`,
                top: `${40 + (bank.id === '1' ? 20 : 25)}%`
              }}
              onClick={() => setSelectedItem(bank)}
            >
              <div className="w-7 h-7 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <Droplet className="w-3 h-3 text-white" />
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                {bank.name}
              </div>
            </div>
          ))}

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Patient Needs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Available Donors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Blood Banks</span>
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="absolute top-24 right-6 bg-white rounded-lg shadow-lg p-4 space-y-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{filteredPatientNeeds.length}</p>
              <p className="text-sm text-gray-600">Active Needs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{filteredDonors.length}</p>
              <p className="text-sm text-gray-600">Available Donors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{bloodBanks.length}</p>
              <p className="text-sm text-gray-600">Blood Banks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Panel */}
      {selectedItem && (
        <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Details</h3>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {selectedItem.bloodType && selectedItem.urgency && (
            // Patient Need Details
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Patient Need</h4>
                  <p className="text-sm text-gray-600">{selectedItem.urgency} priority</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Blood Type Needed</label>
                  <p className="text-lg font-bold text-red-600">{selectedItem.bloodType}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Units Required</label>
                  <p className="text-gray-900">{selectedItem.unitsNeeded} units</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-900">{selectedItem.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact</label>
                  <p className="text-gray-900">{selectedItem.contactInfo}</p>
                </div>

                {selectedItem.relayTeam && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Relay Team Status</label>
                    <div className="space-y-2 mt-2">
                      {selectedItem.relayTeam.map((member: any) => (
                        <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{member.month}: {member.name}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            member.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Join Relay Team
              </button>
            </div>
          )}

          {selectedItem.availability !== undefined && (
            // Donor Details
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Available Donor</h4>
                  <p className="text-sm text-gray-600">Ready to help</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedItem.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Blood Type</label>
                  <p className="text-lg font-bold text-green-600">{selectedItem.bloodType}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Donation</label>
                  <p className="text-gray-900">{selectedItem.lastDonation}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact</label>
                  <p className="text-gray-900">{selectedItem.phone}</p>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Contact Donor
              </button>
            </div>
          )}

          {selectedItem.inventory && (
            // Blood Bank Details
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Blood Bank</h4>
                  <p className="text-sm text-gray-600">Current inventory</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedItem.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact</label>
                  <p className="text-gray-900">{selectedItem.contact}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Blood Inventory</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(selectedItem.inventory).map(([type, units]) => {
                      const unitsNumber = units as number;
                      return (
                        <div key={type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{type}</span>
                          <span className={`text-sm font-bold ${
                            unitsNumber > 10 ? 'text-green-600' : unitsNumber > 5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {unitsNumber} units
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Contact Blood Bank
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}