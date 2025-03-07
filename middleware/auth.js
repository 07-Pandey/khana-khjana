function auth (req,res,next) {
    const publicRoutes =[
        '/','/placeOrder','/login'
    ]

    if(publicRoutes.includes (req.url)){
        next();
    }
    else{
        res.status(401).send('Unauthorized')
    }
}

module.exports = auth;