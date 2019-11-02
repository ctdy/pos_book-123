import ajax from "./ajax";

export const reqBook = () => ajax('/api/bookstore/findbook')

export const reqfindByName = (bookName) => ajax('/api/bookstore/findAllByBookName',{bookName})

export const reqfindByCatrgory = (category) => ajax('/api/bookstore/findAllCategory',{category})

export const reqfindByparentId = (parentId) => ajax("/api/category/findAllOneCategory",{parentId})

export const reqfindAllCatgory = () => ajax("/api/category/findCategory")

export const reqfindSubCategory = () => ajax("/api/category/findAlltotalCategory")

export const reqUpdateBook = (id,bookName,price,categoryId,brief,number) => ajax("/api/bookstore/updatebook",{id,bookName,price,categoryId,brief,number})

export const reqAddBook = (bookName,price,categoryId,brief,number,buyPerson,orderPrice) => ajax("/api/bookstore/addbook",{bookName,price,categoryId,brief,number,buyPerson,orderPrice})




