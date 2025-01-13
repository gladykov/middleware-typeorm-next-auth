import { NextResponse } from "next/server";
import { getDBConnection } from "@/app/db/connection";
import { Project } from "./entities/Project";

export const GET = async () => {
  const connection = await getDBConnection();

  return NextResponse.json(await connection.getRepository(Project).find());
};
