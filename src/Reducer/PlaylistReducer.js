const playlistReducer = (state, action) => {
    switch (action.type) {
        case "GET_PLAYLIST":
            return {
                ...state,
                playlists: action.payload,
            }
        case "CREATE_PLAYLIST":
            return {
                ...state,
                playlists: action.payload,
            };
        case "ADD_TO_PLAYLIST":
            return {
                ...state,
                playlists: state.playlists.map((eachPlaylist) => eachPlaylist._id === action.payload._id ? action.payload : eachPlaylist),
            };
        case "DELETE_PLAYLIST":
            return {
                ...state,
                playlists: action.payload,
            }

        case 'DELETE_EACH_VIDEO':
            return { ...state, playlists: state.playlists.map((eachPlaylist) => eachPlaylist._id === action.payload._id ? action.payload : eachPlaylist) }
        default:
            return state;
    }
};


export { playlistReducer };
