import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebase } from "../../config/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RootState {
  usuarioEmail: string; // substitua pelo tipo real do seu estado
  // Adicione outros campos do seu estado global, se houver
}

export const RecuperarSenha = () => {
  const auth = getAuth(firebase.app);
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string | undefined>(undefined);

  const [sendPasswordResetEmail, loading, error] =
    useSendPasswordResetEmail(auth);

  const recuperarSenha = () => {
    sendPasswordResetEmail(email)
      .then(() => {
        setMsg("Enviamos um link no seu email para você redefinir sua senha!");
        setTimeout(() => {
            redirectLogin("/login");
          }, 2000);
      })
      .catch(() => {
        setMsg("Verifique se o email está correto!");
      });
  };

  const redirectLogin = useNavigate();

  return (
    <>
      <div className="flex h-screen">
        {/* 60% da tela com o vídeo - Pode ser mantido ou removido, dependendo da sua preferência */}
        <div className="hidden lg:block lg:w-3/5 relative">
          <video
            autoPlay
            muted
            className="w-full h-full object-cover"
            onEnded={() => {}}
          >
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
              <h2 className="text-xl font-bold">Recuperar Senha</h2>
            </div>

            {/* Formulário de Recuperação de Senha */}
            <form className="text-center form-login mx-auto mt-5">
              <div className="mb-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Exibe a mensagem de sucesso ou erro */}
              {msg && <div className="mb-4 text-center">{msg}</div>}

              {/* Botão de Recuperar Senha */}
              <button
                type="button"
                onClick={recuperarSenha}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Recuperar Senha
              </button>
            </form>

            {/* Link para a página de Login */}
            <div className="mt-4 text-center">
              <p>
                Voltar para{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecuperarSenha;
