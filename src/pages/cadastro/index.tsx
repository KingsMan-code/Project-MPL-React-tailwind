import React, { useRef, useState } from 'react';

export const Cadastro = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleCadastro = () => {
    // Validação do formulário
    if (
      formData.nome === '' ||
      formData.email === '' ||
      formData.senha === '' ||
      formData.confirmarSenha === ''
    ) {
      setError('Preencha todos os campos.');
      return;
    }

    // Validação da senha
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    // Lógica para cadastro (aqui você pode adicionar sua lógica específica)

    // Limpar erros se tudo estiver ok
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    console.log('Formulário enviado:', formData);
    handleCadastro();
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
          onEnded={() => videoRef.current && videoRef.current.pause()}
        >
          {/* Substitua "videoLogin.mp4" pelo caminho do seu vídeo */}
          <source src="videoLogin1.mp4" type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>

      {/* 40% da tela branca com o formulário */}
      <div className="w-full lg:w-2/5 bg-white p-4 flex items-center justify-center">
        <div className="max-w-lg mb-50">
          {/* Logo */}
          <div className="mb-3 text-center">
            <img
              src="milleniumTratado.png"
              alt="Logo"
              className="w-50 h-50 mx-auto"
            />
            <h2 className="text-xl font-bold">Cadastre-se</h2>
          </div>

          {/* Formulário de Cadastro */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="senha"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Senha:
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="confirmarSenha"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirmar Senha:
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={(e) =>
                  setFormData({ ...formData, confirmarSenha: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Exibe a mensagem de erro */}
            {error && (
              <div className="mb-3 text-red-500 text-sm">{error}</div>
            )}

            {/* Botão de Cadastrar */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cadastrar
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-3 text-center">
            <p>
              Já tem uma conta?{' '}
              <a href="/login" className="text-blue-500">
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
