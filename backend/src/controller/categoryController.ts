import Category from "../database/models/categoryModel";
import {Request,Response} from 'express';
import { CategoryType } from "../types/categoryTypes";

export class CategoryController{
    categoryData=[
        {

            categoryName: "Fruits & Vegetables"
        },{
            categoryName: "Dairy & Eggs"
        },{
            categoryName: "Kitchen Essentials"
        },{
            categoryName: "Bakery"
        }
      
    ];

    //category seeding
    async seedCategory():Promise<void>{
        try {
            const categorydata = await Category.findAll();
            if(categorydata.length>0){
                console.log("category already seeded");
                return;
            }else{
                const category = await Category.bulkCreate(this.categoryData);
            }
        } catch (error) {
            console.log("error seeding category",error);
        }
    }

   //add category
   async addCategory(req:Request,res:Response):Promise<void>{
    const {categoryName}:CategoryType = req.body;
    if(!categoryName){
        res.status(400).json({
            message:"Enter category name first"
        })
        return;
    }
    const data = await Category.create({
        categoryName
    })
    res.status(200).json({
        message:"Category added successfully",
        data
        })
}

//get all categories
async getAllCategory(req:Request,res:Response):Promise<void>{
    const data = await Category.findAll();
    res.status(200).json({
        message:"Categories fetched successfully",
        data
    })
}

//delete cartegories
async deleteCategory(req:Request,res:Response):Promise<void>{
    const {id} = req.params;
    const data = await Category.findOne({where:{id}})
    if(!data){
        res.status(400).json({
            message:"Category not found"
        })
        return;
    }
     await Category.destroy({
        where:{
            id
        }
    })
    res.status(200).json({
        message:"Category deleted successfully",
        data
    })
}

//edit category
async updateCategory(req:Request,res:Response):Promise<void>{
    const {id} = req.params;
    const {categoryName}:CategoryType = req.body;
    const data = await Category.findOne({where:{id}})
    if(!data){
        res.status(400).json({
            message:"Category not found"
        })
        return
    }
    const updatedData = await Category.update({
        categoryName
    },{
        where:{
            id
        }
    })
    res.status(200).json({
        message:"Category updated successfully",
        updatedData
    })
}


}
export default new CategoryController();