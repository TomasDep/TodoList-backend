const { response } = require('express');
const { model } = require('mongoose');

const Task = require('../models/task');

/**
 * Metodo para obtener todas las tareas
 */
const getTasks = async (req, res = response) => {
  /**
   * Crear una lista de todas las tareas registradas
   */
   const tasks = await Task.find();

   res.json({
     ok: true,
     message: 'Lista de tareas',
     tasks,
   });
}

/**
 * Metodo para crear una tarea
 */
const createTask = async (req, res = response) => {
  /**
   * Obtener el uid del usuario del request
   */
  const uid = req.uid;
  const task = new Task({ user: uid, ...req.body });
  
  try {
    /**
     * Guardar la tarea en la base de datos
     */
    const taskDb = await task.save();

    res.json({
      ok: true,
      message: 'Tarea creada correctamente',
      task: taskDb
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Error: No se pudo registrar la tarea en la base de datos',
    });
  }
}

/**
 * Metodo para actualizar una tarea
 */
const updateTask = async (req, res = response) => {
  const taskId = req.params.id;
  /**
   * Obtener el uid del usuario del request
   */
  const uid = req.uid;

  try {
    /**
   * Revisar si existe la tarea
   */
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        message: 'No se encuentra la tarea seleccionada'
      });
    }

    /**
     * guardar los cambios de la tarea
     */
    const changesTask = {
      ...req.body,
      user: uid
    };

    /**
     * Actualizar la tarea
     */
    const taskUpdated = await Task.findByIdAndUpdate(taskId, changesTask, { new: true });

    res.json({
      ok: true,
      message: 'Tarea actualizada correctamente',
      task: taskUpdated
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error: No se pudo actualizar la tarea en la base de datos',
    });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
}