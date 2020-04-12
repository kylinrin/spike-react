interface Action {
    type: any,
    payload: any
  }
  
  const action = (type: any, payload?: any): Action => ({type, payload});
  
  export default action
  
  export { Action }
  