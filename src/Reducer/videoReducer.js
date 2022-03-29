const videoReducer = (state, action) => {
    switch (action.type) {
        case 'ON_SUCCESS':
            return {
                ...state,
                videos: action.payload,
            }

        default:
            return state;
    }
}

export { videoReducer };
