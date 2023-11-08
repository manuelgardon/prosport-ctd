const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRETO, (error, usuarioData) => {
        if (error) {
          console.error(error);
          return res.status(401).json({ error: 'Error al verificar el token' });
        }
        if (usuarioData.id) {
          req.usuarioData = usuarioData;
          next(); 
        } else {
          res.status(401).json({ error: 'Usuario no encontrado' });
        }
      });
    } else {
      res.status(401).json({ error: 'Token no proporcionado' });
    }
  };

module.exports = authMiddleware;