export const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const person = action.payload;
    let per = { ...person };
    action.handleClose();
    console.log(state, action);
    return {
      ...state,
      people: [...state.people, per],
    };
  }
  if (action.type === 'DELETE') {
    let id = action.payload;
    let people = state.people.filter((e) => e.id !== id);
    return {
      ...state,
      people,
    };
  }
  // if (action.type === 'EDIT') {
  //   console.log(action.payload);
  //   return state;
  // }
};