import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <div className="d-flex justify-content-between align-items-center border p-2 mb-2">
            <div>
                <strong>{product.name}</strong> - Decripcion:{product.description} - Precio:{product.price} - Cantidad: {product.quantity}
            </div>
            <div>
                <button className="btn btn-warning me-2" onClick={() => onEdit(product)}>
                    Editar
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(product)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ProductItem;