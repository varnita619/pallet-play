const videoReducer = (state, action) => {
    switch (action.type) {
        case 'ON_SUCCESS':
            return {
                ...state,
                videos: action.payload,
            }
        case 'GET_CATEGORY_NAME':
            return { ...state, categoryName: action.payload };

        case 'RESET_FILTER':
            return { ...state, categoryName: "ALL" };

        case 'VIDEOS_CATEGORY_NAME':
            return { ...state, categoryName: action.payload }

        default:
            return state;
    }
}

export { videoReducer };
