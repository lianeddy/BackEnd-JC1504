import io from "socket.io-client";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const createNotification = (str) =>
  Toast.fire({
    icon: "success",
    title: str,
  });

export const api_url = "http://localhost:2000";
export const socket = io(api_url);
