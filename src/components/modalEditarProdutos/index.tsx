import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../../config/firebase";

import { ref, update, get, child } from "firebase/database";
import { dataBaseRealTime } from "../../config/firebase";

interface ModalEditarProdutoProps {
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
  setModalOpen: () => void;
}

const ModalEditarProduto: React.FC<ModalEditarProdutoProps> = ({
    product,
    isOpen,
    setModalOpen,
  }) => {
    const initialValues = product;
  
    const [formValues, setFormValues] = useState(initialValues);
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const dbRef = ref(dataBaseRealTime, 'pecas/' + product.id);
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          await update(dbRef, formValues);
          alert("Produto atualizado com sucesso!");
          setModalOpen();
          window.location.reload()
        } else {
          alert("Erro: produto não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto.");
        window.location.reload()
      }
    };
  
    const handleCancelClick = () => {
      setModalOpen();
      setFormValues(initialValues); // Resetar o formulário
      window.location.reload()
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
          <h2 className="text-2xl font-bold mb-4">Editar Produto </h2>
          <div
            className="cursor-pointer text-xl font-bold"
            onClick={setModalOpen}
          >
            x
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          {/* Nome */}
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formValues.nome}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Preço e Rastreador na mesma linha */}
          <div className="flex justify-between mt-6">
            {/* Preço */}
            <div className="mb-4 mr-4 w-full">
              <label
                htmlFor="preco"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Preço:
              </label>
              <input
                type="number"
                step="0.01"
                id="preco"
                name="preco"
                value={formValues.preco}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Rastreador */}
            <div className="mb-4 w-full">
              <label
                htmlFor="rastreador"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Rastreador:
              </label>
              <input
                type="text"
                id="rastreador"
                name="rastreador"
                value={formValues.rastreador}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            {/* Modelo */}
            <div className="mb-4 mr-4 w-full">
              <label
                htmlFor="modelo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Modelo:
              </label>
              <select
                id="modelo"
                name="modelo"
                value={formValues.modelo}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="dell">Dell</option>
                <option value="sony">Sony</option>
              </select>
            </div>

            {/* Classes */}
            <div className="mb-4 w-full">
              <label
                htmlFor="classes"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Classes:
              </label>
              <select
                id="classes"
                name="classes"
                value={formValues.classes}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="Informatica">Informática</option>
                <option value="AudioVisual">AudioVisual</option>
                <option value="Eletrica">Elétrica</option>
                <option value="Rede">Rede</option>
                <option value="Ferramental">Ferramental</option>
              </select>
            </div>
          </div>

          {/* Data de Retirada e Data de Retorno na mesma linha */}
          <div className="flex justify-between mt-6">
            {/* Data de Retirada */}
            <div className="mb-4 mr-4 w-full">
              <label
                htmlFor="dataRetirada"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Data de Retirada:
              </label>
              <input
                type="date"
                id="dataRetirada"
                name="dataRetirada"
                value={formValues.dataRetirada}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Data de Retorno */}
            <div className="mb-4 w-full">
              <label
                htmlFor="dataRetorno"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Data de Retorno:
              </label>
              <input
                type="date"
                id="dataRetorno"
                name="dataRetorno"
                value={formValues.dataRetorno}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          {/* Nome do Cliente e Contato na mesma linha */}
          <div className="flex justify-between mt-6">
            {/* Nome do Cliente */}
            <div className="mb-4 mr-4 w-full">
              <label
                htmlFor="nomeCliente"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nome do Cliente:
              </label>
              <input
                type="text"
                id="nomeCliente"
                name="nomeCliente"
                value={formValues.nomeCliente}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Contato */}
            <div className="mb-4 w-full">
              <label
                htmlFor="contato"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contato:
              </label>
              <input
                type="tel"
                id="contato"
                name="contato"
                value={formValues.contato}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          {/* Localização e Tempo de Locação na mesma linha */}
          <div className="flex justify-between mt-6">
            {/* Localização */}
            <div className="mb-4 mr-4 w-full">
              <label
                htmlFor="locacao"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Locação:
              </label>
              <input
                type="text"
                id="locacao"
                name="locacao"
                value={formValues.locacao}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Tempo de Locação */}
            <div className="mb-4 w-full">
              <label
                htmlFor="tempoLocacao"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tempo de Locação (dias):
              </label>
              <input
                type="number"
                id="tempoLocacao"
                name="tempoLocacao"
                value={formValues.tempoLocacao}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          {/* Outros campos... */}

          {/* Botões */}
          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Editar
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarProduto;
