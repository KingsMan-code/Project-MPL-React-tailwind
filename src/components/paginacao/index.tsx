// Paginacao.js

import React from 'react';

interface PaginacaoProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              } py-2 px-4 border rounded`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacao;
