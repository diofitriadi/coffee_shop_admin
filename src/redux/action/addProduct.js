import axios from "axios";

export const AddProductRequest = () => {
  return {
    type: "Request_Add_Product",
  };
};

export const AddProductSuccess = (data) => {
  return {
    type: "Add_Product_Success",
    payload: data,
  };
};

export const AddProductFailed = (error) => {
  return {
    type: "Add_Product_Failed",
    payload: error
  };
};

export const AddProduct = (formData, token) => {
  console.log(token, "tes tes tes tes")
  return (dispatch) => {
    dispatch(AddProductRequest());
    axios({
      method: "POST",
      url: `https://coffee-shop-be-dio.herokuapp.com/api/v1/product`,
      headers: { 
        authorization: token,
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then((res) => {
        dispatch(AddProductSuccess(res.data));
      })
      .catch((err) => {
        dispatch(AddProductFailed(err.response));
      });
  };
};