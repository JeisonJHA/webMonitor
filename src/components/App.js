import React, { Component } from 'react';
import Tree from "./Tree";
import { connect } from 'react-redux';
import InputFile from './inputFile';
import SelecaoAnalise from './SelecaoAnalise';
import TreeNode from "./TreeNode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='container'>
        <TreeNode />
        <InputFile />
        <SelecaoAnalise />
        <Tree />
      </div >
    );
  }
}

export default connect()(App);
