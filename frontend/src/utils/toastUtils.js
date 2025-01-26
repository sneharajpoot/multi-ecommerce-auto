
import { toast } from 'react-toastify';

export const showSuccessMessage = (message) => {
  toast.success(message);
};

export const showErrorMessage = (message) => {
  toast.error(message);
};