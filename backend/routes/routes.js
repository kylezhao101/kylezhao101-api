const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Project = require('../models/Project');

require('dotenv').config();

// Middleware function to check API key
function authenticateApiKey(req, res, next) {
    const { apikey } = req.headers; 

    if (!apikey) {
      return res.status(401).json({ message: 'Unauthorized - API key missing' });
    }
  
    const hashedApiKey = hashAPIKey(apikey);
    const storedApiKeyHash = process.env.KYLE_HASHED_API_KEY; 
  
    if (hashedApiKey !== storedApiKeyHash) {
      return res.status(403).json({ message: 'Forbidden - Invalid API key' });
    }

    next();
}
function hashAPIKey(apiKey) {
    const { createHash } = require('crypto');
  
    const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');
  
    return hashedAPIKey;
}

//Post Methods

//POST Education
router.post('/education', authenticateApiKey, async (req, res) => {
    const { institution, url, type, major, area, startDate, endDate } = req.body;

    const newEducation = new Education({
        institution,
        url,
        type,
        major,
        area,
        startDate: new Date(startDate),
        endDate: endDate === "Ongoing" ? endDate : new Date(endDate), // Convert endDate to Date if not "Ongoing"
    });

    try {
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});
//POST Experience
router.post('/experience', authenticateApiKey, async (req,res) => {
    const { organization, position, startDate, endDate, description } = req.body;

    const newExperience = new Experience({
        organization,
        position,
        startDate,
        endDate,
        description,
    });

    try {
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//POST Project
router.post('/project', authenticateApiKey, async (req, res) => {
    const { name, tech, range, description, url } = req.body;

    const newProject = new Project({
        name,
        tech,
        range,
        description,
        url,
    });

    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get Methods

// Get all Education, Experience, and Projects
router.get('/all', async (req, res) => {
    try {
        const education = await Education.find();
        const experience = await Experience.find();
        const projects = await Project.find();

        res.json({ education, experience, projects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all Education
router.get('/education', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all Experience
router.get('/experience', async (req, res) => {
    try {
        const experience = await Experience.find();
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get all Projects
router.get('/project', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update methods

// Update Education by ID
router.patch('/education/:id', authenticateApiKey, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Education.findByIdAndUpdate(
            id, updatedData, options
        );

        if (!result) {
            return res.status(404).json({ message: 'Education not found' });
        }

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update Experience by ID
router.patch('/experience/:id', authenticateApiKey, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Experience.findByIdAndUpdate(
            id, updatedData, options
        );

        if (!result) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update Project by ID
router.patch('/project/:id', authenticateApiKey, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Project.findByIdAndUpdate(
            id, updatedData, options
        );

        if (!result) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete Methods

// Delete Education by ID
router.delete('/education/:id', authenticateApiKey, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Education.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Education not found' });
        }

        res.send(`Education with ID ${id} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete Experience by ID
router.delete('/experience/:id', authenticateApiKey, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Experience.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.send(`Experience with ID ${id} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete Project by ID
router.delete('/project/:id', authenticateApiKey, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Project.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.send(`Project with ID ${id} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;