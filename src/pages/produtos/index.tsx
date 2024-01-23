// productsPage.js
import React, { useState, useEffect } from "react";
import TabelaProdutos from "../../components/tabelaProdutos";
import { Navbar } from "../../components/navbar";
import ModalAdicionarProduto from "../../components/modalAdicionarProdutos";
import { ref, get, query, orderByKey, DataSnapshot } from "firebase/database";
import { dataBaseRealTime } from "../../config/firebase";

// Defina o tipo Product com os campos necessários
interface modeloProduct {
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

const PaginaProdutos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<modeloProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dbRef = ref(dataBaseRealTime, "pecas");
        const productsQuery = query(dbRef, orderByKey());

        const snapshot = await get(productsQuery);

        // Anote o tipo de productsList como Product[]
        const productsList: modeloProduct[] = [];
        snapshot.forEach((childSnapshot: DataSnapshot) => {
          // Certifique-se de incluir os campos necessários
          productsList.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Adicionar Produto
        </button>
      </div>
      <ModalAdicionarProduto
        isOpen={openModal}
        setModalOpen={() => setOpenModal(!openModal)}
      >
        Conteúdo do modal
      </ModalAdicionarProduto>
      <div className="container mx-auto p-4">
        <TabelaProdutos products={products} />
      </div>
    </div>
  );
};

export default PaginaProdutos;
