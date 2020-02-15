const Task = require('../models/task');
const Project = require('../models/project');

module.exports = {
    async store(req, res) {
        const {title} = req.body;
        const {id: projectId} = req.params;

        const task = new Task({
            title,
            projeto: projectId
        });

        const savedTask = await task.save();

        const project = await Project.findById(projectId);
        project.tasks.push(savedTask);
        await project.save()

        return res.status(201).json(savedTask);
    }
}