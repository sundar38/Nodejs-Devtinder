const adminAuth= (req, res, next) => {
    console.log('Admin auth is started');
    const token= "xyz";
    const isTokenAuthorized= token === "xyz";
    if(isTokenAuthorized){
        console.log('Admin auth is completed');
        next();
    }else{
        res.status(401).send("Unauthorized");
    }
}

const userAuth= (req, res, next) => {
    console.log('User auth is started');
    const token= "xyz";
    const isTokenAuthorized= token === "xyz";
    if(isTokenAuthorized){
        console.log('User auth is completed');
        next();
    }else{
        res.status(401).send("Unauthorized");
    }
}

module.exports= { adminAuth, userAuth };