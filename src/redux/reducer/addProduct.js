const initialstate = {
  loading: false,
  data: null,
};

export const productReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "Request_Add_Product":
      return {
        ...state,
        loading: true,
      };
    case "Add_Product_Success":
      return {
        ...state,
        data: action.payload,
      };
    case "Add_Product_Failed":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};