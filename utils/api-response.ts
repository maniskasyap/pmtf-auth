export interface IAPIResponse {
  success: boolean;
  status: number;
  data: any;
  error: any;
}

export const createSuccess = (data: any) => {
  const success: IAPIResponse = {
    success: true,
    status: 200,
    data: data,
    error: null,
  };
  return success;
};
export const createFailure = (status: number = 500, error: any) => {
  const failure: IAPIResponse = {
    success: false,
    status,
    data: null,
    error: error,
  };
  return failure;
};
