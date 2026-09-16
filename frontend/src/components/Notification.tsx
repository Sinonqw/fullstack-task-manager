import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

import { hideNotification } from "../redux/notificationsSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import useNotification from "../hooks/useNotification";

const Notification = () => {
  const notification = useNotification();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }

  const isSuccess = notification.type === "success";

  return (
    <div
      className={`fixed right-5 top-5 z-[9999] flex w-[360px] items-start gap-3 overflow-hidden rounded-2xl border bg-white p-4 shadow-2xl ${
        isSuccess ? "border-green-200" : "border-red-200"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-500" />
      ) : (
        <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-500" />
      )}

      <div className="flex-1">
        <p
          className={`font-semibold ${
            isSuccess ? "text-green-700" : "text-red-700"
          }`}
        >
          {isSuccess ? "Success!" : "Error!"}
        </p>

        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
      </div>

      <button
        type="button"
        onClick={() => dispatch(hideNotification())}
        className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>

      <div
        className={`absolute bottom-0 left-0 h-1 w-full ${
          isSuccess ? "bg-green-400" : "bg-red-400"
        }`}
      />
    </div>
  );
};

export default Notification;
