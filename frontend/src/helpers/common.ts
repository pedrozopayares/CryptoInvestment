import { toast } from 'react-toastify';

export const notify = {
    error: (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    },
    success: (message: string) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
};

export const empty = function (variable: any, cero = false) {
    return (
      typeof variable == "undefined" || //undefined
      variable === null || //null
      variable === false || //!variableiable     //false
      variable.length === 0 ||
      (typeof variable === "object" && !Object.keys(variable).length) || //empty
      variable.toString().trim() === "" || //empty
      variable.toString().replace(/\s/g, "") === "" || //empty
      !/[^\s]/.test(variable) || //empty
      /^\s*$/.test(variable) || //empty
      (cero && variable === 0)
    );
}
