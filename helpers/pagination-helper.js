const getOffset = (limit = 10, page = 1) => (page - 1) * limit
const getPagination = (limit = 10, page = 1, total = 51) => {
  const totalPage = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1) // 要顯示哪些頁碼，views遍歷的變數
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page // 整理page，不要有負數或超過totalPage的數字
  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
  const next = currentPage + 1 > totalPage ? totalPage : currentPage + 1
  return {
    totalPage,
    pages,
    currentPage,
    prev,
    next
  }
}

module.exports = {
  getOffset,
  getPagination
}
