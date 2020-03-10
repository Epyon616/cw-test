import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Container, Row } from 'react-bootstrap';
import fetchProducts from '../../redux/dispatchers/productsDispatcher';
import FilterForm from './FilterForm';
import ProductTable from './ProductTable';

export class ProductCatalogue extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
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
    this.setState({ filterValue: value });
  }

  filterProducts() {
    const { products } = this.props;
    const { filterValue } = this.state;

    let productList = products.products;
    
    if(filterValue) {
      productList = products.products.filter((product) => { 
        return product.product_type === filterValue 
      });
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
              <FilterForm onChange={this.setFilterValue} />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <ProductTable products={products} />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <div>Loading...</div>
          </Row>
        </Container>
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