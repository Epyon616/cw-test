import React from 'react';
import { Table } from 'react-bootstrap';

const ProductTable = ({products}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Size</th>
          <th>Product type</th>
          <th>Location</th>
          <th>Stock level</th>
        </tr>
      </thead>
      <tbody>
        { products.map((product, i) => {
          return(
            <tr key={`product-${i}`}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.size}</td>
              <td>{product.product_type}</td>
              <td>{product.location}</td>
              <td>{product.stock_level}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

export default ProductTable;