import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { likedVideosReducer } from "../Reducer/LikedVideosReducer";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

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
      toast.error("Some error occurred ", { position: "bottom-left" });
    }
  };

  const addToLikes = async (video) => {
    if (likes.find((eachVideo) => eachVideo._id === video._id)) {
      // toast.success("Video disliked", { position: "bottom-left" });
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
          toast.success("Added to Liked Video", { position: "bottom-left" });
          dispatch({
            type: "ADD_TO_LIKES",
            payload: likes,
          });
        }
      } catch (error) {
        toast.error("Error occurred in adding to liked videos", {
          position: "bottom-left",
        });
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
          toast.success("Video Disliked", {
            position: "bottom-left",
          });
          dispatch({
            type: "REMOVE_FROM_LIKES",
            payload: likes,
          });
        }
      } catch (error) {
        toast.error("Error occured in removing!", { position: "bottom-left" });
      }
    }
  };

  useEffect(() => {
    getLikeData();
  }, []);

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
