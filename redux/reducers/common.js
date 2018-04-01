const user = (state ={ history: [], memos: [] } , action) => {
    switch(action.type){
        case 'GETUSER':{
            return state.info
        }
        case 'SETUSER':{
            return {
                ...state,
                userInfo: action.info
            }
        }
        case 'ADDHISTORY':{
            let newHis = state.history.slice()
            let idx = newHis.indexOf(action.query)
            if(~idx){
               newHis = [action.query].concat(newHis.slice(0, idx).concat(newHis.slice(idx+1)))
            }else{
                newHis.unshift(action.query)
            }
            return {
                ...state,
                history: newHis
            }
        }
        case 'GETMEMOS':{
            return state.memos
        }
        case 'SETMEMOS':{
            return {
                ...state,
                memos: action.memos
            }
        }
        default:
            return state
    }
}

export default user;