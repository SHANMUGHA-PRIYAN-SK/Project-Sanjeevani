import React, { useState } from 'react';
import { User } from '../App';
import { Shield, Upload, CheckCircle, Clock, AlertTriangle, FileText, Info } from 'lucide-react';

interface GeneticShieldProps {
  user: User;
  setUser: (user: User) => void;
}

export function GeneticShield({ user, setUser }: GeneticShieldProps) {
  const [isInterested, setIsInterested] = useState(user.geneticShieldStatus === 'interested');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInterestChange = () => {
    const newStatus = !isInterested;
    setIsInterested(newStatus);
    
    const updatedUser = {
      ...user,
      geneticShieldStatus: newStatus ? 'interested' : 'not_interested'
    };
    setUser(updatedUser);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const thalassemiaInfo = [
    {
      title: "What is Thalassemia?",
      content: "Thalassemia is an inherited blood disorder where the body makes an abnormal form or inadequate amount of hemoglobin, leading to severe anemia."
    },
    {
      title: "Types of Thalassemia",
      content: "Alpha and Beta Thalassemia are the main types, with varying severity levels from minor (trait) to major (requiring regular transfusions)."
    },
    {
      title: "Genetic Inheritance",
      content: "Thalassemia follows an autosomal recessive pattern. Two carriers have a 25% chance of having an affected child with each pregnancy."
    },
    {
      title: "Prevention Through Screening",
      content: "Pre-marital genetic screening can identify carriers and help couples make informed decisions about family planning."
    }
  ];

  const screeningProcess = [
    {
      step: 1,
      title: "Express Interest",
      description: "Indicate your willingness to participate in genetic screening",
      status: isInterested ? "completed" : "pending",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "HbA2 Blood Test",
      description: "Get an HbA2 electrophoresis test done at any certified lab",
      status: "pending",
      icon: FileText
    },
    {
      step: 3,
      title: "Upload Certificate",
      description: "Upload your test results for verification by our medical team",
      status: uploadedFile ? "completed" : "pending",
      icon: Upload
    },
    {
      step: 4,
      title: "Verification",
      description: "Medical verification and genetic counseling if needed",
      status: "pending",
      icon: Shield
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Genetic Shield Initiative</h1>
            <p className="text-gray-600">Empowering informed decisions for a Thalassemia-free future</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-900 font-medium mb-1">Our Vision for Eradication</p>
              <p className="text-blue-800 text-sm">
                Through widespread genetic screening and counseling, we aim to reduce Thalassemia incidence by 70% in the next decade. 
                Your participation helps build a comprehensive database for better healthcare planning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <p className="text-green-800 font-medium">
            Certificate uploaded successfully! Our medical team will verify it within 48 hours.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Participation Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Participation Status</h2>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  isInterested ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                  {isInterested && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="font-medium text-gray-900">
                  I am interested in the Genetic Shield initiative for Thalassemia carrier screening
                </span>
              </div>
              <button
                onClick={handleInterestChange}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isInterested 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isInterested ? 'Participating' : 'Join Initiative'}
              </button>
            </div>

            {isInterested && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Screening Process</h3>
                <div className="space-y-3">
                  {screeningProcess.map(process => {
                    const Icon = process.icon;
                    return (
                      <div key={process.step} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          process.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{process.title}</p>
                          <p className="text-sm text-gray-600">{process.description}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          process.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {process.status === 'completed' ? 'Completed' : 'Pending'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Certificate Upload */}
          {isInterested && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload HbA2 Test Certificate</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Upload your HbA2 test certificate</p>
                <p className="text-gray-600 mb-4">
                  Accepted formats: PDF, JPG, PNG • Max size: 5MB
                </p>
                
                <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </label>
                
                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-medium">✓ {uploadedFile.name}</p>
                    <p className="text-green-600 text-sm">Certificate uploaded successfully</p>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-yellow-900 font-medium mb-1">Important Note</p>
                    <p className="text-yellow-800 text-sm">
                      Ensure your HbA2 test certificate includes patient details, test values, and is from a certified laboratory. 
                      Our medical team will verify all certificates within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Badge Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Genetic Guardian Badge</h2>
            
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                user.geneticShieldStatus === 'verified' 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}>
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Genetic Guardian</h3>
                <p className="text-gray-600 mb-3">
                  Awarded to members who complete genetic screening and contribute to Thalassemia prevention
                </p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.geneticShieldStatus === 'verified' 
                    ? 'bg-green-100 text-green-700' 
                    : user.geneticShieldStatus === 'interested'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {user.geneticShieldStatus === 'verified' && <CheckCircle className="w-4 h-4 mr-1" />}
                  {user.geneticShieldStatus === 'interested' && <Clock className="w-4 h-4 mr-1" />}
                  {user.geneticShieldStatus === 'verified' ? 'Verified' : 
                   user.geneticShieldStatus === 'interested' ? 'Verification Pending' : 'Not Participating'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Information Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Thalassemia</h3>
            <div className="space-y-4">
              {thalassemiaInfo.map((info, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-1">{info.title}</h4>
                  <p className="text-sm text-gray-600">{info.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Impact</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">2,450</p>
                <p className="text-sm text-gray-600">People Screened</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">180</p>
                <p className="text-sm text-gray-600">Carriers Identified</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">95</p>
                <p className="text-sm text-gray-600">Genetic Counseling Sessions</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our genetic counselors are available to answer your questions about the screening process.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}       