const db = require('../../db')

const updateSkills = (data) => {
  try {
    const skills = Object.keys(data)
    skills.forEach(skill => {
      db
        .get('skills')
        .find({ title: skill })
        .assign({ number: Number(data[skill]) })
        .write()
    })
  } catch (error) {
    throw new Error('Something wrong in skills update')
  }
}

module.exports = {
  updateSkills
}