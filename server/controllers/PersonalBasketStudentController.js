const PersonalBasketStudent = require('../models/PersonalBasketStudent');
const BasketStudents = require('../models/PersonalBasketStudent')

const getAllBasketStudent = async (req, res) => {
    const allBasketStudents = await BasketStudents.find().lean()
    res.json(allBasketStudents)
}

const getStudentSortByDisability = async (req, res) => {
    const SortSelection = req.query.sortBy
    const sortObject = {[`details.${SortSelection}`]: 1}
    const allBasketStudents = await BasketStudents.find().sort(sortObject).lean()
    res.json(allBasketStudents)
}

const createNewBasketStudent = async (req, res) => {
  try {
    const { institution, details, entitlementHours } = req.body;
    if (!institution || !details || !entitlementHours) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBasketStudent = await PersonalBasketStudent.create({
      institution,
      details,
      entitlementHours
    });

    res.status(201).json(newBasketStudent);
    console.log("New BasketStudent created:", newBasketStudent);
  } catch (err) {
    console.error("Error in createNewBasketStudent:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const getBasketStudentById = async (req, res) => {
    const { id } = req.query; 
    if (!id) { return res.status(400).send("Missing BasketStudent ID") }
    const currentBasketStudent = await BasketStudents.findById(id).lean();
    if (!currentBasketStudent)  return res.status(404).send("The required basketStudent is not found");
    else res.json(currentBasketStudent);
}

// const updateBasketStudent = async (req, res) => {
//     const { _id, institution, details, entitlementHours } = req.body;
//     if(!_id) return res.status(404).send("no id")
//     const currentBasketStudent = await BasketStudents.findById(_id)
//     if (!currentBasketStudent)
//         return res.status(404).send("The required BasketStudent is not found")
//     currentBasketStudent.institution = institution
//     currentBasketStudent.details = details
//     currentBasketStudent.entitlementHours = entitlementHours
//     const updatedBasketStudent = await currentBasketStudent.save()
//     res.json(updatedBasketStudent)
// }

// const deleteBasketStudent = async (req, res) => {
//     const { _id } = req.body
//     const currentBasketStudent = await BasketStudents.findByIdAndDelete(_id).exec()
//     if (!currentBasketStudent) {
//         return res.status(400).json({ message: 'The required BasketStudent is not found' })
//     }
//     const reply = `User: '${currentBasketStudent.details.name}' ID: ${currentBasketStudent._id} deleted`
//     res.json(reply)
// }

module.exports = {
    getAllBasketStudent,
    getStudentSortByDisability,
    createNewBasketStudent,
    getBasketStudentById
    // updateBasketStudent,
    // deleteBasketStudent
}