// src/AddTaskForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function AddTaskForm() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task || !date) return;

    await addDoc(collection(db, 'tasks'), {
      task,
      date,
      completed: false,
    });

    setTask('');
    setDate('');
    alert("Tasca afegida!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de la tasca"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange
