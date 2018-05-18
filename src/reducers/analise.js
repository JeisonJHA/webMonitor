const initialStateDados = { dadosarquivo: [], hiddenAnalise: true }

export default function defineDadosData(state = initialStateDados, action) {
  switch (action.type) {
    case "DADOS_LOG":
      return {
        ...state,
        dadosarquivo: action.dadosarquivo,
        hiddenAnalise: action.hiddenAnalise
      }
    default:
      return state;
  }
}