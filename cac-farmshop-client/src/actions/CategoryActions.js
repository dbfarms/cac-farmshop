
let header = new Headers({
    'Access-Control-Allow-Origin':'',
    'Content-Type': 'multipart/form-data'
  });
  
  let sentData={
      method: 'GET',
      mode: 'cors',
      header: header
  };

  
  export const getCategories = () => {
    //debugger
    return dispatch => {
      return fetch('http://localhost:3000/api/categories', header)
        //fetch(`${API_URL}/carts`)
        .then(response => response.json())
        .then(categories => dispatch(setCategories(categories)))
        .catch(error => console.log(error));
    }
  }


const setCategories = (categories) => {
    //debugger 
    return {
      type: 'GET_CAT_SUCCESS',
      categories
    }
  }