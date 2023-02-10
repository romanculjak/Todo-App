import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import EditModal from './components/EditModal';



function App() {
  return (
    <>
      <div className='p-2 bg-slate-200 min-h-screen'>
        <AppHeader/>
        <AppContent/>
      </div>
      <Toaster/>
    </>
  );
}

export default App;
