import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAIResponse] = useState('');

  // Carregar les tasques de Firebase
  useEffect(() => {
    const loadTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const loadedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(loadedTasks);
    };
    loadTasks();
  }, []);

  // Afegir una nova tasca
  const addTask = async (e) => {
    e.preventDefault();
    if (!task || !date) return;

    const docRef = await addDoc(collection(db, 'tasks'), {
      name: task,
      date,
      completed: false,
    });

    setTasks([...tasks, { id: docRef.id, name: task, date, completed: false }]);
    setTask('');
    setDate('');
  };

  // Enviar petició a la IA
  const handleAI = async () => {
    if (!prompt) return;

    const res = await fetch('https://ai.hackclub.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || 'Cap resposta';
    setAIResponse(message);
  };

  return (
    <div className="container">
      <h1>Gestor de Tasques</h1>

      <form onSubmit={addTask} className="form">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nova tasca"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Afegir</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.name} – {t.date}
          </li>
        ))}
      </ul>

      <div className="ia-box">
        <h2>Parla amb la IA</h2>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: Dona’m consells per estudiar"
        />
        <button onClick={handleAI}>Enviar</button>
        <p><strong>Resposta IA:</strong></p>
        <div className="response">{aiResponse}</div>
      </div>
    </div>
  );
}

export default App;

