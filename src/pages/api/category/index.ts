import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db";

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

  if (req.method == "GET") {
    const categories = await prisma.category.findMany()
    await prisma.$disconnect();

    res.status(200).json({ message: "success", categories: categories });
    return
  }

  if (req.method == "POST" && req.body.name.length != 0) {
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

  await prisma.$disconnect();
  res.status(200).json({ message: "fail" });
}
