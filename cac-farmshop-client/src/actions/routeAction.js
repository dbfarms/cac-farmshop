export const changeRoute = routeName => {
  return {
    type: 'CHANGING_ROUTE',
    routeName // sends in object of routeName: routeName 
  }
}
