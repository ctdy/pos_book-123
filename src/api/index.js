import ajax from "./ajax";

export const reqBook = () => ajax('/api/bookstore/findbook')

export const reqfindByName = (bookName) => ajax('/api/bookstore/findAllByBookName',{bookName})

export const reqfindByCatrgory = (category) => ajax('/api/bookstore/findAllCategory',{category})

export const reqfindByparentId = (parentId) => ajax("/api/category/findAllOneCategory",{parentId})

export const reqfindSubCategory = () => ajax("/api/category/findAlltotalCategory")

export const reqUpdateBook = (id,bookName,price,categoryId,isbn,press,number) => ajax("/api/bookstore/updatebook",{id,bookName,price,categoryId,isbn,press,number})

export const reqAddBook = (bookName,price,categoryId,isbn,press,number,buyPerson,orderPrice) => ajax("/api/bookstore/addbook",{bookName,price,categoryId,isbn,press,number,buyPerson,orderPrice})

export const reqDeleteBook = (id) => ajax("/api/bookstore/deletebook",{id})

export const reqAddCategory = (parentId,category) => ajax("/api/category/addCategory",{parentId,category})

//id就是bookId
export const reqAddSale = (bookName,press,price,number,id,userId,totalNumber,categoryId) => ajax("api/saleController/addSale",{bookName,press,price,number,id,userId,totalNumber,categoryId})

export const reqfindByBookId = (id) => ajax("api/saleController/findByBookId",{id})

export const reqfindAllOrder = () => ajax("api/saleController/findAllOrder")

export const reqUpdateOrder = (number,amount,id) => ajax("api/saleController/updateSale",{number,amount,id})

export const reqDeleteOrder = (id) => ajax("api/saleController/deleteSale",{id})

export const reqUpdateBookNumber = (number,id) => ajax("api/bookstore/updateBookNumber",{number,id})

export const reqfindSaleForm = (id) => ajax("api/saleController/findSaleForm",{id})

export const reqfindDeleteSaleForm = (id) => ajax("api/saleController//deleteSaleByList",{id})

export const reqAddSaleLog = (bookId,number,amount,categoryId) => ajax("api/saleLogController/addSaleLog",{bookId,number,amount,categoryId})

export const reqfindAllSaleLog = () => ajax("/api/saleLogController/findAllSaleLog")

