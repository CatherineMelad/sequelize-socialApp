export let successResponse = (res, statusCode = 200, message, data) => {
  return res.status(statusCode).json({
    message,
    data,
  });
};

export let errorResponse = (res, statusCode = 400, message) => {
  return res.status(statusCode).json({
    message,
  });
};
