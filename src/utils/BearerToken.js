const BearerToken = () => {
  if (!localStorage.token || !localStorage.id) {
    return false;
  }
  const bearer = "Bearer " + localStorage.token;
  return bearer;
};

export default BearerToken;
