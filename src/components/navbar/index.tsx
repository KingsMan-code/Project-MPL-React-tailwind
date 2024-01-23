import React from 'react';
import Cookies from 'js-cookie';

export const Navbar = () => {
  // Acessa o cookie do usuário
  const usuarioLogadoCookie = Cookies.get('usuarioLogado');

  const handleLogout = () => {
    // Remove todos os cookies
    Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie));
    // Redireciona para a página de login ou página inicial
    window.location.href = '/login';
  }

  return (
    <nav className="bg-gradient-to-r from-cyan-600 to-sky-900 p-6 h-24 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-white hover:text-gray-300">Inicio</a>
        <a href="produtos" className="text-white hover:text-gray-300">Produtos</a>
        <a href="contatos" className="text-white hover:text-gray-300">Contatos</a>
      </div>
      <div className="flex items-center space-x-4">
        {/* Exibe o botão Sair se o usuário estiver logado, caso contrário, exibe o botão Login */}
        {usuarioLogadoCookie === '1' ? (
          <button 
            onClick={handleLogout} 
            className="text-white hover:text-gray-300 mr-4"
          >
            Sair
          </button>
        ) : (
          <a href="/login" className="text-white hover:text-gray-300 mr-4">Login</a>
        )}
        <img
          src="millenium_redondo.png"
          alt="Logo"
          className="h-20"
        />
      </div>
    </nav>
  );
};

export default Navbar;
