import {
  // INCREMENT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  SHOW_CHILD
} from "../actions";

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId];
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId);
    default:
      return state;
  }
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        counter: 0,
        childIds: [],
        hiddenChild: true
      };
    // case INCREMENT:
    //   return {
    //     ...state,
    //     counter: state.counter + 1
    //   };
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
        counter: state.childIds.length + 1
      };
    default:
      return state;
  }
};

const getAllDescendantIds = (state, nodeId) =>
  state[nodeId].childIds.reduce(
    (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
    []
  );

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state;
};

const toggleMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => (state[id].hiddenChild = !state[id].hiddenChild));
  return state;
};

export default (state = {}, action) => {
  console.log("action", action);
  const { nodeId } = action;
  if (typeof nodeId === "undefined") {
    return state;
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [nodeId, ...descendantIds]);
  }

  if (action.type === SHOW_CHILD) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    toggleMany(state, [nodeId, ...descendantIds]);
    return {
      ...state,
      [nodeId]: state[nodeId]
    };
  }

  var ret = {
    ...state,
    [nodeId]: node(state[nodeId], action)
  };
  console.log("ret", ret);
  return ret;
};
