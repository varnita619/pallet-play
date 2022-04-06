import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { historyReducer } from "../Reducer/HistoryReducer";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const HistoryContext = createContext();

const initialState = {
  history: [],
};

const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const { token } = useAuthContext();
  const { history } = state;

  useEffect(() => {
    (async () => {
      try {
        const {
          status,
          data: { history },
        } = await axios.get("/api/user/history", {
          headers: { authorization: token },
        });
        if (status === 200) {
          dispatch({ type: "GET_HISTORY", payload: history });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const addToHistory = async (video) => {
    if (history.find((eachVideo) => eachVideo._id === video._id)) {
      removeFromHistory(video._id);
    } else {
      try {
        const {
          status,
          data: { history },
        } = await axios.post(
          "/api/user/history",
          { video },
          {
            headers: { authorization: token },
          }
        );
        if (status === 201) {
          dispatch({
            type: "ADD_TO_HISTORY",
            payload: history,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromHistory = async (videoId) => {
    if (history.find((eachVideo) => eachVideo._id === videoId)) {
      try {
        const {
          status,
          data: { history },
        } = await axios.delete(`/api/user/history/${videoId}`, {
          headers: { authorization: token },
        });

        if (status === 200) {
          toast.success("Removed from history", {
            position: "bottom-left",
          });
          dispatch({
            type: "REMOVE_FROM_HISTORY",
            payload: history,
          });
        }
      } catch (error) {
        toast.error("Error occured in removing!", { position: "bottom-left" });
      }
    }
  };

  const clearHistory = async () => {
    if (token) {
      try {
        const {
          status,
          data: { history },
        } = await axios.delete("/api/user/history/all", {
          headers: {
            authorization: token,
          },
        });

        if (status === 200) {
          dispatch({ type: "CLEAR_HISTORY", payload: history });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <HistoryContext.Provider
      value={{ state, dispatch, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistoryContext = () => useContext(HistoryContext);

export { useHistoryContext, HistoryContextProvider };
