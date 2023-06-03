import { type NextApiRequest, type NextApiResponse } from "next"
import { prisma } from "src/server/db"

interface AddCategory extends NextApiRequest {
  body: {
    categoryId: number;
    itemName: string;
  };
}

const handle = async (req: AddCategory, res: NextApiResponse) => {
  if (req.method == 'POST') {
    const { categoryId, itemName } = req.body
    await prisma.foodItem.create({
      data: {
        categoryId: categoryId,
        name: itemName
      }
    });
    await prisma.$disconnect()
    res.status(200).json({ message: "success" });
    return
  }
  if (req.method == 'GET') {
    const f =  await prisma.foodItem.findMany()

    await prisma.$disconnect()
    res.status(200).json({ message: "success", fooditems: f});
    return
  }

  await prisma.$disconnect()
  res.status(200).json({ message: "success" });
}

export default handle
