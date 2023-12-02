import { AxiosError } from 'axios';

export function handleAxiosError(error) {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
    }
  }
}
