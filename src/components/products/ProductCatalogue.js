import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import fetchProducts from '../../redux/dispatchers/productsDispatcher';

export class ProductCatalogue extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.state = {
      filterValue: '',
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  } 

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending !== false) return false;
    return true;
  }

  setFilterValue(value) {
    this.setState({filterValue: value });
  }

  filterProducts() {
    const { products } = this.props;
    const { filterValue } = this.state;

    let productList = []
    
    if(filterValue) {
      productList = products.products.filter((product) => { 
        return product.product_type === filterValue 
      });
    } else {
      productList = products.products;
    }

    return productList;
  }

  render() {
    if(this.shouldComponentRender()) {
      const products = this.filterProducts();
      return ( 
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1>Products</h1>    
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Filter:</Form.Label>
                  <Form.Control as="select" onChange={e => this.setFilterValue(e.target.value)}>
                    <option value="APRON">APRON</option>
                    <option value="BLAZER">BLAZER</option>
                    <option value="CAP">CAP</option>
                    <option value="SHIRT">SHIRT</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
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
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  products: state.productsReducer.products,
  pending: state.productsReducer.pending,
  error: state.productsReducer.error,
  filteredProducts: state.productsReducer.products,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
  fetchProducts 
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ProductCatalogue);