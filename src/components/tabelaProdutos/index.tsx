// tabelaProdutos/index.tsx

import React, { useEffect, useState } from "react";
import Paginacao from "../paginacao";
import { database } from "../../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ModalEditarProduto from "../modalEditarProdutos"; // Importe o componente ModalEditarProduto
import ModalExcluirProduto from "../modalExcluirProdutos"; // Importe o componente ModalExcluirProduto

interface Product {
  id: number;
  nome: string;
  preco: string;
  rastreador: string;
  modelo: string;
  classes: string;
  locacao: string;
  dataRetirada: string;
  tempoLocacao: string;
  dataRetorno: string;
  contato: string;
  nomeCliente: string;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const itemsPerPage = 5; // Defina o número de itens por página
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const [val, setVal] = useState<Product[]>([]);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const value = collection(database, "teste");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(
        dbVal.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as unknown as Product)
        )
      ); // Adicionando a assertiva de tipo "as Product"
    };

    console.log(getData());
  }, []);

  return (
    <div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Preço</th>
            <th className="py-2 px-4 border-b">Rastreador</th>
            <th className="py-2 px-4 border-b">Modelo</th>
            <th className="py-2 px-4 border-b">Classes</th>
            <th className="py-2 px-4 border-b">Locação</th>
            <th className="py-2 px-4 border-b">Data de Retirada</th>
            <th className="py-2 px-4 border-b">Tempo de Locação</th>
            <th className="py-2 px-4 border-b">Data de Retorno</th>
            <th className="py-2 px-4 border-b">Contato</th>
            <th className="py-2 px-4 border-b">Nome do Cliente</th>
            <th className="py-2 px-4 border-b">Editar</th>
            <th className="py-2 px-4 border-b">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.nome}</td>
              <td className="py-2 px-4 border-b">{product.preco}</td>
              <td className="py-2 px-4 border-b">{product.rastreador}</td>
              <td className="py-2 px-4 border-b">{product.modelo}</td>
              <td className="py-2 px-4 border-b">{product.classes}</td>
              <td className="py-2 px-4 border-b">{product.locacao}</td>
              <td className="py-2 px-4 border-b">{product.dataRetirada}</td>
              <td className="py-2 px-4 border-b">{product.tempoLocacao}</td>
              <td className="py-2 px-4 border-b">{product.dataRetorno}</td>
              <td className="py-2 px-4 border-b">{product.contato}</td>
              <td className="py-2 px-4 border-b">{product.nomeCliente}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-500"
                >
                  Editar
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="text-red-500"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginacao
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        currentPage={currentPage}
        paginate={paginate}
      />

      {/* Tabela existente e paginação */}
      <div>
        {isEditModalOpen && selectedProduct && (
          <ModalEditarProduto
            product={selectedProduct}
            isOpen={isEditModalOpen}
            setModalOpen={() => setIsEditModalOpen(false)}
            // Função para atualizar a lista de produtos após a edição
          />
        )}

        {isDeleteModalOpen && selectedProduct && (
          <ModalExcluirProduto
            product={selectedProduct}
            isOpen={isDeleteModalOpen}
            setModalOpen={() => setIsDeleteModalOpen(false)}
            // Função para atualizar a lista de produtos após a exclusão
          />
        )}
      </div>
    </div>
  );
};

export default ProductTable;
