const PersonalBasketStudent = require('../models/PersonalBasketStudent');
const XLSX = require('xlsx');
const fs = require('fs')

const getItemsFromDatabase = async (institutionId) => {
    const [highFrequency, lowFrequency] = await Promise.all([
        PersonalBasketStudent.find({
            institution: institutionId,
            'details.disability': { $in: ['לקויי למידה', 'הפרעות התנהגות', 'עיכוב התפתחותי', 'עיכוב התפתחותי שפתי'] }
        },{Id:1, name:1, disability:1, grade:1, hour:1})
            .lean(),
        PersonalBasketStudent.find({
            institution: institutionId,
            'details.disability': { $in: ['הפרעות נפשיות', 'ASD תקדורת', 'לקויי ראיה', 'לקויי שמיעה', 'נכויות פיזיות', 'מחלות נדירות'] }
        },{Id:1, name:1, disability:1, grade:1, hour:1})
            .lean()])
    return [highFrequency, lowFrequency];
}
const getFrequencyInInstitution = async (req, res) => {
    const { institutionId } = req.params;
    const dataMongo = await getItemsFromDatabase(institutionId);
    if (!dataMongo[0] || !dataMongo[1]) {
        return res.status(404).json({ message: 'No data found' })
    }
    const highFrequency = dataMongo[0]
    const lowFrequency = dataMongo[1]
    res.status(200).json({ highFrequency, lowFrequency });
}

const comparisonMinistryEducationData = async (req, res) => {

    const { institutionId } = req.params;
    const { excelFilePath } = req.body

    const dataMongo = await getItemsFromDatabase(institutionId)
    if (!dataMongo[0] || !dataMongo[1]) {
        return res.status(404).json({ message: 'No data found' })
    }

    if (!fs.existsSync(excelFilePath)) {
        return res.status(400).json({ message: 'Excel file not found at the specified path' });
    }
    if (!excelFilePath.endsWith('.xlsx')) {
        return res.status(400).json({ message: 'Invalid file format. Please upload an .xlsx file' });
    }
    const workbook = XLSX.readFile(excelFilePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const headerKeys = ['ת.ז', 'שם', 'כיתה',  'סוג לקות', 'שעות זכאות'];

    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const tables = [];
    let currentTable = null;

    for (const row of rows) {
        if (!row.some(cell => cell)) continue; 

        const isHeader = headerKeys.every(key => row.includes(key));

        if (isHeader) {
            if (currentTable) {
                tables.push(currentTable);
            }
            currentTable = {
                headers: row,
                rows: []
            };
        } else if (currentTable) {
            currentTable.rows.push(row);
        }
    }

    if (currentTable) {
        tables.push(currentTable);
    }

    if (tables.length < 2 || !tables[0]?.rows || !tables[1]?.rows) {
        return res.status(400).json({ message: 'Excel file have problem with tables' });
    }
    const dataFileTable1 = tables[0]?.rows.map(r => {
        const obj = {};
        tables[0].headers.forEach((key, i) => {
            obj[key] = r[i]?.toString() ?? '';
        });
        return obj;
    }) || [];

    const dataFileTable2 = tables[1]?.rows.map(r => {
        const obj = {};
        tables[1].headers.forEach((key, i) => {
            obj[key] = r[i]?.toString() ?? '';
        });
        return obj;
    }) || [];
    const dataFileTables = [dataFileTable1, dataFileTable2];;

    const comparisonResults = [];

    for (let i = 0; i < 2; i++) {
        const excelTable = dataFileTables[i];
        const mongoData = dataMongo[i];
        const differences = [];
        const matches = [];

        excelTable.forEach(excelRecord => {
            const mongoRecord = mongoData.find(record => record.details?.Id === excelRecord['ת.ז'])

            if (mongoRecord) {
                matches.push(excelRecord['ת.ז']);
                // השוואת שדות - התאם לשמות השדות המדויקים ב-mongoData
                if (mongoRecord.details?.name !== excelRecord['שם']) {
                    differences.push({ table: `Table ${i + 1}`, id: excelRecord['ת.ז'], field: 'name', excel: excelRecord['שם'], mongo: mongoRecord.details?.name });
                }
                if (mongoRecord.details?.grade !== excelRecord['כיתה']) {
                    differences.push({ table: `Table ${i + 1}`, id: excelRecord['ת.ז'], field: 'grade', excel: excelRecord['כיתה'], mongo: mongoRecord.details?.grade });
                }
                if (mongoRecord.details?.disability !== excelRecord['סוג לקות']) {
                    differences.push({ table: `Table ${i + 1}`, id: excelRecord['ת.ז'], field: 'disability', excel: excelRecord['סוג לקות'], mongo: mongoRecord.details?.disability });
                }
                if (mongoRecord.details?.hour !== excelRecord['שעות זכאות']) {
                    differences.push({ table: `Table ${i + 1}`, id: excelRecord['ת.ז'], field: 'hour', excel: excelRecord['שעות זכאות'], mongo: mongoRecord.details?.hour });
                }
            } else {
                differences.push({ table: `Table ${i + 1}`, id: excelRecord['ת.ז'], status: 'not found in MongoDB', excelRecord });
            }
        });

        mongoData.forEach(mongoRecord => {
            const excelRecord = excelTable.find(record => record['ת.ז'] === mongoRecord.details?.Id);
            if (!excelRecord) {
                differences.push({ table: `Table ${i + 1}`, id: mongoRecord.details?.Id, status: 'not found in Excel table', mongoRecord: { name: mongoRecord.details?.name, grade: mongoRecord.details?.grade, disability: mongoRecord.details?.disability } });
            }
        });

        comparisonResults.push({
            tableName: `Table ${i + 1}`,
            matchesCount: matches.length,
            differences
        });
    }

    res.status(200).json({ comparisonResults });
}


module.exports = { getFrequencyInInstitution, comparisonMinistryEducationData }