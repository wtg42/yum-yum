import { type NextApiRequest, type NextApiResponse } from "next"
import { prisma } from "src/server/db"

interface AddCategory extends NextApiRequest {
  body: {
    description: string;
    categoryId: number;
    itemName: string;
    isShow: boolean;
    price: number;
  };
}

const handle = async (req: AddCategory, res: NextApiResponse) => {
  if (req.method == 'POST') {
    const { categoryId, itemName, isShow, price, description } = req.body
    await prisma.foodItem.create({
      data: {
        description: description,
        categoryId: Number(categoryId), // 由 form 傳來的資料可能會變成 string  需要轉成 number
        name: itemName,
        isShow: isShow,
        price: price,
      }
    });
    await prisma.$disconnect()
    res.status(200).json({ message: "success" });
    return
  }
  if (req.method == 'GET') {
    const { categoryId } = req.query
    const f = await prisma.foodItem.findMany({
      where: {
        categoryId: Number(categoryId),
      },
    })

    await prisma.$disconnect()
    res.status(200).json({ message: "success", fooditems: f });
    return
  }

  await prisma.$disconnect()
  res.status(200).json({ message: "success" });
}

export default handle
