const express = require('express');
const router = express.Router();
const Task = require('../Schema/Task');

router.post('/addTask',async(req,res)=>{
    const {title,description,start_date,end_date,status,assigned_to,priority,time,email,created_by} = req.body;
    const task = new Task({
        title,
        description,
        start_date: new Date(start_date.split('.').reverse().join('-')),
        end_date: new Date(end_date.split('.').reverse().join('-')),
        status,
        assigned_to,
        priority,
        time,
        email,
        created_by
    })
    await task.save();
    res.json({message:"Task Added Successfully"});
})



router.delete('/:taskId/deleteTask', async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.json({ message: "No Task Found" });
    }
    res.json({ message: "Task Deleted Successfully" });
  });

router.put('/:taskId/updateTask',async(req,res)=>{
    const {taskId} = req.params;
    const {title,description,start_date,end_date,status,assigned_to,priority,created_by} = req.body;
    const task = await Task.findById(taskId);
    if(!task){
        res.json({message:"No Task Found"});
    }
    task.title = title;
    task.description = description;
    task.start_date = new Date(start_date.split('.').reverse().join('-'));
    task.end_date = new Date(end_date.split('.').reverse().join('-'));
    task.status = status;
    task.assigned_to = assigned_to;
    task.priority = priority;
    task.created_by = created_by;
    await task.save();
    res.json({message:"Task Updated Successfully"});
})

router.get('/getTask',async(req,res)=>{
    const task = await Task.find();
    if(!task){
        res.json({message:"No Task Found"});
    }
    res.json(task);
})


module.exports = router;