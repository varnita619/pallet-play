import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { playlistReducer } from "../Reducer/PlaylistReducer";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const PlaylistContext = createContext();

const initialState = {
  playlists: [],
};

const PlaylistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  const { playlists } = state;
  const { token } = useAuthContext();

  useEffect(() => {
    token &&
      (async () => {
        try {
          const {
            status,
            data: { playlists },
          } = await axios.get("/api/user/playlists", {
            headers: { authorization: token },
          });
          if (status === 200) {
            dispatch({ type: "GET_PLAYLIST", payload: playlists });
          }
        } catch (error) {
          toast.error("You need to login to access playlist", {
            position: "bottom-left",
          });
        }
      })();
  }, [token]);

  // create playlist
  const createPlaylist = async (name) => {
    const { playlist } = name;
    {
      try {
        const {
          status,
          data: { playlists },
        } = await axios.post(
          "/api/user/playlists",
          { playlist: { title: playlist } },
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (status === 201) {
          toast.success("Playlist Created.", { position: "bottom-left" });
          dispatch({ type: "CREATE_PLAYLIST", payload: playlists });
        }
      } catch (error) {
        toast.error("Error occurred in creating playlist.", {
          position: "bottom-left",
        });
      }
    }
  };

  //Add to playlist
  const addToPlaylist = async (newData, video) => {
    const { _id } = newData;

    try {
      const {
        data: { playlist },
        status,
      } = await axios.post(
        `/api/user/playlists/${_id}`,
        { video },
        {
          headers: { authorization: token },
        }
      );

      if (status === 201) {
        dispatch({ type: "ADD_TO_PLAYLIST", payload: playlist });
        toast.success(`Added video to playlist ${playlist.title}`, {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("Error occurred in adding to playlist.", {
        position: "bottom-left",
      });
    }
  };

  //Delete Playlist
  const deletePlaylist = async (playlistID) => {
    try {
      const {
        data: { playlists },
        status,
      } = await axios.delete(`/api/user/playlists/${playlistID}`, {
        headers: { authorization: token },
      });

      if (status === 200) {
        toast.success("Playlist Deleted", { position: "bottom-left" });
        dispatch({ type: "DELETE_PLAYLIST", payload: playlists });
      }
    } catch (error) {
      toast.error("Error occurred in deleting playlist.", {
        position: "bottom-left",
      });
    }
  };

  //Delete Each video from particular playlist
  const deleteEachVideo = async (videoID, playlistID) => {
    try {
      const {
        data: { playlist },
        status,
      } = await axios.delete(`/api/user/playlists/${playlistID}/${videoID}`, {
        headers: { authorization: token },
      });

      if (status === 200) {
        toast.success(`Video Deleted from ${playlist.title}`, {
          position: "bottom-left",
        });
        dispatch({ type: "DELETE_EACH_VIDEO", payload: playlist });
      }
    } catch (error) {
      toast.error(
        `Error occured white deleting particular video ${error.message}}`,
        { position: "bottom-left" }
      );
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        state,
        dispatch,
        createPlaylist,
        addToPlaylist,
        deletePlaylist,
        deleteEachVideo,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylistContext = () => useContext(PlaylistContext);

export { usePlaylistContext, PlaylistContextProvider };
