import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit, onDelete }) => {
    console.log(products)
    return (
        <div>
            {products.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                products.map((product, index) => (
                    <ProductItem
                        key={index}
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
};

export default ProductList;