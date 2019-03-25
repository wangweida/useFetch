import {useState, useEffect, useReducer} from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useFetch = ({url, method = "get", initialPayload = {}}, initialData) => {
  const [payload, setPayload] = useState(initialPayload);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({type: "FETCH_INIT"});

      try {
        const result = await axios({
          url,
          method,
          [method === "get" ? "params" : "data"]: payload
        });

        if (!didCancel) {
          dispatch({type: "FETCH_SUCCESS", payload: result.data});
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({type: "FETCH_FAILURE"});
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [payload]);

  const doFetch = payload => {
    setPayload(payload);
  };

  return {...state, doFetch};
};

export default useFetch;
