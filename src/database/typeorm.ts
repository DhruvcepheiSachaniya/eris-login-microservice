import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
 
dotenv.config();
 
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl:{
     rejectUnauthorized:false
    },
    logging: ['query', 'error'],
 
};
 
export const AppDataSource = new DataSource(dataSourceOptions);
export default dataSourceOptions;