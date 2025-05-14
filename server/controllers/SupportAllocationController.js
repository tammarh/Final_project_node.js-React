const PersonalBasketStudent = require('../models/PersonalBasketStudent');
const XLSX = require('xlsx');
const getFrequencyInInstitution = async (req, res) => {
    const { institutionId } = req.params;
    const [highFrequency, lowFrequency] = await Promise.all([
        PersonalBasketStudent.find({
            institution: institutionId,
            'details.disability': { $in: ['לקויי למידה', 'הפרעות התנהגות', 'עיכוב התפתחותי', 'עיכוב התפתחותי שפתי'] }
                .populate('institution')
        })
            .populate('institution'),
        PersonalBasketStudent.find({
            institution: institutionId,
            'details.disability': { $in: ['הפרעות נפשיות', 'ASD תקדורת', 'לקויי ראיה', 'לקויי שמיעה', 'נכויות פיזיות', 'מחלות נדירות'] }
                .populate('institution')
        })
            .populate('institution')
    ])

    if (!highFrequency || !lowFrequency) {
        return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json({ highFrequency, lowFrequency });
}

const comparisonMinistryEducationData = async (req, res) => {

    const { institutionId } = req.params;
    const { excelFilePath } = req.body

    const workbook = XLSX.readFile(uploadedFilePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 

    let headerRowIndex = raw.findIndex(row =>
        row.includes('id') && row.includes('שם') // או כל עמודות שאתה מצפה להן
    );

    if (headerRowIndex === -1) {
        throw new Error("כותרות הטבלה לא נמצאו");
    }

    // המרה ל־JSON עם כותרות מהשורה שנמצאה
    const headers = raw[headerRowIndex];
    const data = raw.slice(headerRowIndex + 1).map(row => {
        const obj = {};
        headers.forEach((key, i) => {
            obj[key] = row[i] ?? '';
        });
        return obj;
    });

    console.log(data);








    const [highFrequency, lowFrequency] = await Promise.all([
        PersonalBasketStudent.find({
            institution: institutionId,
            'details.disability': { $in: ['לקויי למידה', 'הפרעות התנהגות', 'עיכוב התפתחותי', 'עיכוב התפתחותי שפתי'] }
                .populate('institution')
        })
            .populate('institution'),
        PersonalBasketStudent.find({
            institution: institutionId,
            'details.disability': { $in: ['הפרעות נפשיות', 'ASD תקדורת', 'לקויי ראיה', 'לקויי שמיעה', 'נכויות פיזיות', 'מחלות נדירות'] }
                .populate('institution')
        })
            .populate('institution')
    ])

    if (!highFrequency || !lowFrequency) {
        return res.status(404).json({ message: 'No data found' });
    }

}



module.exports = { getFrequencyInInstitution }