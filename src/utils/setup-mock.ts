import debug from './env';

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup();
};

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    code: 200,
    message: 'success',
    success: true,
  };
};

export const failResponseWrap = (
  data: unknown,
  message: string,
  code = 400
) => {
  return {
    data,
    message,
    code,
    success: false,
  };
};
