const likedVideosReducer = (state, action) => {
    switch (action.type) {
        case "GET_LIKES":
            return {
                ...state,
                likes: action.payload,
            }
        case "ADD_TO_LIKES":
            return {
                ...state,
                likes: action.payload,
            };
        case "REMOVE_FROM_LIKES":
            return {
                ...state,
                likes: action.payload,
            }
        default:
            return state;
    }
};


export { likedVideosReducer };
