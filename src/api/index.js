import ajax from "./ajax";

export const reqBook = () => ajax('/api/bookstore/findbook')

export const reqfindByName = (bookName) => ajax('/api/bookstore/findAllByBookName',{bookName})

export const reqfindByCatrgory = (category) => ajax('/api/bookstore/findAllCategory',{category})

export const reqfindByparentId = (parentId) => ajax("/api/category/findAllOneCategory",{parentId})

export const reqfindAllCatgory = () => ajax("/api/category/findCategory")

export const reqfindSubCategory = () => ajax("/api/category/findAlltotalCategory")

export const reqUpdateBook = (id,bookName,price,categoryId,isbn,press,number) => ajax("/api/bookstore/updatebook",{id,bookName,price,categoryId,isbn,press,number})

export const reqAddBook = (bookName,price,categoryId,isbn,press,number,buyPerson,orderPrice) => ajax("/api/bookstore/addbook",{bookName,price,categoryId,isbn,press,number,buyPerson,orderPrice})

export const reqDeleteBook = (id) => ajax("/api/bookstore/deletebook",{id})

export const reqAddCategory = (parentId,category) => ajax("/api/category/addCategory",{parentId,category})

//id就是bookId
export const reqAddSale = (bookName,press,price,number,id,userId) => ajax("api/saleController/addSale",{bookName,press,price,number,id,userId})

export const reqfindByBookId = (id) => ajax("api/saleController/findByBookId",{id})

export const reqfindAllOrder = () => ajax("api/saleController/findAllOrder")

export const reqUpdateOrder = (number,amount,id) => ajax("api/saleController/updateSale",{number,amount,id})



