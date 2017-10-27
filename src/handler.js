const handler = method => ({
  process: (req, res) => {
    const params = null;
    return method.apply(this, [req, res, params]);
  },
});

const createHandler = method => handler(method);
export default createHandler;
