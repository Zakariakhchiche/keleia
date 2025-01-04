import { useState, useEffect, useContext } from 'react';
import {
  MdClose,
  MdMenu,
  MdDelete,
} from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import bot from '../assets/logo.svg';
import ToggleTheme from './ToggleTheme';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearChat] = useContext(ChatContext);

  useEffect(() => {
    handleResize();
  }, []);

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  function clear() {
    clearChat();
  }

  return (
    <section
      className={`${
        open ? 'w-72' : 'w-16'
      } bg-neutral flex flex-col items-center gap-y-4 h-screen pt-4 relative duration-100 shadow-md`}>
      <div className='flex items-center justify-between w-full px-2 mx-auto'>
        <div
          className={` ${
            !open && 'scale-0 hidden'
          } flex flex-row items-center gap-2 mx-auto w-full`}>
          <img src={bot} alt='logo' className='w-6 h-6' />
          <h1 className={` ${!open && 'scale-0 hidden'}`}>E-da-IA</h1>
        </div>
        <div
          className='mx-auto btn btn-square btn-ghost'
          onClick={() => setOpen(!open)}>
          {open ? <MdClose size={15} /> : <MdMenu size={15} />}
        </div>
      </div>

      <div className={`px-4 text-sm text-center ${!open && 'hidden'}`}>
        <p className="mb-4 text-red-600 dark:text-red-400 font-medium">
          Cette application est un outil d'aide à la compréhension religieuse et ne remplace pas l'avis des savants ni leurs jugements.
        </p>
        <div className="text-neutral-500 dark:text-neutral-400 italic">
          <p className="mb-2 font-semibold">Sourate 18 : Al-Kahf (La Caverne), Verset 26</p>
          <p>"Dis : Allah sait mieux combien de temps ils demeurèrent. À Lui appartient l'inconnaissable des cieux et de la terre. Comme Il voit clair en eux et comme Il entend bien ! Ils n'ont aucun allié en dehors de Lui, et Il n'associe personne à Son commandement."</p>
        </div>
      </div>

      <ul className='w-full menu rounded-box'>
        <li>
          <a className='border border-slate-500' onClick={clear}>
            <MdDelete size={15} />
            <p className={`${!open && 'hidden'}`}>Clear chat</p>
          </a>
        </li>
      </ul>

      <ul className='absolute bottom-0 w-full gap-1 menu rounded-box'>
        <li>
          <ToggleTheme open={open} />
        </li>
      </ul>
    </section>
  );
};

export default SideBar;
