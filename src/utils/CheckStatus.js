const CheckStatus = (status, parsedResponse) => {
  switch (status) {
    case 200 || 201:
      return { error: false };
    case 401:
      return {
        error: true,
        message: "Your session has expired. Please log in again.",
        redirect: "/login",
      };
    default: {
      return {
        error: true,
        message: parsedResponse.message,
      };
    }
  }
};

export default CheckStatus;
