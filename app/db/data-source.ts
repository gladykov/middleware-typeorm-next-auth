"use node";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/User";
import { classLoader } from "./loader";
import { loadEnvConfig } from "@next/env";

let options: DataSourceOptions;

if (!process.env.DATABASE_URL) {
  console.log(`Using hardcoded value because we are not staging or production`);
  const projectDir = process.cwd();
  loadEnvConfig(projectDir, true);
  options = {
    type: "postgres",
    host: process.env.RDS_HOSTNAME,
    port: Number(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: "testresultsanalyzerstgrds",
    entities: [User],
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */
    // migrations: classLoader("migrations") as Function[],
    logging: false,
    synchronize: false,
    migrationsRun: false,
  };
} else {
  console.log("We are staging or production");
  options = {
    type: "postgres",
    // Disable SSL mode kind of
    url: process.env.DATABASE_URL.replace("?sslmode=require", ""),
    entities: [User],
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */
    // migrations: classLoader("migrations") as Function[],
    logging: false,
    synchronize: false,
    migrationsRun: false,
    ssl: {
      rejectUnauthorized: false,
      // Prevent Error: self-signed certificate in certificate chain
      allowPartialTrustChain: true,
    },
  };
}

const dataSourceOptions: DataSourceOptions = options;

const AppDataSource = new DataSource({
  ...dataSourceOptions,
});

export default AppDataSource;
export { dataSourceOptions}
