import React, { Component } from "react";
import { connect } from 'react-redux';
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree';
// import FileExplorerTheme from 'reactsortable-tree-theme-minimal';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { Form, FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: "",
      searchFocusIndex: 0,
      searchFoundCount: null,
      consulta: '',
      treeData: []
    }
  }
  mostraConsulta(node) {
    this.setState({ consulta: node.consulta });
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props)
    // loadFileTree(props.treeData);
    var retorno = props.treeData;
    return {
      treeData: getTreeFromFlatData({
        flatData: retorno.map(node => ({ ...node, title: node.title })),
        getKey: node => node.call, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key
        rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
      })
    }
  }
  render() {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });
    return (
      <Form hidden={this.props.hidden} width='100%'>
        <FormGroup
          style={{ display: 'inline-block' }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <Row>
            <Col sm={8}>
              <FormControl id="find-box" type="text" placeholder="Search..." style={{ fontSize: '1rem' }} value={searchString}
                onChange={event => this.setState({ searchString: event.target.value })} />
            </Col>
            <Col sm={4}>
              <Button type="button" disabled={!searchFoundCount} onClick={event => {
                event.preventDefault(); selectPrevMatch();
              }}>
                &lt;
              </Button>
              <Button type="submit" disabled={!searchFoundCount} onClick={event => {
                event.preventDefault(); selectNextMatch();
              }}>
                &gt;
              </Button>
              <span>
                &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                &nbsp;/&nbsp;
            {searchFoundCount || 0}
              </span>
            </Col>
          </Row>
        </FormGroup >
        <div display='table-row' >
          <SortableTree
            style={{ height: 750, display: 'table-cell', width: 900, class: 'Pane vertical' }}
            treeData={this.state.treeData}
            // treeData={this.loadFileTree()}
            canDrag={false}
            expandOnlySearchedNodes={true}
            getNodeKey={({ node }) => node.call}
            // onChange={treeData => this.loadFileTree(this.props.treeData)}
            onChange={treeData => this.setState({ treeData })}
            searchMethod={customSearchMethod}
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            theme={FileExplorerTheme}
            generateNodeProps={({ node, path }) => {
              var corTipo = '';
              var corTexto = 'black';
              // console.log('nodo', node);
              // console.log('path', path);
              // var nodoAtual = this.state.treeData.find(x => {
              //   return x.call === path;
              // });
              var nodoAtual = node;
              // console.log(nodoAtual);
              if (!nodoAtual) { return }

              if (nodoAtual.tipo === 'ENTRADA') {
                corTipo = 'green';
              }
              else if (nodoAtual.tipo === 'SAIDA') {
                corTipo = 'red';
              }
              else if (nodoAtual.tipo === 'SQL') {
                corTipo = 'orange';
              }
              else if (nodoAtual.tipo === 'AVISO') {
                corTipo = 'blue';
                corTexto = 'white';
              }

              return {
                style: {
                  background: `${corTipo.toLowerCase()}`,
                  color: corTexto
                },
                buttons: [<button onClick={(event) => { event.preventDefault(); this.mostraConsulta(node) }}>i</button>]
              }
            }}
          />
          {/* <span class="Resizer vertical " style={{ cursor: 'col-resize', height: 'auto', width: '10px' }}></span> */}
          <div style={{ display: 'table-cell', width: '20%', class: 'Pane vertical' }}>
            {/* <form> */}
            <FormGroup controlId="formControlsTextarea" >
              <ControlLabel>Consulta</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" value={this.state.consulta} height='100%' />
            </FormGroup>
            {/* </form> */}
          </div>
        </div >
      </Form >
    )
  }
}

const mapStateToProps = store => {
  console.log('Tree', store);
  return {
    treeData: store.defineDadosTree.treeData,
    hidden: store.defineDadosTree.hiddentree
    // treeData: [],
    // hidden: store.defineDadosTree.hiddentree
  }
}


export default connect(mapStateToProps)(Tree);