export default {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 0),
    synchronize: true,
    entities: ['src/**/**.entity{.ts,.js}'],
};