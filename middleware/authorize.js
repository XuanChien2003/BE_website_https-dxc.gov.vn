function authorize(roles = []){
    if (typeof roles === "string") { 
        roles = [roles]; 
    }
    return (req, res, next) => {
        const user = req.user;
        if(!user) {
            return res.status(401).json({
                status: false,
                message: 'Đăng nhập lại'
            })
        }

        if(!roles.includes(user.role)){
            return res.status(403).json(
                {
                    status: false,
                    message: "Không có quyền truy cập"
                }
            )
        }
        next();
    }
}

module.exports = {
    authorize
}