const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {};
    
    const category = req.query.category ? { category: req.query.category } : {};

    const skills = await Skill.find({ ...keyword, ...category }).populate('mentorId', 'name profilePhoto bio');
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  const { name, description, category } = req.body;

  try {
    const skill = new Skill({
      name,
      description,
      category,
      mentorId: req.user._id
    });

    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a skill by ID
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate('mentorId', 'name profilePhoto bio');
    if (skill) {
      res.json(skill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, createSkill, getSkillById };
