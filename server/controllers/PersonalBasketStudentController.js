const BasketStudents = require('../models/PersonalBasketStudent')

const getAllBasketStudent = async (req, res) => {
    const allBasketStudents = await BasketStudents.find().lean()
    res.json(allBasketStudents)
}

const createNewBasketStudent = async (req, res) => {
    console.log("createNewBasketStudent");
    const { institution, details, entitlementHours } = req.body;
    const newBasketStudent = new PersonalBasketStudent({ institution, details, entitlementHours });
    const savedBasketStudent = await newBasketStudent.save();
    res.json(savedBasketStudent);
}

const getBasketStudentById = async (req, res) => {
    const { _id } = req.body; 
    if (!_id) { return res.status(400).send("Missing BasketStudent ID") }
    const currentBasketStudent = await BasketStudents.findById(_id).lean();
    if (!currentBasketStudent)  return res.status(404).send("The required basketStudent is not found");
    else res.json(currentBasketStudent);
}

const updateBasketStudent = async (req, res) => {
    const { _id, institution, details, entitlementHours } = req.body;
    const currentBasketStudent = await BasketStudents.findById(_id)
    if (!currentBasketStudent)
        res.status(404).send("The required BasketStudent is not found")
    currentBasketStudent.institution = institution
    currentBasketStudent.details = details
    currentBasketStudent.entitlementHours = entitlementHours
    const updatedBasketStudent = await currentBasketStudent.save()
    res.json(updatedBasketStudent)
}

const deleteBasketStudent = async (req, res) => {
    const { _id } = req.body
    const currentBasketStudent = await BasketStudents.findByIdAndDelete(_id).exec()
    if (!currentBasketStudent) {
        return res.status(400).json({ message: 'The required BasketStudent is not found' })
    }
    const reply = `User: '${currentBasketStudent.details.name}' ID: ${currentBasketStudent._id} deleted`
    res.json(reply)
}

module.exports = {
    getAllBasketStudent,
    createNewBasketStudent,
    getBasketStudentById,
    updateBasketStudent,
    deleteBasketStudent
}