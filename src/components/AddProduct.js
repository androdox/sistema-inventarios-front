import React, { useState, useEffect } from 'react';

const AddProduct = ({ onAdd, productToEdit, onEdit }) => {
    const [name, setName] = useState(productToEdit ? productToEdit.name : '');
    const [description, setDescription] = useState(productToEdit ? productToEdit.description : '');
    const [price, setPrice] = useState(productToEdit ? productToEdit.price : '');
    const [quantity, setQuantity] = useState(productToEdit ? productToEdit.quantity : '');

    useEffect(() => {
        console.log('productToEdit', productToEdit)
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description)
            setPrice(productToEdit.price)
            setQuantity(productToEdit.quantity);
        } else {
            setName('');
            setQuantity(0);
        }
    }, [productToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            price,
            quantity,
        };

        // Validación adicional para asegurar que la cantidad es mayor que 0
        if (quantity <= 0) {
            alert("La cantidad debe ser mayor que 0.");
            return;
        }

        if (productToEdit) {
            onEdit({ ...productToEdit, name, description, price, quantity });
        } else {
            onAdd(newProduct);
        }

        // Restablecer el formulario
        setName('');
        setDescription('');
        setPrice('');
        setQuantity(0);
    };

    return (
        <div className="mb-4">
            <h2>{productToEdit ? 'Editar Producto' : 'Añadir Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {productToEdit ? 'Actualizar Producto' : 'Añadir Producto'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;