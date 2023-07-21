const CheckExpired = (createdAt) => {
  return new Date().getTime() - new Date(createdAt).getTime() > 1800;
};

module.exports = CheckExpired;
