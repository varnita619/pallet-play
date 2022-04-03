const historyReducer = (state, action) => {

    switch (action.type) {
        case "ADD_TO_HISTORY":
            return { ...state, history: action.payload }

        case "CLEAR_HISTORY":
            return { ...state, history: action.payload }

        case "REMOVE_FROM_HISTORY":
            return { ...state, history: action.payload }
        default:
            return state
    }

}

export { historyReducer };
