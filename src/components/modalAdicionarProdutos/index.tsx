import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { dataBaseRealTime } from "../../config/firebase";
import {
  ref,
  set,
  get,
  update,
  remove,
  child,
  query,
  orderByKey,
  DataSnapshot,
} from "firebase/database";

interface ModalAdicionarProdutoProps {
  isOpen: boolean;
  setModalOpen: () => void;
  children: React.ReactNode;
}

const ModalAdicionarProduto: React.FC<ModalAdicionarProdutoProps> = ({
  isOpen,
  setModalOpen,
}) => {
  const initialValues = {
    nome: "",
    preco: "",
    rastreador: "",
    modelo: "Dell",
    classes: "Informatica",
    locacao: "",
    dataRetirada: "",
    tempoLocacao: "",
    dataRetorno: "",
    contato: "",
    nomeCliente: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [contador, setContador] = useState<number>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "select-multiple" && e.target instanceof HTMLSelectElement
        ? Array.from(e.target.selectedOptions, (option) => option.value)
        : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    salvarDadosNoRealtimeDatabase();
    setModalOpen();
    setFormValues(initialValues); // Resetar o formulário
  };

  const handleCancelClick = () => {
    setModalOpen();
    setFormValues(initialValues); // Resetar o formulário
    window.location.reload()
  };

  const isNullOrWhiteSpaces = (value: string | number | null | undefined): boolean => {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === "");
  };

  const salvarDadosNoRealtimeDatabase = async () => {
    const formFields: (keyof typeof formValues)[] = [
      "nome", "preco", "rastreador", "modelo", "classes",
      "locacao", "dataRetirada", "tempoLocacao", "dataRetorno",
      "contato", "nomeCliente",
    ];

    const hasEmptyFields = formFields.some((field) =>
      isNullOrWhiteSpaces(formValues[field])
    );

    if (hasEmptyFields) {
      console.error("Preencha todos os campos do formulário.");
      alert("Preencha todos os campos do formulário.");
      return;
    }

    const dbRef = ref(dataBaseRealTime, "pecas");

    try {
      const snapshot = await get(child(dbRef, 'pecas/' + contador));

      if (snapshot.exists()) {
        console.error("O produto já existe. Tente um nome diferente.");
        alert("O produto já existe. Tente um nome diferente.");
        return;
      }

      await set(ref(dataBaseRealTime, 'pecas/' + contador), formValues);

      console.log("Produto adicionado com sucesso ao Realtime Database!");
      alert("Produto adicionado com sucesso!");
      window.location.reload()
    } catch (error) {
      console.error("Erro ao adicionar produto ao Realtime Database:", error);
      alert("Erro ao adicionar produto ao Realtime Database.");
      window.location.reload()
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const dbRef = ref(dataBaseRealTime, "pecas");

  //     try {
  //       const snapshot = await get(dbRef);
  //       snapshot.forEach((childSnapshot: DataSnapshot) => {
  //         console.log(childSnapshot.key);
  //         // Aqui você pode fazer o que quiser com childSnapshot.key
  //       });
  //     } catch (error) {
  //       console.error("Erro ao buscar dados:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(dataBaseRealTime, "pecas");

      try {
        const snapshot = await get(dbRef);
        snapshot.forEach((childSnapshot: DataSnapshot) => {
          const key = parseInt(childSnapshot.key || "0", 10);
          if (!isNaN(key) && key >= contador) {
            setContador(key + 1);
          }
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [contador]); 


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
          <h2 className="text-2xl font-bold mb-4">Adicionar Produto </h2>
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
              Cadastrar
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

export default ModalAdicionarProduto;
