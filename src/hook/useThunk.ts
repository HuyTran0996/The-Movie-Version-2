import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useThunk = <ThunkArg, ThunkResult>(
  thunk: (arg: ThunkArg) => any
) => {
  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    async (arg?: ThunkArg): Promise<ThunkResult> => {
      try {
        const data = await dispatch(thunk(arg!)).unwrap();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw (
            error.message || "An error occurred while dispatching the thunk"
          );
        } else {
          throw "An unknown error occurred";
        }
      }
    },
    [dispatch, thunk]
  );

  return runThunk;
};
