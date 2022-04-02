import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { videoReducer } from "../Reducer/videoReducer";
import { toast } from "react-hot-toast";

const VideoContext = createContext();

const initialState = {
  videos: [],
};

const VideoContextProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { videos },
        } = await axios.get("/api/videos");
        dispatch({
          type: "ON_SUCCESS",
          payload: videos,
        });
      } catch (error) {
        toast.error("Error occurred in fetching videos " , { position: "bottom-left"});
      }
    })();
  }, []);

  const [state, dispatch] = useReducer(videoReducer, initialState);
  const { videos } = state;

  return (
    <VideoContext.Provider value={{ state, dispatch, videos }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideoContext = () => useContext(VideoContext);

export { useVideoContext, VideoContextProvider };
