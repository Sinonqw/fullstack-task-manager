import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function useNotification() {
  return useSelector(
    (state: RootState) => state.notifications.notification,
  );
}
