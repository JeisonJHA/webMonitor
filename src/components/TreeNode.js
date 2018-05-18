import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actions from "../actions";

export class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: {}
    }
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

  getAllDescendantIds(state, nodeId) {
    state[nodeId].childIds.reduce(
      (acc, childId) => [...acc, childId, ...this.cgetAllDescendantIds(state, childId)],
      []
    );
  };

  deleteMany = (state, ids) => {
    state = { ...state };
    ids.forEach(id => delete state[id]);
    return state;
  };

  toggleMany = (state, ids) => {
    state = { ...state };
    ids.forEach(id => (state[id].hiddenChild = !state[id].hiddenChild));
    return state;
  };

  deleteNode = nodeId => {
    const { treeData } = this.state;
    const descendantIds = this.getAllDescendantIds(treeData, nodeId);
    return this.deleteMany(treeData, [nodeId, ...descendantIds]);
  }

  toggleHiddenChild = nodeId => {
    const { treeData } = this.state;
    const descendantIds = this.getAllDescendantIds(treeData, nodeId);
    this.toggleMany(treeData, [nodeId, ...descendantIds]);
    this.setState({ treeData: treeData });
    // return {
    //   ...treeData,
    //   [nodeId]: treeData[nodeId]
    // };

  }

  //   export default(state = {}, action) => {
  //   console.log("action", action);
  //   const { nodeId } = action;
  //   if (typeof nodeId === "undefined") {
  //     return state;
  //   }

  //   var ret = {
  //     ...state,
  //     [nodeId]: node(state[nodeId], action)
  //   };
  //   console.log("ret", ret);
  //   return ret;
  // };

  handleToggleChildHidden = e => {
    e.preventDefault();

    const { id, toggleChild, hiddenChild } = this.props;
    console.log(this.props);
    this.toggleHiddenChild(id, hiddenChild);
  };

  handleRemoveClick = e => {
    e.preventDefault();

    const { removeChild, deleteNode, parentId, id } = this.props;
    this.removeChild(parentId, id);
    this.deleteNode(id);
  };

  renderChild = childId => {
    // console.log('childId', childId);
    // console.log('this.props', this.props);
    const { call, parent, title } = childId;
    return (
      <div key={call} hidden={!parent}
        // {/* <ConectedTreeNode */}
        onClick={() => this.handleToggleChildHidden}
        id={call}
        parentid={parent ? parent : 0}
        hiddenchild={parent ? true : false}
      >
        <a
          style={{ color: "lightgray", textDecoration: "none" }}
        >
          +
        </a>{title}
      </div>
    );
  };

  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps', props)
    // loadFileTree(props.treeData);
    // console.log('props');
    var retorno = props.treeData;
    if (!retorno) { return null; }
    return null;
    // retorno.map(createNode);
    // return {
    //   treeData: getTreeFromFlatData({
    //     flatData: retorno.map(node => ({ ...node, title: node.title })),
    //     getKey: node => node.call, // resolve a node's key
    //     getParentKey: node => node.parent, // resolve a node's parent's key
    //     rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
    //   })
    // }
  }
  render() {
    const { treeData } = this.props;
    // console.log(treeData);
    // console.log('this.props', this.props);
    return (
      // <div>
      // {/* Counter: {counter}{" "} */}
      // {/* <ul> */}
      treeData && treeData.map(this.renderChild)
      // {/* </ul> */}
      // </div>
    );
  }
}


function mapStateToProps(store) {
  console.log('TreeNode', store);
  return {
    treeData: store.defineDadosTree.treeData
  }
}

// export default connect(mapStateToProps)(TreeNode);

// function mapStateToProps(state, ownProps) {
//   console.log("mapStateToProps", state[ownProps.id]);
//   return {
//     ...state[ownProps.id],
//     hiddenChild: state[ownProps.id].hiddenChild
//   };
// }

// const ConectedTreeNode = ;
export default connect(mapStateToProps, null)(TreeNode);
