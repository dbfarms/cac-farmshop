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
        const request = new Request('http://localhost:3000/users', {
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