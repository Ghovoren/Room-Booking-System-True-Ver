//if got time, introduce in database permissions as well as role_permissions and update this for scalability


export const staffAuthorization = async (req, res, next) => {
    const auth = req.user
    const isAdmin = auth.role === 'admin'
    const isStaff = auth.role === 'staff'
    if (!isAdmin && !isStaff){
        console.error('[staffAuthorization] Forbidden access attempt', {
            role: auth?.role,
            path: req.originalUrl,
            user: auth?.publicId
        })
        return res.status(403).send('Not Authorized');
    }
    next()
}

export const userAuthorization = (req, res, next) => {
    const auth = req.user
    const isAdmin = auth.role === 'admin'
    const isStaff = auth.role === 'staff'
    const isOwner = auth.publicId === req.params.userId
    if (!isAdmin && !isStaff && !isOwner){
        console.error('[userAuthorization] Forbidden access attempt', {
            role: auth?.role,
            target: req.params.userId,
            user: auth?.publicId
        })
        return res.status(403).send('Not Authorized')
    }
    next()
}