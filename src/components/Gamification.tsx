import React, { useState } from 'react';
import { User } from '../App';
import { Trophy, Star, Medal, Target, Users, Calendar, Zap, Shield } from 'lucide-react';

interface GamificationProps {
  user: User;
}

export function Gamification({ user }: GamificationProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const badges = [
    {
      id: 'new_member',
      name: 'New Member',
      description: 'Welcome to Project Sanjeevani!',
      icon: Star,
      earned: true,
      rarity: 'common',
      color: 'bg-blue-500'
    },
    {
      id: 'first_donation',
      name: 'First Drop',
      description: 'Made your first blood donation',
      icon: Target,
      earned: false,
      rarity: 'common',
      color: 'bg-green-500'
    },
    {
      id: 'relay_champion',
      name: 'Relay Champion',
      description: 'Joined 3 different relay teams',
      icon: Users,
      earned: false,
      rarity: 'rare',
      color: 'bg-purple-500'
    },
    {
      id: 'awareness_warrior',
      name: 'Awareness Warrior',
      description: 'Created 10 awareness posters',
      icon: Zap,
      earned: false,
      rarity: 'rare',
      color: 'bg-orange-500'
    },
    {
      id: 'genetic_guardian',
      name: 'Genetic Guardian',
      description: 'Completed genetic screening',
      icon: Shield,
      earned: false,
      rarity: 'epic',
      color: 'bg-red-500'
    },
    {
      id: 'life_saver',
      name: 'Life Saver',
      description: 'Donated blood 10 times',
      icon: Medal,
      earned: false,
      rarity: 'legendary',
      color: 'bg-yellow-500'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 2450, level: 12, badge: 'Life Saver' },
    { rank: 2, name: 'Rajesh Kumar', points: 2180, level: 11, badge: 'Genetic Guardian' },
    { rank: 3, name: 'Anjali Patel', points: 1950, level: 10, badge: 'Relay Champion' },
    { rank: 4, name: 'Vikram Singh', points: 1720, level: 9, badge: 'Awareness Warrior' },
    { rank: 5, name: user.name, points: user.points, level: user.level, badge: 'New Member' },
    { rank: 6, name: 'Kavya Reddy', points: 890, level: 4, badge: 'First Drop' },
    { rank: 7, name: 'Arjun Mehta', points: 650, level: 3, badge: 'New Member' }
  ];

  const achievements = [
    {
      title: 'Points Earned This Month',
      value: user.points,
      target: 500,
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Lives Impacted',
      value: 3,
      target: 10,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Days Active',
      value: 7,
      target: 30,
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Community Referrals',
      value: 2,
      target: 5,
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-300';
    }
  };

  const nextLevelPoints = (user.level * 200) - user.points;
  const progressPercentage = (user.points / (user.level * 200)) * 100;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Path of the Guardian</h1>
        <p className="text-gray-600 text-lg">
          Track your impact, earn badges, and climb the leaderboard while saving lives.
          Every action counts towards building a stronger Thalassemia support community.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Trophy },
              { id: 'badges', label: 'Badges', icon: Medal },
              { id: 'leaderboard', label: 'Leaderboard', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* User Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{user.level}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">Level {user.level} Guardian • {user.points} Points</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Next Level</p>
                <p className="text-lg font-bold text-red-600">{nextLevelPoints} points to go</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Level {user.level}</span>
                <span>Level {user.level + 1}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Recent Badges */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
              <div className="flex space-x-2">
                {badges.filter(badge => badge.earned).map(badge => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  );
                })}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">+{badges.filter(b => !b.earned).length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const percentage = (achievement.value / achievement.target) * 100;
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${achievement.color}`} />
                    <span className="text-2xl font-bold text-gray-900">{achievement.value}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.value}/{achievement.target} goal</p>
                </div>
              );
            })}
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900">Your Impact This Month</h3>
                <p className="text-red-700">Making a difference in the Thalassemia community</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <p className="font-semibold text-red-900">Lives Touched</p>
                <p className="text-sm text-red-700">Through donations & support</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-600">7</span>
                </div>
                <p className="font-semibold text-red-900">Community Actions</p>
                <p className="text-sm text-red-700">Joining teams & sharing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-600">15</span>
                </div>
                <p className="font-semibold text-red-900">People Reached</p>
                <p className="text-sm text-red-700">Through awareness campaigns</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Collect badges by participating in different activities. Each badge represents your contribution to the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map(badge => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
                    badge.earned 
                      ? `${getRarityColor(badge.rarity)} shadow-lg` 
                      : 'border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${badge.earned ? badge.color : 'bg-gray-300'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{badge.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        badge.rarity === 'common' ? 'bg-gray-100 text-gray-600' :
                        badge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                        badge.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {badge.rarity}
                      </span>
                      {badge.earned && <span className="text-green-600 text-xs">✓ Earned</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Community Leaders</h2>
              <p className="text-gray-600">Top contributors in the Sanjeevani community</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option>All Time</option>
              <option>This Month</option>
              <option>This Week</option>
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                <span>Rank</span>
                <span className="col-span-2">Guardian</span>
                <span>Points</span>
                <span>Level</span>
                <span>Latest Badge</span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {leaderboard.map(entry => (
                <div
                  key={entry.rank}
                  className={`px-6 py-4 grid grid-cols-6 gap-4 items-center ${
                    entry.name === user.name ? 'bg-red-50 border-l-4 border-red-500' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {entry.rank <= 3 ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        entry.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                        entry.rank === 2 ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <Trophy className="w-4 h-4" />
                      </div>
                    ) : (
                      <span className="text-gray-600 font-medium">#{entry.rank}</span>
                    )}
                  </div>
                  
                  <div className="col-span-2 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{entry.name}</p>
                      {entry.name === user.name && (
                        <span className="text-xs text-red-600 font-medium">You</span>
                      )}
                    </div>
                  </div>
                  
                  <span className="font-bold text-gray-900">{entry.points.toLocaleString()}</span>
                  <span className="text-gray-600">Level {entry.level}</span>
                  <span className="text-sm text-gray-500">{entry.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}