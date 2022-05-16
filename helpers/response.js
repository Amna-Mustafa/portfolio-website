const successResponse = (
    req, res, message = "", data, token = "", code = 200
    ) =>
    res.send({
      success: true,
      code,
      message,
      data,
      token,
    });
  
  const errorResponse = (
    req, res, errorMessage = "Something went wrong", code = 500, error = {}
    ) => {
    res.status(500).json({
      success: false,
      code,
      errorMessage,
      error,
      data: null,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };