import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import React, { useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { firebase } from "../../config/firebase";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

interface RootState {
  usuarioEmail: string; // substitua pelo tipo real do seu estado
  // Adicione outros campos do seu estado global, se houver
}

export const Login = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const auth = getAuth(firebase.app);
  const [msgTipo, setMsgTipo] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | undefined>(undefined);

  const [signInWithEmailAndPassword, user, loading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const usuarioRedux = useSelector((state: RootState) => state.usuarioEmail);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(formData.email, formData.password);
      setMsgTipo("sucesso");
      setTimeout(() => {
        dispatch({ type: "LOG_IN", usuarioEmail: formData.email });
      }, 2000);
    } catch (error) {
      setMsgTipo("erro");
      setError("Usuário ou senha inválidos");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    handleLogin();
  };

  // Decide quando renderizar o componente Navigate
  const renderNavigate = usuarioRedux ? <Navigate to="/" /> : null;

  return (
    <>
      {usuarioRedux ? (
        <>{renderNavigate}</>
      ) : (
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
                  <div className="mb-4 text-red-500 text-sm">{error}</div>
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
                  <Link to="/cadastro" className="text-blue-500">
                    Inscrever-se
                  </Link>
                </p>
              </div>
              <div className="mt-4 text-center">
                <p>
                  Esqueceu sua Senha?{" "}
                  <Link to="/recuperarSenha" className="text-blue-500">
                    Recuperar Senha
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
