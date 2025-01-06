import { useState, useEffect, useContext } from 'react';
import {
  MdClose,
  MdMenu,
  MdDelete,
} from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import bot from '../assets/quran.svg';
import ToggleTheme from './ToggleTheme';

const SideBar = () => {
  const { clearChat, open, setOpen } = useContext(ChatContext);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleResize() {
    window.innerWidth <= 768 ? setOpen(false) : setOpen(true);
  }

  function clear() {
    clearChat();
  }

  return (
    <section
      className={`${
        open ? 'w-72' : 'w-16'
      } bg-neutral fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out z-50 shadow-lg`}>
      <div className='flex flex-col h-full'>
        <div className='flex items-center justify-between p-4'>
          <div className={`flex items-center space-x-3 ${!open && 'hidden'}`}>
            <img src={bot} alt='logo' className='w-8 h-8' />
            <h1 className='text-lg font-semibold'>E-da-IA</h1>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className='p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700'>
            {open ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-4'>
          <div className={`space-y-4 ${!open && 'hidden'}`}>
            <p className="mb-4 text-red-600 dark:text-red-400 font-medium">
              Cette application est un outil d'aide à la compréhension religieuse et ne remplace pas l'avis des savants ni leurs jugements.
            </p>
            <div className="text-neutral-500 dark:text-neutral-400 italic">
              <p className="mb-2 font-semibold">Sourate 18 : Al-Kahf (La Caverne), Verset 26</p>
              <p>"Dis : Allah sait mieux combien de temps ils demeurèrent. À Lui appartient l'inconnaissable des cieux et de la terre. Comme Il voit clair en eux et comme Il entend bien ! Ils n'ont aucun allié en dehors de Lui, et Il n'associe personne à Son commandement."</p>
            </div>
          </div>
        </div>

        <div className='p-4 border-t border-neutral-200 dark:border-neutral-700'>
          <div className={`flex items-center justify-between ${!open && 'hidden'}`}>
            <ToggleTheme />
            <button
              onClick={clear}
              className='p-2 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20'>
              <MdDelete size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
