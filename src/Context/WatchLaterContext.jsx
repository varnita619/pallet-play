import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { watchLaterReducer } from "../Reducer/WatchLaterReducer";
import { useAuthContext } from "../Context/AuthContext";

const WatchLaterContext = createContext();

const initialState = {
  watchLater: [],
};

const WatchLaterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchLaterReducer, initialState);
  const { token } = useAuthContext();
  const { watchLater } = state;

  const getWatchLaterData = async () => {
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
      console.log(error);
    }
  };

  const addToWatchLater = async (video) => {
    if (watchLater.find((eachVideo) => eachVideo._id === video._id)) {
      removeFromWatchLater(video._id);
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
          dispatch({
            type: "ADD_TO_WATCH_LATER",
            payload: watchLater,
          });
        }
      } catch (error) {
        console.log(error);
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
          dispatch({
            type: "REMOVE_FROM_WATCH_LATER",
            payload: watchLater,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getWatchLaterData();
  }, []);

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
