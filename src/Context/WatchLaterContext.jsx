import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { watchLaterReducer } from "../Reducer/WatchLaterReducer";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const WatchLaterContext = createContext();

const initialState = {
  watchLater: [],
};

const WatchLaterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchLaterReducer, initialState);
  const { token } = useAuthContext();
  const { watchLater } = state;

  useEffect(() => {
    token &&
      (async () => {
        try {
          const {
            status,
            data: { watchLater },
          } = await axios.get("/api/user/watchLater", {
            headers: { authorization: token },
          });
          if (status === 200) {
            dispatch({ type: "GET_WATCH_LATER", payload: watchLater });
          }
        } catch (error) {
          toast.error("Error occurred While fetching video from watchLater", {
            position: "bottom-left",
          });
        }
      })();
  }, [token]);

  const addToWatchLater = async (video) => {
    if (watchLater.find((eachVideo) => eachVideo._id === video._id)) {
      toast.error("Video already Added to watch Later!", {
        position: "bottom-left",
      });
    } else {
      try {
        const {
          status,
          data: { watchLater },
        } = await axios.post(
          "/api/user/watchLater",
          { video },
          {
            headers: { authorization: token },
          }
        );
        if (status === 201) {
          toast.success("Saved to Watch Later", { position: "bottom-left" });
          dispatch({
            type: "ADD_TO_WATCH_LATER",
            payload: watchLater,
          });
        }
      } catch (error) {
        toast.error("Error occurred in adding to Watch Later videos", {
          position: "bottom-left",
        });
      }
    }
  };

  const removeFromWatchLater = async (videoId) => {
    if (watchLater.find((eachVideo) => eachVideo._id === videoId._id)) {
      try {
        const {
          status,
          data: { watchLater },
        } = await axios.delete(`/api/user/watchLater/${videoId._id}`, {
          headers: { authorization: token },
        });
        if (status === 200) {
          toast.success("Removed from Watch Later", {
            position: "bottom-left",
          });
          dispatch({
            type: "REMOVE_FROM_WATCH_LATER",
            payload: watchLater,
          });
        }
      } catch (error) {
        toast.error("Error occured in removing!", { position: "bottom-left" });
      }
    }
  };

  return (
    <WatchLaterContext.Provider
      value={{ state, dispatch, addToWatchLater, removeFromWatchLater }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLaterContext = () => useContext(WatchLaterContext);

export { useWatchLaterContext, WatchLaterContextProvider };
