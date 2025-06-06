const mongoose = require('mongoose')
//שעות סל אישי
const PersonalBasketHoursSchema = new mongoose.Schema({

    // סמל מוסד
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Institution'
    },
    // (מספר ושם) מקור
    source: {
        type: String, enum: ['24 - סל שילוב - מתיא', '55 - הנחיית צוות המוס"ח'], required: true
    },
    // (מספר ושם) ייעוד
    designation: {
        type: String, enum: ['1 - תוכניות לימודים', '27 - פרא רפואי', '28 - לקות שמיעה', '30 - לקות ראיה', '1 - תוכניות לימודים', '21 - שעות הכנה'], required: true

    },
    // תאריכים: ממתי 
    fromDate: {
        type: Date,
        required: true
    },
    // עד מתי
    untilDate: {
        type: Date,
        required: true
    },
    // תקן מחושב
    calculatedQuota: {
        type: Number,
        required: true
    },
    // תקן בפועל 
    actualQuota: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const sourceDesignationMap = {
    '24 - סל שילוב - מתיא': [ '1 - תוכניות לימודים', '27 - פרא רפואי' ,'28 - לקות שמיעה' ,'30 - לקות ראיה' ],
    '55 - הנחיית צוות המוס"ח': [ '1 - תוכניות לימודים', '21 - שעות הכנה' ]
}

PersonalBasketHoursSchema.pre('save', function (next) {
    const { source, designation } = this;
    const validDesignations = sourceDesignationMap[source];

    if (!validDesignations || !validDesignations.includes(designation)) {
        return next(new Error(`Invalid designation ${designation} for source ${source}`));
    }
    next();
})

PersonalBasketHoursSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate(); // מקבל את הנתונים המעודכנים
    const source = update.source;
    const designation = update.designation;

    if (source && designation) {
        const validDesignations = sourceDesignationMap[source];
        if (!validDesignations || !validDesignations.includes(designation)) {
            const error = new Error(`Invalid designation "${designation}" for source "${source}"`);
            return next(error);
        }
    }
    next(); // אם הכל תקין, ממשיכים לעדכון
})
module.exports = mongoose.model('PersonalBasketHours', PersonalBasketHoursSchema)