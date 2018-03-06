class Auth {
    
    static loggedIn() {
      return !!sessionStorage.jwt;
    }
  
    static logOut() {
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('role');
    }
  }
  
  export default Auth;

/*

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

*/