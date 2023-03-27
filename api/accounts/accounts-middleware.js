const AccModel=require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  if(req.body.name ===undefined || req.body.budget ===undefined){
    return res.status(400).json({ message: "name and budget are required" })
  }else if(req.body.name.trim().length <3 || req.body.name.length >100){
    return res.status(400).json({ message: "name of account must be between 3 and 100" })
  }else if(isNaN(parseInt(req.body.budget))){
    return res.status(400).json({ message: "budget of account must be a number" }) //NaN da burayı pas geçiyor.pas geçmemesi lazım
  }else if(Number(req.body.budget)>1000000 || Number(req.body.budget)<0){
    return res.status(400).json({ message: "budget of account is too large or too small" })
  }else{
    req.accCheckedPayload={name:req.body.name.trim(), budget:req.body.budget}
    next()
  }
}

exports.checkAccountNameUnique =async (req, res, next) => {
  // KODLAR BURAYA
  let accounts =await AccModel.getAll()
  if(accounts.some(item=> item.name === req.body.name)){
  return res.status(400).json({ message: "that name is taken" })
  }else{
    next()
  }
}

exports.checkAccountId =async (req, res, next) => {
  // KODLAR BURAYA
  let id=req.params.id
  let account =await AccModel.getById(id)
  if(!account[0]){
    return res.status(404).json({ message: "account not found" })
    }else{
      req.id=req.params.id
      next()
    }
}

/*Yup alternatif
const yup = require("yup")
let userSchema = object({
  name: yup
  .string()
  .min(3,"name of account must be between 3 and 100")
  .max(100,"name of account must be between 3 and 100")
  .required("name and budget are required" )
  budget:yup
  .number("budget of account must be a number")
  .min(0,"budget of account is too large or too small")
  .max(1000000,"budget of account is too large or too small")
  .required("name and budget are required")
});
exports.checkAccountPayload =async (req, res, next) => {
 try {
  if(req.body && req.body.name){
    req.body.name=req.body.name.trim()
  }
  await userSchema.validate(req.body)
 } catch (error) {
  next(error)
 }
}
*/
