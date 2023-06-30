const { customAlphabet } = require('nanoid/async');
const nanoid = customAlphabet('1234567890abcdefghijnquvz', 10)

async function generateId() {
  const id = await nanoid(5)
  return id;
}

module.exports = {
    generateId
}