import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;

export const checkToken = (req, res, next) => {
  // Extract token from cookies or Authorization header
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
      console.error("Token not found in request");
      return res.status(401).json({
          success: 0,
          message: 'Unauthorized user'
      });
  }

  // Verify the token
  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          console.error("Token verification failed", err);
          return res.status(401).json({
              success: 0,
              message: 'Unauthorized user'
          });
      }

      // Log the decoded data for debugging
      console.log("Decoded token:", decoded);
      console.log(req.body);
      // Store the decoded data in req.user for later use
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
  });
};


