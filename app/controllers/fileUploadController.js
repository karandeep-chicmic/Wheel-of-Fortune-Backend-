const { createSuccessResponse } = require("../helpers");
const { FILE_UPLOADED_SUCCESSFULLY } = require("../utils/messages");

const fileUpload = async (payload) => {
  const { file } = payload;

  return createSuccessResponse(FILE_UPLOADED_SUCCESSFULLY, file.path);
};

module.exports = { fileUpload };
