import ajax from "./ajax";

export const reqBook = () => ajax('/api/bookstore/findbook')

export const reqfindByName = (bookName) => ajax('/api/bookstore/findAllByBookName',{bookName})

export const reqfindByCatrgory = (category) => ajax('/api/bookstore/findAllCategory',{category})

