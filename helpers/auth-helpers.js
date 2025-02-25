// const getUser = req => {
//   return req.user || null
// }

// const ensureAuthenticated = req => {
//   return req.isAuthenticated()
// }

// module.exports = {
//   getUser,
//   ensureAuthenticated
// }

// const jwt = require('jsonwebtoken')

// const getUser = req => {
//   return req.user || null;
// };

// const ensureAuthenticated = req => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return false;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

// module.exports = {
//   getUser
//   ensureAuthenticated
// }
