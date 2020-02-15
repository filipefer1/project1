const Project = require('../models/project');

module.exports = {
    async index(req, res, next) {

        try {
            const projects = await Project.find().populate('tasks');

            if (!projects) {
                const error = new Error('Could not find projects');
                error.statusCode = 404;
                throw error;
            }

            return res.status(200).json(projects);

        } catch(err) {

            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        };
    },

    async store(req, res, next){
        const {title} = req.body;

        try {
            const project = new Project({
                title
            });
            const savedProject = await project.save();
    
            return res.status(201).json(savedProject);

        } catch(err) {

            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        };
    },

    async update(req, res, next){
        const { title } = req.body;
        const { id } = req.params;

        try {

            const project = await Project.findById(id);
    
            if (!project) {
                const error = new Error('Project not found!');
                error.statusCode = 404;
                throw error;
            }
    
            project.title = title;
            
            const savedProject = await project.save();
    
            return res.status(200).json(savedProject);

        } catch(err) {

            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        };
    },

    async destroy(req, res, next) {
        const {id} = req.params;

        try {
            
            const deletedProject = await Project.findByIdAndDelete(id);
            // O método findByIdAndDelete já trata o erro.
            // if(!deletedProject) {
            //     const error = new Error("The project with the passed ID could not be deleted");
            //     error.statusCode = 404;
            //     throw error;
            // }
            return res.status(200).json(deletedProject);

        } catch(err) {

            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        };

    }
}