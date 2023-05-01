import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface AddCategory extends NextApiRequest {
  body: {
    name: string;
  };
}

export default async function handler(
  req: AddCategory,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type",
  );

  if (req.method == "POST" && req.body.name.length != 0) {
    const prisma = new PrismaClient();
    /** add new record */
    await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });
    await prisma.$disconnect();
    res.status(200).json({ message: "success" });
    return
  }

  res.status(200).json({ message: "fail" });
}
