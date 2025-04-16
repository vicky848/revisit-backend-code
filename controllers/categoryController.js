
const Category = require("../models/Category"); 

//  GET CATEGORIES

exports.getCategories = async (request, response) => {
    try {
      console.log(request.user);
      const categories = await Category.find({});
      response.json({ success: true, categories });
    } catch (error) {
      console.error(error);
      response.status(500).json({ success: false, error: "Failed to fetch categories" });
    }
  };
  
// POST CATEGROIES

exports.addCategory = async(request, response) => {

  const {name, itemCount, imageUrl} = request.body 

  try{

   const category = new Category({name, itemCount, imageUrl})  

   await category.save();
   response.status(201).json(category)
} catch(err){
    response.status(500).json({error:"Add category failed"})
}

}


// PUT CATEGORIES 

exports.updateCategory = async(request, response) => {

 const {id} = request.params 


 const {name, itemCount, imageUrl} = request.body 

 try{

   const category = await Category.findByIdAndUpdate(id, {name, itemCount, imageUrl}, {new:true})
     
    response.json(category)

}catch(err){
    response.status(500).json({error:"Update Failed"})
}




}
