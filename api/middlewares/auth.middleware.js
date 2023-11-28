const jwt = require('jsonwebtoken');

const verificarTokenMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, usuarioData) => {
        if (error) {
          console.error(error);
          return res.status(401).json({ error: 'Error al verificar el token' });
        }
  
        if (usuarioData.id) {
          // Si el token es válido, puedes almacenar el usuarioData en req para usarlo en la ruta.
          req.usuarioData = usuarioData;
          next(); // Continuar con la siguiente función (la ruta en este caso).
        } else {
          res.status(401).json({ error: 'Usuario no encontrado' });
        }
      });
    } else {
      res.status(401).json({ error: 'Token no proporcionado' });
    }
  };

module.exports = verificarTokenMiddleware;