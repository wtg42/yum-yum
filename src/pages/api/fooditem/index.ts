import { type NextApiRequest, type NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

interface AddCategory extends NextApiRequest {
  body: {
    categoryId: number;
    itemName: string;
  };
}

const handle = async (req: AddCategory, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  if (req.method == 'POST') {
    console.log(req.body.categoryId)
    console.log(req.body.itemName)
    const { categoryId, itemName } = req.body
    await prisma.foodItem.create({
      data: {
        categoryId: categoryId,
        name: itemName
      }
    });
    res.status(200).json({ message: "success" });    
  }

  await prisma.$disconnect()
}

export default handle