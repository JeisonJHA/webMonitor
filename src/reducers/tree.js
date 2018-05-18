const initialState = { treeData: [], hiddentree: true }

export default function defineDadosTree(state = initialState, action) {
  switch (action.type) {
    case "DADOS_TREE":
      console.log(action);
      return {
        ...state,
        treeData: action.treeData,
        hiddentree: action.hiddentree
      }
    default:
      return state;
  }
}