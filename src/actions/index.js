export const CREATE_NODE = "CREATE_NODE";
export const ADD_CHILD = "ADD_CHILD";
export const SHOW_CHILD = "SHOW_CHILD";

export function defineConfigDados(state) {
  return {
    type: "DADOS_LOG",
    dadosarquivo: state.dadosarquivo,
    hiddenAnalise: state.hiddenAnalise
  }
}

export function defineDadosTree(state) {
  return {
    type: "DADOS_TREE",
    treeData: state.treeData,
    hiddentree: state.hiddentree
  }
}

let nextId = 0;
export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: `new_${nextId++}`
});

export const toggleChild = (nodeId, hiddenChild) => {
  return {
    type: SHOW_CHILD,
    nodeId: nodeId,
    hiddenChild: hiddenChild
  };
};

export const addChild = (nodeId, childId, hiddenChild) => {
  return {
    type: ADD_CHILD,
    nodeId: nodeId,
    childId: childId,
    hiddenChild: hiddenChild
  };
};