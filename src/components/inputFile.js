import React, { Component } from "react";
import loadFile from '../transformLogJson';
import { defineConfigDados } from '../actions';
import { FormControl } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

class InputFile extends Component {
  constructor(props) {
    super(props);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }
  handleFileSelect(evt) {
    var obj = this
    var files = evt.target.files;
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      loadFile(theFile.target.result, obj.props.defineConfigDados);
    });

    for (const f of files) {
      reader.readAsText(f);
    }
  }

  render() {
    return (
      <FormControl type="file" id="files" name="files[]" multiple onChange={this.handleFileSelect} />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ defineConfigDados }, dispatch);

export default connect(null, mapDispatchToProps)(InputFile);