import React, { useRef, useState } from "react";

export const Login = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null); // Estado para controlar a mensagem de erro

  const handleLogin = () => {
    // Validação do usuário e senha
    if (formData.username === "root" && formData.password === "123") {
      // Configuração do cookie para usuário administrador (adm)
      document.cookie = "userRole=adm";
    } else if (formData.username === "user" && formData.password === "1234") {
      // Configuração do cookie para usuário comum (user)
      document.cookie = "userRole=user";
    } else {
      // Limpeza do cookie se a autenticação falhar
      document.cookie =
        "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setError("Usuário ou senha inválidos"); // Define a mensagem de erro
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpa a mensagem de erro ao enviar o formulário
    console.log("Formulário enviado:", formData);
    handleLogin(); // Adiciona esta linha para chamar handleLogin ao enviar o formulário
  };

  return (
    <div className="flex h-screen">
      {/* 60% da tela com o vídeo */}
      <div className="hidden lg:block lg:w-3/5 relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
          onEnded={() => {
            // Alteração aqui
            videoRef.current && videoRef.current.pause();
          }}
        >
          {/* Substitua "videoLogin.mp4" pelo caminho do seu vídeo */}
          <source src="videoLogin1.mp4" type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>

      {/* 40% da tela branca com o formulário */}
      <div className="w-full lg:w-2/5 bg-white p-4 flex items-center justify-center">
        <div className="max-w-lg mb-20">
          {/* Logo */}
          <div className="mb-4 text-center">
            <img
              src="milleniumTratado.png"
              alt="Logo"
              className="w-300 h-300 mx-auto mb-2"
            />
            <h2 className="text-xl font-bold">Seja bem-vindo</h2>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nome de usuário:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Senha:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Exibe a mensagem de erro */}
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Botão de Entrar */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Entrar
            </button>
          </form>

          {/* Link para Inscrever-se */}
          <div className="mt-4 text-center">
            <p>
              Não tem uma conta?{" "}
              <a href="/cadastro" className="text-blue-500">
                Inscrever-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

