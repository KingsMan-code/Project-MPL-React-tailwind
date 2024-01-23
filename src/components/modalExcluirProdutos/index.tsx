import React from "react";
import { ref, remove } from "firebase/database";
import { dataBaseRealTime } from "../../config/firebase";

interface ModalExcluirProdutoProps {
  product: {
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
  };
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const ModalExcluirProduto: React.FC<ModalExcluirProdutoProps> = ({
  product,
  isOpen,
  setModalOpen,
}) => {
  const handleDelete = async () => {
    try {
      const productRef = ref(dataBaseRealTime, "pecas/" + product.id);
      await remove(productRef);
      alert("Produto excluído com sucesso!");
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto.");
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={
        isOpen
          ? "fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-50"
          : "hidden"
      }
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg text-black w-4/5 h-5/5">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Excluir Produto</h2>
          <div
            className="cursor-pointer text-xl font-bold"
            onClick={() => setModalOpen(false)}
          >
            x
          </div>
        </div>

        <p>Tem certeza que deseja excluir o produto {product.nome}?</p>
        <div className="flex justify-between mt-6">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">
            Excluir
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirProduto;
