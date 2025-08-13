import { useState } from 'react';

function CreatePost() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const newPost = { titulo, contenido };

    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setMensaje('¡Post creado exitosamente!');
        setTitulo('');
        setContenido('');
      } else {
        const errorText = await response.text();
        setMensaje(`Error al crear el post: ${errorText}`);
      }
    } catch (error) {
      setMensaje('Hubo un error de conexión.');
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Guardar Post</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default CreatePost;