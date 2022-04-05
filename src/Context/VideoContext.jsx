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
import { uniqueCategory } from "../Utils/getUniqueCategory";
import { filterByCategory } from "../Utils/filterByCategory";

const VideoContext = createContext();

const initialState = {
  videos: [],
  categoryName: "ALL",
};

const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  const { videos, categoryName } = state;
  const getUniqueCategory = uniqueCategory(videos, "categoryName");
  const getFilterByCategory = filterByCategory(videos, categoryName);
  console.log(getFilterByCategory)

  // for toggling sidebar
  const [active, setActive] = useState(false);

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
    <VideoContext.Provider
      value={{
        state,
        dispatch,
        videos,
        active,
        setActive,
        getUniqueCategory,
        getFilterByCategory,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

const useVideoContext = () => useContext(VideoContext);

export { useVideoContext, VideoContextProvider };
