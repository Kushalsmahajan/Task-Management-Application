/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskBoard } from './components/TaskBoard';
import { LayoutDashboard, LogOut, CheckSquare, Calendar, Search, Layers, Settings } from 'lucide-react';
import { motion } from 'motion/react';

function Dashboard() {
  const { user, logout } = useAuth();
  
  const userInitials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() || 'U';

  return (
    <div className="bg-slate-50 w-full min-h-screen flex font-sans overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span className="text-xl font-semibold tracking-tight text-slate-800">TaskFlow</span>
          </div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md font-medium text-sm transition-colors">
              <LayoutDashboard size={16} />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 rounded-md font-medium text-sm transition-colors">
              <CheckSquare size={16} />
              My Tasks
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md font-medium text-sm transition-colors">
              <Calendar size={16} />
              Calendar
            </a>
          </nav>

          <div className="mt-12">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Projects</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-1.5 text-sm text-slate-600 cursor-pointer hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Growth Plan
                </div>
                <span className="text-xs text-slate-400">12</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 text-sm text-slate-600 cursor-pointer hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Product Launch
                </div>
                <span className="text-xs text-slate-400">8</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 text-sm text-slate-600 cursor-pointer hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Q4 Roadmap
                </div>
                <span className="text-xs text-slate-400">5</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={userInitials} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-500">
                {userInitials}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-800 line-clamp-1">{user?.displayName || 'User'}</span>
              <span className="text-xs text-slate-400">Standard Plan</span>
            </div>
          </div>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-slate-600 transition-colors" title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-64 lg:w-96">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search tasks or projects..." className="bg-transparent border-none text-sm focus:ring-0 w-full placeholder-slate-400 outline-none" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
              <Settings size={20} />
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm hidden sm:block">
              Create New Task
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <TaskBoard />
        </main>
      </div>
    </div>
  );
}

function LoginScreen() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-600/20">
            <Layers size={32} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Welcome to TaskFlow
        </h2>
        <p className="mt-3 text-center text-sm text-slate-500">
          Organize your work, track your progress.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <button
            onClick={signInWithGoogle}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          
          <div className="mt-6 text-center text-xs text-slate-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MainApp() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
