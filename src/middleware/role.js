const roles = {
  admin: {
    can: ["read", "write", "delete"],
  },
  viewer: {
    can: ["read"],
  },
};

module.exports = roles;
