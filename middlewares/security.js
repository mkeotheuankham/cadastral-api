const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { verifyToken } = require('../config/auth');

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  skip: (req) => {
    // ບໍ່ຈຳກັດການເຮັດວຽກສຳລັບການເຂົ້າລະບົບ
    return req.path === '/api/auth/login' || req.path === '/api/auth/register';
  }
});

// Security headers
const securityHeaders = helmet();

// Authentication middleware
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Authorization middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
    }
    next();
  };
};

// District restriction middleware
const restrictToDistrict = (districts = []) => {
  return (req, res, next) => {
    if (districts.length && !districts.includes(req.user.district)) {
      return res.status(403).json({ 
        error: `Forbidden - Access only for ${districts.join(', ')} districts` 
      });
    }
    next();
  };
};

module.exports = {
  apiLimiter,
  securityHeaders,
  authenticate,
  authorize,
  restrictToDistrict
};