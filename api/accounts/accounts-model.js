const db=require("../../data/db-config")

const getAll = () => {
  // KODLAR BURAYA
  return db("accounts")
}

const getById = id => {
  // KODLAR BURAYA
  return db("accounts").where('id', id)
}

const create = account => {
  // KODLAR BURAYA
  return db("accounts").insert(account)
}

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts").where('id', id).update(account)
}

const deleteById = id => {
  // KODLAR BURAYA
  return db("accounts").where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
