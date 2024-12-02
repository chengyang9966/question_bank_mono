import { toast, ToastOptions } from 'react-toastify';

const successToast = (msg: string, toastProps?: ToastOptions) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    ...toastProps,
  });
};

const errorToast = (msg: string, toastProps?: ToastOptions) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    ...toastProps,
  });
};

const warningToast = (msg: string, toastProps?: ToastOptions) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    ...toastProps,
  });
};

export { successToast, errorToast, warningToast };
