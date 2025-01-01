import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Manejar inicio de sesión
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  // Capturar el token desde la URL
  const extractTokenFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setToken(token);
      const userData = parseJwt(token);
      setUser(userData);
    }
  }, []);

  // Decodificar el JWT
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  };

  // Obtener productos
  const fetchProducts = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Datos de productos no válidos', data);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }, [token]); // La función depende de 'token'

  const handleDeleteProduct = async (productToDelete) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/products/${productToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.ok) {
        // Elimina el producto del estado si se ha eliminado correctamente
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productToDelete.id)
        );
      } else {
        console.error('Error al eliminar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };


  const handleEditProduct = async (updatedProduct) => {
    if (!token) return; // Asegúrate de que haya un token

    try {
      const response = await fetch(`http://localhost:3000/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        // Actualiza el estado con los datos del producto actualizado
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === data[0].id ? data[0] : product
          )
        );
        setProductToEdit(null); // Cierra el formulario de edición
      } else {
        console.error('Error al editar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    if (!token) return; // Asegúrate de que haya un token

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct), // Convertir el producto a JSON
      });
      console.log(response)
      if (response.ok) {
        const addedProduct = await response.json(); // Obtener el producto agregado
        console.log("Producto agregado:", addedProduct);

        // Actualiza el estado con el nuevo producto
        setProducts((prevProducts) => {
          const updatedProducts = [...prevProducts, addedProduct[0]];

          return updatedProducts; // Devuelve el nuevo array con el producto agregado
        });
      } else {
        console.error('Error al agregar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  // Capturar el token al cargar la página
  useEffect(() => {
    if (!token) {
      extractTokenFromUrl();
    } else {
      fetchProducts();
    }
  }, [token, extractTokenFromUrl, fetchProducts]); // Dependencias del useEffect

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1 className="text-center">Gestión de Inventarios</h1>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <button onClick={handleLogin} className="btn btn-primary">
                Iniciar sesión con Google
              </button>
            ) : (
              <div>
                <AddProduct
                  onAdd={handleAddProduct}
                  productToEdit={productToEdit}
                  onEdit={handleEditProduct}
                />
                <h2 className="mt-4">Lista de Productos</h2>
                <ProductList
                  products={products}
                  onEdit={setProductToEdit}
                  onDelete={handleDeleteProduct}
                />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
