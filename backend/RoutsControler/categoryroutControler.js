import slugify from "slugify";
import Category from "../Schema/categorySchema.js";

export const createCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) return res.status(500).send({ message: `Category is Required`, success: false })
        const existingCategory = await Category.findOne({ category })
        if (!existingCategory) return res.status(200).send({ message: `Category Already Exist`, success: false })
        const newCategory = await new Category({
            name: category,
            slug: slugify(category)
        }).save()

        res.status(201).send({
            success: true,
            message: "New Category Created",
            newCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) return res.status(500).send({ message: `Category is Required`, success: false })
        const { id } = req.params
        const updaterCat = await Category.findByIdAndUpdate(id, { name: category, slug: slugify(category) }, { new: true })

        res.status(201).send({
            success: true,
            message: " Category Updated",
            updaterCat
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const allCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        if (!category || category.length === 0) return res.status(200).send({ message: `No Category Found`, success: false })
        res.status(200).send({
            message: `All Category`,
            success: true,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const singleCategory=async(req,res)=>{
    try {
        const category = await Category.findOne({slug:req.params});
        res.status(200).send({
            message: `Single Category`,
            success: true,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const deleteCategory=async(req,res)=>{
try {
    const {id} = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
        message: ` Category Deleted`,
        success: true,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
}
}