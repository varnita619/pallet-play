import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { likedVideosReducer } from "../Reducer/LikedVideosReducer";
import { useAuthContext } from "../Context/AuthContext";

const LikedVideosContext = createContext();

const initialState = {
  likes: [],
};

const LikedVideosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likedVideosReducer, initialState);
  const { token } = useAuthContext();
  const { likes } = state;

  const getLikeData = async () => {
    try {
      const {
        status,
        data: { likes },
      } = await axios.get("/api/user/likes", {
        headers: { authorization: token },
      });
      if (status === 200) {
        dispatch({ type: "GET_LIKES", payload: likes });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToLikes = async (video) => {
    if (likes.find((eachVideo) => eachVideo._id === video._id)) {
      removeFromLikes(video._id);
    } else {
      try {
        const {
          status,
          data: { likes },
        } = await axios.post(
          "/api/user/likes",
          { video },
          {
            headers: { authorization: token },
          }
        );
        if (status === 201) {
          dispatch({
            type: "ADD_TO_LIKES",
            payload: likes,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromLikes = async (videoId) => {
    if (likes.find((eachVideo) => eachVideo._id === videoId)) {
      try {
        const {
          status,
          data: { likes },
        } = await axios.delete(`/api/user/likes/${videoId}`, {
          headers: { authorization: token },
        });
        if (status === 200) {
          dispatch({
            type: "REMOVE_FROM_LIKES",
            payload: likes,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getLikeData();
  },[]);

  return (
    <LikedVideosContext.Provider
      value={{ state, dispatch, addToLikes, removeFromLikes }}
    >
      {children}
    </LikedVideosContext.Provider>
  );
};

const useLikedVideoContext = () => useContext(LikedVideosContext);

export { useLikedVideoContext, LikedVideosContextProvider };
