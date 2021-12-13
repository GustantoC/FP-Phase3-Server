const getPagination = (page, size) => {
  if (page <= 0) {
    page = 1;
  }
  if (size <= 0) {
    size = 0
  }
  page--
  const limit = size ? +size : 4;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};


const getPagingData = (data, page, limit) => {
  if (page <= 0) {
    page = 1;
  }
  const { count: totalItems, rows: pageData } = data;
  let currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, pageData, totalPages, currentPage };
};

module.exports = {
  getPagination,
  getPagingData
};