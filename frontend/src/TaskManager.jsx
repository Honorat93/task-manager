import React, { useState, useEffect } from 'react';
import './TaskManager.css';  

function TaskManager() {

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState(null);

  // Fonction pour récupérer les taches depuis le backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks'); 
      if (!response.ok) throw new Error('Erreur lors de la récupération des tâches'); 
      const { tasks } = await response.json(); 
      setTasks(tasks); 
    } catch (err) {
      setError(err.message || 'Erreur de réseau'); 
    }
  };

  
  useEffect(() => {
    fetchTasks();
  }, []); 

  // Fonction pour ajouter une tache
  const addTask = async (event) => {
    event.preventDefault(); 

 
    if (!newTaskTitle.trim()) {
      setError('Le titre est obligatoire');
      return;
    }

    try {

      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle }),
      });

  
      if (!response.ok) {
        const { error } = await response.json();
        setError(error || 'Erreur inconnue');
        return;
      }

      // Ajout de la nouvelle tache à la liste si la requête est un succès
      const newTask = await response.json();
      setTasks(prevTasks => [...prevTasks, newTask]); 
      setNewTaskTitle(''); 
    } catch (err) {
      setError('Erreur de réseau'); 
    }
  };

  return (
    <div className="container">
      <h1>Gestionnaire de tâches</h1>

      {/* Formulaire pour ajouter une nouvelle tâche */}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <button type="submit">Ajouter</button>
      </form>

    
      {error && <p className="error">{error}</p>}

    
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
