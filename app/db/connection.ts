import { DataSource } from "typeorm";
import dataSource from "@/app/db/data-source";

export const getDBConnection = async (): Promise<DataSource> => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
};
