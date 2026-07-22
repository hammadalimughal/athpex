let env = {};

module.exports = {
    emailUser: process.env.PORT || env.emailUser || 'noreply@betatestinglink.com',
    emailPass: process.env.emailPass || env.emailPass || 'zU7VMdddbkPD9X7yL4Dt',
    PORT: process.env.PORT || env.PORT || 8756,
    JWT_SECRET: process.env.JWT_SECRET || env.JWT_SECRET || "WnMKqXFBu+tAvM6jJlf+jqDmnk5eFY/cxSLiHxgcu0=",
    MONGODB_URI: process.env.MONGODB_URI || (process.env.NODE_ENV === 'production' || process.env.VERCEL ? env.mongodbUri2 : env.mongodbUri) || "mongodb://localhost:27017/athpex"
};
