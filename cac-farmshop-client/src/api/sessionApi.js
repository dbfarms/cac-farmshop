class SessionApi {  

    static login(credentials) {
      //${process.env.API_HOST} instead of localhost... also below
      const request = new Request('http://localhost:3000/login', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        }), 
        body: JSON.stringify({auth: credentials})
      });
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    } 

    static signup(credentials) {
      //debugger 
      const request = new Request('http://localhost:3000/api/users', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({user: credentials})
      });
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    } 

    static usersGet(){
      const requestUsers = new Request('http://localhost:3000/api/users', {
        method: 'GET',
        headers: new Headers({
          'Access-Control-Allow-Origin':'',
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        }), 
      });
  
      return fetch(requestUsers).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static adminSignup(credentials) {  //might need to include type one day
      //debugger 
      const request = new Request('http://localhost:3000/api/users', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({user: credentials})
      });
      /*
      const request2 = new Request(`http://localhost:3000/${type}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({user: credentials})
      });
      */
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static adminCustomerSignup(credentials) {  //might need to include type one day
      //debugger 
      const request = new Request('http://localhost:3000/api/customer_users', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({user: credentials})
      });
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

}
  
export default SessionApi;