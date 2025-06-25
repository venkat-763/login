import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  FileText, 
  Mic, 
  Settings,
  LogOut,
  User,
  Home,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [text, setText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('convert');

  const handleTextToAudio = async () => {
    if (!text.trim()) return;
    
    setIsConverting(true);
    
    // Simulate audio conversion (in real app, this would call a TTS API)
    setTimeout(() => {
      // Create a dummy audio URL for demo
      setAudioUrl('data:audio/wav;base64,demo-audio-url');
      setIsConverting(false);
    }, 2000);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const sidebarItems = [
    { id: 'convert', label: 'Text to Audio', icon: Mic },
    { id: 'history', label: 'History', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/5 backdrop-blur-md border-r border-white/10">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">AudioGen</h1>
              <p className="text-white/60 text-sm">Text to Speech</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.email}</p>
              <p className="text-white/60 text-xs">Premium Plan</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {activeTab === 'convert' && 'Text to Audio Converter'}
              {activeTab === 'history' && 'Conversion History'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <p className="text-white/70">
              {activeTab === 'convert' && 'Convert your text into high-quality audio files'}
              {activeTab === 'history' && 'View and manage your previous conversions'}
              {activeTab === 'settings' && 'Customize your audio generation preferences'}
            </p>
          </div>

          {activeTab === 'convert' && (
            <div className="space-y-6">
              {/* Text Input */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <label className="block text-white font-medium mb-3">Enter Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-white/60 text-sm">{text.length} characters</p>
                  <button
                    onClick={handleTextToAudio}
                    disabled={!text.trim() || isConverting}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                  >
                    {isConverting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                    <span>{isConverting ? 'Converting...' : 'Generate Audio'}</span>
                  </button>
                </div>
              </div>

              {/* Audio Player */}
              {audioUrl && (
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                  <h3 className="text-white font-medium mb-4">Generated Audio</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* Voice Settings */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-white font-medium mb-4">Voice Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Voice</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-400">
                      <option value="female">Female Voice</option>
                      <option value="male">Male Voice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Speed</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-400">
                      <option value="slow">Slow</option>
                      <option value="normal">Normal</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Format</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-400">
                      <option value="mp3">MP3</option>
                      <option value="wav">WAV</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">No conversions yet</h3>
                <p className="text-white/60">Your conversion history will appear here</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-white font-medium mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Email</label>
                    <input 
                      type="email" 
                      value={user?.email || ''} 
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white/60 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};