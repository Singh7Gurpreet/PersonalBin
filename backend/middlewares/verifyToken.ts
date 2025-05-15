import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get token from headers
  const token = req.cookies.token;
  console.log(req.cookies);
  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Attach user data to the request object
    req.user = decoded;

    next(); // pass control to the next middleware
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyToken;
