import axios from "axios";

export const UpdateProductRequest = (payload) => {
  return {
    type: "Request_Update_Product",
    payload: payload,
  };
};

export const UpdateProductSuccess = (payload) => {
  return {
    type: "Update_Product_Success",
    payload: payload,
  };
};

export const UpdateProductFailed = (payload) => {
  return {
    type: "Update_Product_Failed",
    payload: payload,
  };
};

export const UpdateProduct = (formData, id, token) => {
  console.log(id)
  return (dispatch) => {
    dispatch(UpdateProductRequest());
    axios({
      method: "PATCH",
      url: `https://coral-app-3yjfb.ondigitalocean.app/api/v1/product/${id}`,
      headers: { 
        authorization: token
       },
      data: {
        ...formData,

        categories_id: formData.categories_id,
        product_name: formData.product_name,
        product_price: formData.product_price,
        product_desc: formData.product_desc,
        product_image: formData.product_image
      }
      
    })
      .then((res) => {
        dispatch(UpdateEmployeeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(UpdateEmployeeFailed(err.response));
      });
  };
};

// export const UpdateEmployee = (id,body)=>{
//           return (dispatch)=>{
//           dispatch(UpdateEmployeeRequest)
//           axios.patch(`${NEXT_PUBLIC_URL_BE}/api/v1/employees/${id}`,{
//                     data: body,
//                     headers : {
//                               authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2NTk5NDcyNjgsImV4cCI6MTY2MDAzMzY2OH0.AU-VsL8HtfGxX1H0LArdXZmfK1sAp4tl5ZgHVjrWSq8"
//                     }
//           })

//           }

// }
