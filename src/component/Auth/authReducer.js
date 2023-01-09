export const AUTH_ACTIONS = {
  SET_FIELD: "SetField",
  RESET_FIELD: "ResetField",
  RESET_FORM: "ResetForm",
  SET_FIELD_ERROR: "SetFieldError",
  CLEAR_ERROR: "ClearError"
};
const initialState = { error: {} };
const reducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case AUTH_ACTIONS.SET_FIELD: {
      copyState[action.field] = action.value;
      break;
    }
    case AUTH_ACTIONS.RESET_FIELD: {
      copyState[action.field] = "";
      break;
    }
    case AUTH_ACTIONS.SET_FIELD_ERROR: {
      copyState.error[action.field] = action.message;
      break;
    }
    case AUTH_ACTIONS.RESET_FORM: {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
  return { ...copyState };
};

export default reducer;
