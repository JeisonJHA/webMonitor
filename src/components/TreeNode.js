import React, { Component } from "react";
import { connect } from "react-redux";
import { Glyphicon } from "react-bootstrap";
// import * as actions from "../actions";

export class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: {}
    };
    this.toggleHiddenChild = this.toggleHiddenChild.bind(this);
    this.renderChild = this.renderChild.bind(this);
  };

  childIds = (state, action) => {
    return [...state, action.childId];
  };

  createNode = (action) => {
    return {
      id: action.nodeId,
      counter: 0,
      childIds: [],
      hiddenChild: true
    };
  };

  // node = (state, action) => {
  //   switch (action.type) {
  // case CREATE_NODE:
  // case INCREMENT:
  //   return {
  //     ...state,
  //     counter: state.counter + 1
  //   };
  //     case ADD_CHILD:
  //       return {
  //         ...state,
  //         childIds: childIds(state.childIds, action),
  //         counter: state.childIds.length + 1
  //       };
  //     default:
  //       return state;
  //   }
  // };

  // deleteMany = (state, ids) => {
  //   state = { ...state };
  //   ids.forEach(id => delete state[id]);
  //   return state;
  // };


  // deleteNode = nodeId => {
  //   const { treeData } = this.state;
  //   const descendantIds = this.getAllDescendantIds(treeData, nodeId);
  //   return this.deleteMany(treeData, [nodeId, ...descendantIds]);
  // }

  handleToggleChildHidden = id => {
    this.toggleHiddenChild(id);
  };

  toggleHiddenChild = nodeId => {
    console.log(this.state)
    console.log(this.props)
    const obj = this;
    const treeData = this.props[0];
    const descendantIds = this.getAllDescendantIds(treeData, nodeId);
    console.log(descendantIds);
    obj.toggleMany(treeData, descendantIds);
    // this.toggleMany(treeData, [nodeId, ...descendantIds]);
    console.log(treeData[descendantIds[0]]);
    obj.setState({ descendantIds: descendantIds });
    obj.setState({ treeData: treeData });
  }

  toggleMany = (treeData, descendantIds) => {
    // childs.forEach(child => (childs.hidden = !childs.hidden));
    treeData = { ...treeData };
    // console.log(treeData);
    descendantIds.forEach(id => {
      treeData[id].hidden = !treeData[id].hidden
    });
  };

  getAllDescendantIds(state, nodeId) {
    // return state.filter(x => { return x.parent === nodeId });
    var descendants = state.filter(x => { return x.parent === nodeId });
    var indexes = [];
    descendants.forEach(x => {
      indexes.push(state.findIndex(y => { return x.call === y.call }));
    })
    // console.log('indexes', indexes);
    return indexes;
    // var descendants = state.filter(x => { return x.parent === nodeId });
    // descendantIds
    // return descendants.reduce(
    //   (acc, child) => {
    //     // console.log('acc', acc);
    //     // console.log('child', child);
    //     return [...acc, child.call]
    //   },
    //   []
    // );
  };

  // handleRemoveClick = e => {
  //   e.preventDefault();

  //   const { removeChild, deleteNode, parentId, id } = this.props;
  //   this.removeChild(parentId, id);
  //   this.deleteNode(id);
  // };

  renderChild = childId => {
    const { call, parent, hidden } = this.state.treeData[childId];
    // if (parent) {
    //   return;
    // };
    console.log('call, parent, hidden', call, parent, hidden);
    return (
      <ConectedTreeNode
        key={call}
        id={childId}
        parentid={parent}
        hidden={hidden}
      />
    );
  };

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props)
    // loadFileTree(props.treeData);
    // console.log('getDerivedStateFromProps');
    // console.log('props', props);
    // console.log('state', state);
    var retorno = props.treeData;
    if (!retorno) { return null; }
    return retorno;
  }

  render() {
    // console.log('render');
    // console.log('props', this.props)
    if (!this.props[0]) { return (<div></div>) }
    const descendantIds = this.state.descendantIds;
    const treeData = this.props[0];
    const { call, parent, title, hidden } = this.props[1];
    // console.log('this.props', this.props);
    // console.log('treeData', treeData);
    console.log('call, parent, title, hidden', call, parent, title, hidden);

    // console.log(treeData);
    // console.log('this.props', this.props);
    if (hidden) { return (<div></div>) }
    return (
      <div>
        <Glyphicon
          key={call}
          id={call}
          parentid={parent}
          hidden={hidden}
          glyph="glyphicon glyphicon-triangle-right"
          // style={{ color: "lightgray", textDecoration: "none" }}
          onClick={e => { e.preventDefault(); this.handleToggleChildHidden(call) }}
        >{title}
        </Glyphicon>
        <ul>
          {descendantIds && descendantIds.map(this.renderChild)}
        </ul>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  // console.log('mapStateToPropsTreeNode', state);
  // console.log('mapStateToPropsTreeNode', ownProps);
  // console.log('treeNode', state.defineDadosTree.treeData);
  console.log('state.defineDadosTree.treeData[ownProps.id]', state.defineDadosTree.treeData[ownProps.id]);
  console.log('treeData', state.defineDadosTree.treeData);
  console.log('ownProps.id', ownProps.id);
  if (typeof state.defineDadosTree.treeData === 'undefined' || state.defineDadosTree.treeData.length <= 0) { return {} }
  return [state.defineDadosTree.treeData,
  {
    ...state.defineDadosTree.treeData[ownProps.id],
    hidden: state.defineDadosTree.treeData[ownProps.id].hidden
  }]
}

// export default connect(mapStateToProps)(TreeNode);

// function mapStateToProps(state, ownProps) {
//   console.log("mapStateToProps", state[ownProps.id]);
//   return {
//     ...state[ownProps.id],
//     hiddenChild: state[ownProps.id].hiddenChild
//   };
// }

const ConectedTreeNode = connect(mapStateToProps, null)(TreeNode);
export default ConectedTreeNode;
// export default connect(mapStateToProps, null)(TreeNode);
