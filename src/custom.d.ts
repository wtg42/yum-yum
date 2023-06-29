import { type AxiosResponse } from "axios";
import { type FoodItem } from "@prisma/client";

// API Response 接口
export interface CategoryFoodItemResponse extends AxiosResponse {
  data: {
    message: string;
    categories: [];
    fooditems: [FoodItem];
  };
}

/** 類別街口 */
export interface Category {
  id: number;
  name: string;
}

/** Page of create category */
interface CreateCategoryResponse extends AxiosResponse {
  data: {
    message: string;
  };
}
