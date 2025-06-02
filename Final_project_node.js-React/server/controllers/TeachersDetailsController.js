const users = require('../models/User');

// Get all teachers
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
  
      // Find all teachers who have at least one HourOfTeacher matching the institution
      const teachers = await users.find({
        isTeacher: true,
        "HourOfTeacher.Institution": institutionId
      }).lean();
  
    //   // Optionally filter HourOfTeacher array to only include the matching institution for each teacher
    //   const filteredTeachers = teachers.map(teacher => {
    //     return {
    //       ...teacher,
    //       HourOfTeacher: teacher.HourOfTeacher.filter(
    //         hour => hour.Institution.toString() === institutionId
    //       )
    //     };
    //   });
  
      res.json(filteredTeachers);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

// Create a new teacher
const createTeacher = async (req, res) => {
    try {
        const { username, password, name, email, rolse, HourOfTeacher } = req.body;

        // Basic validation
        if (!username || !password || !name || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if username already exists
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
