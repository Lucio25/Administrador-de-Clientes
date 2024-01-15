/* eslint-disable react/prop-types */
import {useNavigate, Form, redirect} from 'react-router-dom'

import { eliminarCliente } from '../data/Clientes'

export async function action(params){
  await eliminarCliente(params.params.clienteId)
  console.log(params.params.clienteId)
  return redirect('/')
}

function Cliente({cliente}) {

  const navigate = useNavigate()

  const {nombre, id, telefono, email, empresa} = cliente

  return (
    <tr className="border-b text-center">
        <td className='p-6 space-y-2'>
          <p className="text-2xl text-gray-800">{nombre}</p>
          <p>{empresa}</p>
        </td>
        <td className="p-6 space-y-1">
          <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
          <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Telefono: </span>{telefono}</p>
        </td>
        <td className="p-6 flex gap-5 justify-center"> 
          <button 
            type="button"
            className="text-blue-500 hover:text-blue-900 uppercase font-bold text-s"
            onClick={() => navigate(`/clientes/${id}/editar`)}
          >Editar</button>

          <Form
            method='post'
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e) => {

              if(!confirm('Deseas eliminar este cliente?')){
                e.preventDefault()
              }

            }}
          >
            <button 
              type="submit"
              className="text-red-400 hover:text-red-700 uppercase font-bold text-s"
            >Eliminar</button>
          </Form>

        </td>
    </tr>
  )
}

export default Cliente