import {useLoaderData, Form, useNavigate, redirect, useActionData} from 'react-router-dom'
import { obtenerCliente, actualizarCliente } from '../data/Clientes'



import Formulario from '../components/Formulario'
import Error from '../components/Error'

obtenerCliente

export async function loader ({params}) {
    const cliente = await obtenerCliente(params.clienteId)

    //vamos a crear una respuesta personalizada por si no se encuentra el id
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'Cliente no encontrado'
        })
    }
    return cliente
}

export async function action({request, params}){
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)
  
    const email = formData.get('email')
  
    //Validacion
    const errores = []
    if(Object.values(datos).includes('')){
      errores.push('Todos los campos son obligatorios')
    }
  
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
    if (!regex.test(email)){
      errores.push('El email no es valido')
    }
  
    //Retornar datos si hay errores
    if(Object.keys(errores).length){
      return errores
    }
  
    await actualizarCliente(params.clienteId, datos)
  
    //redirect es para redireccionar en actions o loaders
    return redirect('/')
}

function EditarCliente() {

    const cliente = useLoaderData()
    const navigate = useNavigate()
    const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Modificar los datos del cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 uppercase font-bold"
          //navigate es buena opcion para redireccionar por medio de un boton
          onClick={() => navigate('/')}
        >Volver</button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

          {/*  El optional chaning (?) se refiere a si un objeto su propiedad no existe y te marcaría error se suele utilizar el optional chaning con el ? */}
        {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error>)}

          {/* Siempre que usemos un componente con children es porque vamos a usar las dos llaves, y xq entre medio de estas colocaremos el hijo */}
          

        <Form 
          method='post'
          noValidate
        >

          <Formulario
            cliente={cliente}
          />

          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 uppercase p-3 font-bold text-white text-lg rounded-sm'
            value='Guardar Cambios'
          />

        </Form>

      </div>
    </>
  )
}

export default EditarCliente