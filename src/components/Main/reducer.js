export const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const person = action.payload;
    let per = { ...person };
    action.handleClose();
    console.log(state, action);
    return {
      ...state,
      people: [...state.people, per],
      modalOpen: true,
      modalCotent: 'USER ADDED',
      severity: 'success',
    };
  }
  if (action.type === 'DELETE') {
    let id = action.payload;
    let people = state.people.filter((e) => e.id !== id);
    return {
      ...state,
      people,
      modalOpen: true,
      modalCotent: 'USER DELETED',
      severity: 'error',
    };
  }
  if (action.type === 'EDIT') {
    let { index, editPer } = action.payload;
    let people = [...state.people];
    people.splice(index, 1, editPer);
    return {
      ...state,
      people: [...people],
      modalOpen: true,
      modalCotent: 'USER EDITED',
      severity: 'info',
    };
  }
  if (action.type === 'EMPTY') {
    return {
      ...state,
      modalOpen: true,
      modalCotent: 'EMPTY FIELD',
      severity: 'warning',
    };
  }
};
