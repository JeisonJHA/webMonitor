import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, Radio, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { defineDadosTree } from "../actions";

class SelecaoAnalise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analise: { hidden: true },
      cliente: ''
    };

    this.click = this.click.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  click(evt) {
    var obj = this;
    switch (evt.target.value) {
      case 'analise':
        obj.setState({ analise: { hidden: false } });
        return {}
      default:
        obj.setState({ analise: { hidden: true } });
        return
    }
  }

  handleChange(e) {
    this.setState({ cliente: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    var obj = this;
    var dados = obj.props.dadosarquivo.filter(row => {
      return row.cliente === obj.state.cliente
    })
    obj.props.defineDadosTree({ treeData: dados, hiddentree: false });
  }

  render() {
    return (
      <Form hidden={this.props.hidden} onSubmit={this.submit}>
        <FormGroup>
          <ControlLabel>Cliente do log: </ControlLabel>
          <FormControl type="text" value={this.state.cliente} placeholder="Número do cliente" required onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={4}>
              <Radio name="tipo" value="analise" onClick={this.click}>Analise metodo</Radio>
              <FormControl type="text" name="metodo" className={this.state.analise.hidden ? 'hidden' : ''} required={!this.state.analise.hidden} />
            </Col>
            <Col sm={4}>
              <Radio name="tipo" value="completo" onClick={this.click}>Completo</Radio>
            </Col>
            <Col sm={4}>
              <Radio name="tipo" value="other" onClick={this.click}>other</Radio>
            </Col>
          </Row>
        </FormGroup>
        <Button type="submit">Executa</Button>
      </Form>
    );
  }
}

const mapStateToProps = store => {
  return {
    hidden: store.defineDadosData.hiddenAnalise,
    dadosarquivo: store.defineDadosData.dadosarquivo
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ defineDadosTree }, dispatch);

// const mapDispatchToProps = dispatch => ({
//   defineDadosTree: (dados) => dispatch(defineDadosTree(dados))
// })

export default connect(mapStateToProps, mapDispatchToProps)(SelecaoAnalise);