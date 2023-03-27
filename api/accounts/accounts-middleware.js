const AccModel=require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  if(!req.body.name || !req.body.budget){
    return res.status(400).json({ message: "name and budget are required" })
  }else if(req.body.name.trim().length <3 || req.body.name.length >100){
    return res.status(400).json({ message: "name of account must be between 3 and 100" })
  }else if(!Number(req.body.budget) || isNaN(req.body.budget)){
    return res.status(400).json({ message: "budget of account must be a number" }) //Nan da burayı pas geçiyor.pas geçmemesi lazım
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
