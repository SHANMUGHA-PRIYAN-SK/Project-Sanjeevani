import React, { useState } from 'react';
import { User } from '../App';
import { Share2, Download, Palette, Type, MapPin, MessageSquare } from 'lucide-react';

interface AwarenessToolProps {
  user: User;
}

export function AwarenessTool({ user }: AwarenessToolProps) {
  const [formData, setFormData] = useState({
    bloodType: user.bloodType,
    location: user.location,
    urgency: 'medium',
    message: 'Join me in saving lives! Every drop counts in the fight against Thalassemia.',
    template: 'modern'
  });
  
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);

  const templates = [
    { id: 'modern', name: 'Modern', preview: 'bg-gradient-to-br from-red-500 to-pink-600' },
    { id: 'medical', name: 'Medical', preview: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
    { id: 'community', name: 'Community', preview: 'bg-gradient-to-br from-green-500 to-emerald-600' },
    { id: 'urgent', name: 'Urgent', preview: 'bg-gradient-to-br from-orange-500 to-red-600' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'General Awareness', color: 'text-blue-600' },
    { value: 'medium', label: 'Blood Drive', color: 'text-yellow-600' },
    { value: 'high', label: 'Urgent Need', color: 'text-red-600' }
  ];

  const generatePoster = () => {
    // Simulate poster generation
    setGeneratedPoster('generated');
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`${formData.message}\n\nBlood Type Needed: ${formData.bloodType}\nLocation: ${formData.location}\n\nJoin Project Sanjeevani to help save lives!`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareOnTwitter = () => {
    const message = encodeURIComponent(`${formData.message} #ProjectSanjeevani #BloodDonation #Thalassemia #SaveLives`);
    window.open(`https://twitter.com/intent/tweet?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Awareness Toolkit</h1>
        <p className="text-gray-600 text-lg">
          Create impactful, shareable posters to spread awareness about blood donation and Thalassemia care.
          Our AI toolkit helps you design professional-quality content in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Poster Configuration</h2>
            </div>

            <div className="space-y-6">
              {/* Blood Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Blood Type Focus
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, bloodType: type})}
                      className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                        formData.bloodType === type
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 text-gray-700 hover:border-red-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Delhi, Mumbai, Bangalore"
                />
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Campaign Type
                </label>
                <div className="space-y-2">
                  {urgencyLevels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setFormData({...formData, urgency: level.value})}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                        formData.urgency === level.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      <span className={`font-medium ${level.color}`}>{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Write an inspiring message to encourage blood donation..."
                />
                <p className="text-sm text-gray-500 mt-1">{formData.message.length}/280 characters</p>
              </div>

              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Type className="w-4 h-4 inline mr-1" />
                  Design Template
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setFormData({...formData, template: template.id})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.template === template.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-full h-12 ${template.preview} rounded mb-2`}></div>
                      <span className="text-sm font-medium text-gray-900">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePoster}
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Palette className="w-5 h-5" />
                <span>Generate AI Poster</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview & Share</h2>
            
            {generatedPoster ? (
              <div className="space-y-6">
                {/* Generated Poster Mock */}
                <div className={`aspect-square rounded-xl p-8 text-white ${templates.find(t => t.id === formData.template)?.preview} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Project Sanjeevani</h3>
                      <p className="text-sm opacity-90">The Living Lifeline</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold">{formData.bloodType}</span>
                      </div>
                      <p className="text-lg font-semibold mb-2">Blood Type Needed</p>
                      <p className="text-sm opacity-90 mb-4">{formData.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm leading-relaxed opacity-90">
                        {formData.message.substring(0, 80)}...
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs opacity-75">Join the Movement</span>
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <span className="text-lg">♥</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Share Your Poster</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={shareOnWhatsApp}
                      className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={shareOnTwitter}
                      className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Twitter</span>
                    </button>
                  </div>
                  
                  <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Poster</span>
                  </button>
                </div>

                {/* Impact Stats */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Expected Impact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">150+</p>
                      <p className="text-xs text-gray-600">Potential Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">15+</p>
                      <p className="text-xs text-gray-600">Shares Expected</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">3+</p>
                      <p className="text-xs text-gray-600">New Donors</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">Configure your poster settings and click "Generate AI Poster"</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">AI Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Smart color matching based on urgency</li>
                    <li>• Optimized text placement for readability</li>
                    <li>• Social media ready dimensions</li>
                    <li>• Automatic branding integration</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Previous Campaigns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Previous Campaigns</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">B+ Blood Drive Campaign</p>
                  <p className="text-sm text-gray-600">Generated 2 days ago • 45 shares</p>
                </div>
                <Share2 className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">Generate your first poster to see your campaign history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}