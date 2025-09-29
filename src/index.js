const { prisma } = require("../db/config");

async function createUserWithPost({ name, email, title, content }) {
  // Write your code here
  try{
    if (!name || !email || !title || !content){
      return ({ success: false }) 
    }
    prisma.$transaction(async(tx)=>{
      let user = await tx.User.create({
        data : {
          name : name,
          email : email,
        }
      })
      let post = await tx.Post.create({
        data : {
          userId : user.id,
          title : title,
          content : content
        }
      })
      return ({success: true})
    })



  }catch(error){
    return ({ success: false })
  }
}

module.exports = { createUserWithPost };
