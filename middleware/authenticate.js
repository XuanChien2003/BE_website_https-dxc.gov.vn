const jwt = require("jsonwebtoken")
function checkAuthenticate(req, res, next) {
    try {
        const publicRoutes = ['/register', '/login', '/auth/refresh', '/ai/chat']
        const isPublic = publicRoutes.some(route => req.path.includes(route));
        if (isPublic || req.method === 'GET') {
            return next();
        }

        const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.accessToken;;

        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'Đăng nhập lại'
            })
        }

        const info = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = info;
        return next();


    } catch (err) {
        return res.status(401).json({
            status: false,
            message: 'Đăng nhập lại'
        })
    }
}
module.exports = { checkAuthenticate };