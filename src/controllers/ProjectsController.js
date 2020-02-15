const Project = require('../models/project');

module.exports = {
    async index(req, res) {
        const projects = await Project.find().populate('tasks')
        return res.status(200).json(projects);
    },

    async store(req, res){
        const {title} = req.body;
        const project = new Project({
            title
        });
        const savedProject = await project.save();

        return res.status(201).json(savedProject);
    },

    async update(req, res){
        const {title} = req.body;
        const {id} = req.params;

        const project = await Project.findById(id);
        project.title = title;
        
        const savedProject = await project.save();

        return res.status(200).json(savedProject);
    },

    async destroy(req, res) {
        const {id} = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);

        return res.status(200).json(deletedProject);
    }
}