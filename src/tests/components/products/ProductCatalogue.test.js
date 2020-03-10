import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductCatalogue } from '../../../components/products/ProductCatalogue';

Enzyme.configure({ adapter: new Adapter() });

describe('ProductCatalogue Component', () => {
  let wrapper;

  const products = {
    products: [
      { id: 1, title: 'red shirt', size: 's', product_type: 'shirt' },
      { id: 2, title: 'blue blazer', size: 'm', product_type: 'blazer' },
      { id: 3, title: 'yellow apron', size: 'l', product_type: 'apron' },
      { id: 4, title: 'green cap', size: 'xl', product_type: 'cap'},
    ]
  };

  beforeAll(() => {
    wrapper = mount(<ProductCatalogue fetchProducts={() => {}} products={products} pending={false} />);
  });

  it('should render the product catalogue page', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual('Products');
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('thead').exists()).toBe(true);
    expect(wrapper.find('thead tr').children().length).toEqual(6);
  });
});