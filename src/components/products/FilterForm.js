import React from 'react';
import { Form } from 'react-bootstrap';

const FilterForm = ({ onChange }) => {
  return (
    <Form>
    <Form.Group>
      <Form.Label>Filter:</Form.Label>
      <Form.Control as="select" onChange={e => onChange(e.target.value)}>
      <option value="">-</option>
        <option value="APRON">APRON</option>
        <option value="BLAZER">BLAZER</option>
        <option value="CAP">CAP</option>
        <option value="SHIRT">SHIRT</option>
      </Form.Control>
    </Form.Group>
  </Form>
  );
}

export default FilterForm;