import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login";
import { Cadastro } from "../pages/cadastro";
import { Home } from "../pages/home";
import PaginaProdutos from "../pages/produtos";
import { Contatos } from "../pages/contatos";
import { Provider } from "react-redux";
import store from '../store';
import RecuperarSenha from "../pages/recuperarSenha";

export const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperarSenha" element={<RecuperarSenha />} />
        <Route path="/produtos" element={<PaginaProdutos />} />
        <Route path="/contatos" element={<Contatos />} />
        {/* <Route path="*" element={<Navigate to="/pagina-inicial"/>} /> */}
      </Routes>
    </Provider>
  );
};
