
/**
 * @EnvConfiguration - archivo de configuracion de mis variables de entorno, injectada en el modulo del proyecto
 */
export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT,
    defaultLimit: process.env.DEFAULT_LIMIT || 5,
})
