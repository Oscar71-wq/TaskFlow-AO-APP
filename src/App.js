import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  // Cargar tareas al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const loadedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error cargando tareas:", error);
      }
    };
    loadTasks();
  }, []);

  // Añadir tarea nueva
  const addTask = async (e) => {
    e.preventDefault();
    if (!task || !date) return;

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        name: task,
        date,
        completed: false,
      });
      setTasks([...tasks, { id: docRef.id, name: task, date, completed: false }]);
      setTask('');
      setDate('');
    } catch (error) {
      console.error("Error añadiendo tarea:", error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestor de Tasques</h1>
      <form onSubmit={addTask} style={{ marginBottom: 20 }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nova tasca"
          style={{ padding: 8, width: '60%', marginRight: 8 }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: 8, width: '30%', marginRight: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Afegir</button>
      </form>

      <ul>
        {tasks.length === 0 ? (
          <li>No hay tareas</li>
        ) : (
          tasks.map((t) => (
            <li key={t.id}>
              {t.name} – {t.date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
