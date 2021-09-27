import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ message: "You are not authorized!" });

  jwt.verify(token, "ecom", (err, payload) => {
    if (err) return res.status(404).json({ message: "Access Denied!" });
    req.user = payload
    next();
  });
};

