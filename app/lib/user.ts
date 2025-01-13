import "reflect-metadata";
import { getDBConnection } from "@/app/db/connection";
import { DataSource } from "typeorm";
import { User } from "@/app/db/entities/User";

export class UserController {
  dataSource: Promise<DataSource>;

  constructor() {
    this.dataSource = getDBConnection();
  }
  
  async verifyUser(id: string) {
    const dataSourceReady = await this.dataSource;
    const userRepository = dataSourceReady.getRepository(User);
    const result = await userRepository.find({
      select: {
        id: true,
      },
      where: {
        id,
      },
    });

    if (result.length !== 1) {
      return { result: false, error: "No user or too many users" };
    } else {
      return { result: true, error: "" };

    }


  }


}
