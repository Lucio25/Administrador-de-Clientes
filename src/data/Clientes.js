export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    
    // Lee el cuerpo de la respuesta como texto
    const textoRespuesta = await respuesta.text();

    try {
        // Convierte el texto a JSON
        const resultado = JSON.parse(textoRespuesta);
        console.log('Resultado JSON:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error al convertir la respuesta a JSON:', error);
        throw error;
    }
}

export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    
    // Lee el cuerpo de la respuesta como texto
    const textoRespuesta = await respuesta.text();

    try {
        // Convierte el texto a JSON
        const resultado = JSON.parse(textoRespuesta);
        console.log('Resultado JSON:', resultado);
        return resultado;
    } catch (error) {
        console.error('Error al convertir la respuesta a JSON:', error);
        throw error;
    }
}

export async function agregarCliente(datos){
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function actualizarCliente(id, datos){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'DELETE',
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}

