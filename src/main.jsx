import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente.jsx'
import { action as eliminarClienteAction} from './components/Cliente.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    //element inyecta el contenido en la pantalla
    element: <Layout/>,
    children: [
      {
        //el index true seria como un path de la pagina principal, solo muestra en el path que tenga arriba (afuera del children)
        index: true,
        //si element esta en un children, necesitamos el outlet en el element padre
        element: <Index/>,
        //el loader de index es clientesLoader
        loader: clientesLoader,

        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        //los : indican una ruta dinamica, es decir, varia cuando clickeamos distintos clientes, y lo q esta despues es la variable que se generara para contener ese valor
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/eliminar',
        // element: <EditarCliente />,
        action: eliminarClienteAction,
        // errorElement: <ErrorPage />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
