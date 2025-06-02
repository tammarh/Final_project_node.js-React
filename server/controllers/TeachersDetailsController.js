const users = require('../models/User');

const getAllTeachers = async (req, res) => {
    try {
        const allUsers = await users.find().lean();
        const allTeachers = allUsers.filter(user => user.isTeacher);
        res.json(allTeachers);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTeachersByInstitution = async (req, res) => {
    try {
      const institutionId = req.params.institutionId;
  
      if (!institutionId) {
        return res.status(400).json({ message: "Institution ID is required" });
      }
  
      const teachers = await users.find({
        isTeacher: true,
        "HourOfTeacher.Institution": institutionId
      }).lean();
  
  
      res.json(filteredTeachers);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

const createTeacher = async (req, res) => {
    try {
        const { username, password, name, email, rolse, HourOfTeacher } = req.body;
        if (!username || !password || !name || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const newTeacher = new users({
            username,
            password,
            name,
            email,
            rolse: rolse || 'teacher',
            isTeacher: true,
            HourOfTeacher: HourOfTeacher || []
        });

        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);

    } catch (err) {
        res.status(500).json({ message: 'Failed to create teacher', error: err.message });
    }
};

module.exports = { getAllTeachers, createTeacher, getTeachersByInstitution };
