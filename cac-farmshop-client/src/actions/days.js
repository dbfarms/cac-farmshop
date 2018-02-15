let header = new Headers({
    'Access-Control-Allow-Origin':'',
    'Content-Type': 'multipart/form-data'
  });
  
  let sentData={
      method: 'GET',
      mode: 'cors',
      header: header
  };

const setDays = days => {
    return {
      type: 'GET_DAYS_SUCCESS',
      days
    }
  }


export const getDays = () => {
    return dispatch => {
      return fetch('http://localhost:3000/api/days', header)
        .then(response => response.json())
        .then(days => dispatch(setDays(days)))
        .catch(error => console.log(error));
    }
  }