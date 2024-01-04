import { Routes, Route, Navigate} from 'react-router-dom'
import { Login } from '../pages/login'
import { Cadastro } from '../pages/cadastro'
import { Home } from '../pages/home'

export const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/pagina-inicial" element={<p>Pagina Inicial</p>} />
            {/* <Route path="*" element={<Navigate to="/pagina-inicial"/>} /> */}
        </Routes>
    )
}