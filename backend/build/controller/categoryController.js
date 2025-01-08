"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categoryModel_1 = __importDefault(require("../database/models/categoryModel"));
class CategoryController {
    constructor() {
        this.categoryData = [
            {
                categoryName: "Fruits & Vegetables"
            }, {
                categoryName: "Dairy & Eggs"
            }, {
                categoryName: "Kitchen Essentials"
            }, {
                categoryName: "Bakery"
            }
        ];
    }
    //category seeding
    seedCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorydata = yield categoryModel_1.default.findAll();
                if (categorydata.length > 0) {
                    console.log("category already seeded");
                    return;
                }
                else {
                    const category = yield categoryModel_1.default.bulkCreate(this.categoryData);
                }
            }
            catch (error) {
                console.log("error seeding category", error);
            }
        });
    }
    //add category
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryName } = req.body;
            if (!categoryName) {
                res.status(400).json({
                    message: "Enter category name first"
                });
                return;
            }
            const data = yield categoryModel_1.default.create({
                categoryName
            });
            res.status(200).json({
                message: "Category added successfully",
                data
            });
        });
    }
    //get all categories
    getAllCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield categoryModel_1.default.findAll();
            res.status(200).json({
                message: "Categories fetched successfully",
                data
            });
        });
    }
    //delete cartegories
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield categoryModel_1.default.findOne({ where: { id } });
            if (!data) {
                res.status(400).json({
                    message: "Category not found"
                });
                return;
            }
            yield categoryModel_1.default.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({
                message: "Category deleted successfully",
                data
            });
        });
    }
    //edit category
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { categoryName } = req.body;
            const data = yield categoryModel_1.default.findOne({ where: { id } });
            if (!data) {
                res.status(400).json({
                    message: "Category not found"
                });
                return;
            }
            const updatedData = yield categoryModel_1.default.update({
                categoryName
            }, {
                where: {
                    id
                }
            });
            res.status(200).json({
                message: "Category updated successfully",
                updatedData
            });
        });
    }
}
exports.CategoryController = CategoryController;
exports.default = new CategoryController();
