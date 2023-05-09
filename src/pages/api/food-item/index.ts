import { type NextApiRequest, type NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

interface AddCategory extends NextApiRequest {
  body: {
    categoryId: string;
    itemName: string;
  };
}

const handle = async (req: AddCategory, res: NextApiResponse) => {
  const prisma = new PrismaClient()
  if (req.method == 'POST') {
    console.log(req.body.categoryId)
    console.log(req.body.itemName)
    // await prisma.foodItem.create({
    //   data: {
    //     itemName: ""
    //   }
    // });
    res.status(200).json({ message: "success" });    
  }

  await prisma.$disconnect()
}

export default handle