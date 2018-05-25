import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, FormControl, ControlLabel, Radio, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { defineDadosTree } from "../actions";
import RefreshIndicator from 'material-ui/RefreshIndicator';

class SelecaoAnalise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analise: { hidden: true },
      cliente: "",
      status: "hide",
      filter: null,
      metodo: ''
    };

    this.click = this.click.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMetodo = this.handleChangeMetodo.bind(this);
    this.submit = this.submit.bind(this);
    this.opcoes = this.opcoes.bind(this);
    this.analise = this.analise.bind(this);
    this.erro = this.erro.bind(this);
  }

  click(evt) {
    var obj = this;
    switch (evt.target.value) {
      case 'analise':
        obj.setState({
          analise: { hidden: false },
          filter: obj.filtroAnalise
        });
        return {}
      default:
        obj.setState({ analise: { hidden: true }, filter: null });
        return
    }
  }

  handleChange(e) {
    this.setState({ cliente: e.target.value });
  }

  handleChangeMetodo(e) {
    this.setState({ metodo: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    var obj = this;
    var dados = obj.props.dadosarquivo.filter(row => {
      return row.cliente === obj.state.cliente
    })
    try {
      dados = obj.state.filter(obj, dados);
    } catch (error) {
      console.log('Não definiu filtro');
    }

    obj.setState({ status: 'loading' });
    obj.props.defineDadosTree({ treeData: dados, hiddentree: false });
    obj.setState({ status: 'ready' });
  }

  opcoes() {
    var op = []
    op.push(this.analise);
    op.push(this.erro);
    return op.map(x => { return x(); });
  }

  analise() {
    return (
      <Col sm={3} key='1'>
        <Radio required name="tipo" value="analise" onClick={this.click} >Analise metodo</Radio>
        <FormControl type="text" name="metodo"
          className={this.state.analise.hidden ? 'hidden' : ''}
          required={!this.state.analise.hidden}
          onChange={this.handleChangeMetodo}
          value={this.state.metodo} />
      </Col>
    )
  }

  filtroAnalise(obj, dados) {
    return dados.filter(x => {
      return x.metodo === obj.state.metodo;
    })
  }

  erro() {
    return (
      <Col sm={3} key='2'>
        <Radio required name="tipo" value="erros" onClick={this.click}>erros</Radio>
      </Col>
    )
  }

  render() {
    const style = {
      container: {
        position: 'relative',
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    };
    return (
      <Form hidden={this.props.hidden} onSubmit={this.submit}>
        <FormGroup>
          <ControlLabel>Cliente do log: </ControlLabel>
          <FormControl type="text" value={this.state.cliente} placeholder="Número do cliente" required onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Row>
            {this.opcoes()}
          </Row>
        </FormGroup>
        <Button type="submit">Executa</Button>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status={this.state.status}
          style={style.refresh}
        />
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