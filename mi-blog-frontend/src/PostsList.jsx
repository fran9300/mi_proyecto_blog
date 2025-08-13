import { useState, useEffect } from 'react';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los posts');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Función para eliminar un post
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Actualiza el estado para que el post eliminado desaparezca de la lista
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Error al eliminar el post.');
      }
    } catch (error) {
      alert('Hubo un error de conexión al intentar eliminar el post.');
    }
  };

  if (loading) return <div>Cargando posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Posts del Blog</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.titulo}</h2>
          <p>{post.contenido}</p>
          <button onClick={() => handleDelete(post.id)}>Eliminar</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostsList;