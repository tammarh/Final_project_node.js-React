const TeachingHours = require('../models/TeachingHours')

const getAllTHours = async (req, res) => {
    const tHour = await TeachingHours.find().populate({path: 'institution',select:'institutionSymbol institutionName settlement localAuthority Supervisor '})
    if (!tHour)
        return res.status(204).json({ message: [] })
    res.json(tHour)
}

const getTHoursByInstitutionSymbol = async (req, res) => {
    const { id } = req.params
    const tHour = await TeachingHours.find({ institution: id })
    if (!tHour)
        return res.status(404).json({ message: ` לא נמצאו שעות הוראה למוסד עם מזהה: ${institutionId}` })
    res.json(tHour)
}

const createTeachingHour = async (req, res) => {
    const { institution, grade, equivalent, studentsAllocation, classType, source, designation, fromDate, untilDate, calculatedQuota, actualQuota } = req.body
    if (!institution)
        return res.status(400).json({ message: 'not found institution' })
    if (!source || !designation || !fromDate || !untilDate || !calculatedQuota || !actualQuota)
        return res.status(400).json({ message: 'missing details' })
    const existingTeachingHour = await TeachingHours.findOne({ institution, grade, designation });
    if (existingTeachingHour) {
        return res.status(409).json({ message: 'שעות הוראה עם מוסד, שכבה וייעוד זה כבר קיימות' });
    }
    const newThour = await TeachingHours.create({ institution, grade, equivalent, studentsAllocation, classType, source, designation, fromDate, untilDate, calculatedQuota, actualQuota })
    res.json(newThour)
}

const updateTeachingHour = async (req, res) => {
    const { _id, ...updateFields } = req.body;

    if (!_id)
        return res.status(400).json({ message: 'Missing ID' });

    const updatedTeachingHour = await TeachingHours.findByIdAndUpdate(
        _id,
        updateFields,
        { new: true, runValidators: true }
    )

    if (!updatedTeachingHour)
        return res.status(404).json({ message: 'Teaching hour not found' })

    res.json(updatedTeachingHour);


}

const deleteTeachHour = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ massage: 'not found TeachHour to delete' })
    const tHour = await TeachingHours.findById(id)
    if (!tHour)
        return res.status(400).json({ massage: 'Invalid ID' })
    const t = await tHour.deleteOne()
    const reply = `teachingHour  ID ${id} deleted`
    res.json(reply)

}

module.exports = { getAllTHours, getTHoursByInstitutionSymbol/*, getAllTHoursofSalShaham*/ , createTeachingHour, updateTeachingHour, deleteTeachHour }
