import { combineReducers } from 'redux'
import defineDadosData from './analise'
import defineDadosTree from './tree'

const allReducers = combineReducers({
  defineDadosData,
  defineDadosTree
})

export default allReducers;