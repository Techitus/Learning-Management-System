import mongoose,{Schema} from 'mongoose';
interface ICategory extends Document{
    name : string,
    createdAt : Date
}
const categorySchema = new Schema<ICategory>({
     name : {
        type : String,
        required : true,
        unique : true,
     }
     
})
const Category = mongoose.model('Category',categorySchema)
export default Category
