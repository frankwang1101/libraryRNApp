export const getUser = _ => {
    return {
        type: 'GETUSER'
    }
}

export const setUser = info => {
    return {
        type: 'SETUSER',
        info
    }
}

export const addHistory = query => {
    return {
        type: 'ADDHISTORY',
        query,
    }
}

export const getMemoList = _ => {
    return {
        type: 'GETMEMOS'
    }
}

export const setMemoList = memos => {
    return {
        type: 'SETMEMOS',
        memos
    }
}