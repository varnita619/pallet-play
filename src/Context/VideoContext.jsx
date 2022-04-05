import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { videoReducer } from "../Reducer/videoReducer";
import { toast } from "react-hot-toast";

const VideoContext = createContext();

const initialState = {
  videos: [],
};

const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const { videos } = state;
  // for toggling sidebar
  const [active, setActive] = useState(false);
  // const [width, setWidth] = useState(window.innerWidth);
  // console.log(width, active)

  // useEffect(()=>{
  //   setWidth(window.innerWidth);
  //   if(width < 967){
  //     setActive(false);
  //   }
  // },[width])

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
        toast.error("Error occurred in fetching videos ", {
          position: "bottom-left",
        });
      }
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ state, dispatch, videos, active, setActive }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideoContext = () => useContext(VideoContext);

export { useVideoContext, VideoContextProvider };
