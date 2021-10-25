import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

const useSafeDispatch = (dispatch) => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (action) => (mounted.current ? dispatch(action) : void 0),
    [dispatch]
  );
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case "PENDING": {
      return { status: "PENDING", data: null, error: null };
    }
    case "RESOLVED": {
      return {
        status: "RESOLVED",
        data: action.data,
        error: null,
      };
    }
    case "REJECTED": {
      return { status: "REJECTED", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const useAsync = (initialState) => {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: "IDLE",
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    (promise) => {
      dispatch({ type: "PENDING" });
      promise.then(
        (data) => {
          dispatch({ type: "RESOLVED", data });
        },
        (error) => {
          dispatch({ type: "REJECTED", error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback((data) => dispatch({ type: "RESOLVED", data }), [
    dispatch,
  ]);
  const setError = useCallback(
    (error) => dispatch({ type: "REJECTED", error }),
    [dispatch]
  );

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
};

export { useAsync };
