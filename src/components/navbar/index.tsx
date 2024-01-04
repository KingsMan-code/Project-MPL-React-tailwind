import React from 'react';

export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-cyan-600 to-sky-900 p-6 h-24 flex items-center justify-between"> {/* Ajustei a altura para h-24 */}
      <div className="flex items-center space-x-8"> {/* Aumentei o espaço para space-x-8 */}
        <a href="/" className="text-white hover:text-gray-300">Home</a>
        <a href="products" className="text-white hover:text-gray-300">Products</a>
        <a href="contact" className="text-white hover:text-gray-300">Contact</a>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-white hover:text-gray-300">
          <i className="fas fa-search"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <i className="fas fa-bell"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <i className="fas fa-user"></i>
        </a>
      </div>
      <img
        src="millenium_redondo.png" // Substitua pelo caminho da sua imagem
        alt="Logo"
        className="h-20" // Ajuste o tamanho da imagem conforme necessário
      />
    </nav>
  );
};
