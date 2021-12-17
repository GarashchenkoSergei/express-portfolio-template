const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../../db')

const updateProducts = (req, res, next) => {
  try {
    const upload = '/upload'
    const form = new formidable.IncomingForm()

    form.uploadDir = path.join(process.cwd(), upload)
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw new Error('Server problem')
      }
  
      const fileName = path.join(process.cwd(), upload, files.photo.originalFilename)
  
      fs.rename(files.photo.filepath, fileName, function (err) {
        if (err) {
          fs.unlinkSync(files.photo.filepath)
          throw new Error('Server problem')
        }

        const dir = fileName.substr(fileName.indexOf(upload))

        db
          .get('products')
          .push({
            src: dir,
            name: fields.name,
            price: fields.price
          }).write()
      })
    })
    
  } catch (error) {
    throw new Error('Something wrong in products update')
  }
}

module.exports = {
  updateProducts
}