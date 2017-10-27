const handler = (method) => {
  return {
    'process': (req, res) => {
      const params = null;
      return method.apply(this, [req, res, params]);
    }
  };
};

export const createHandler = (method) => {
  return handler(method);
};
