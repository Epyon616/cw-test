import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import loginUser from '../../redux/dispatchers/authenticationDispatcher';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    if (username && password) {
       this.props.loginUser(username, password);
       this.props.history.push('/products');
    }
  }

  render() {
    const { error } = this.props;
    return (
      <Container fluid>
        <Row>
          <h1>Login</h1>
        </Row>
        <Row>
          {error ? error : ''}
        </Row>
        <Row>
          <Col>
            <Form name="login" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  name="username"
                  type="text" 
                  placeholder="Enter username"
                  onChange={this.handleChange}
                /> 
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password" 
                  placeholder="Enter password" 
                  onChange={this.handleChange}
                /> 
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.authenticationReducer.error,
  user: state.authenticationReducer.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);