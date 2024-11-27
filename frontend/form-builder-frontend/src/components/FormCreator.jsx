import React, { useState } from 'react';
import axios from '../api/axios';
import styles from '../styles/FormCreator.module.css';

const FormCreator = ({ onFormCreated }) => {
  const [formTitle, setFormTitle] = useState('');
  const [inputs, setInputs] = useState([]);

  const handleAddInput = () => {
    const type = prompt('Enter input type (text, email, password, number, date):');
    const label = prompt('Enter input label:');
    const placeholder = prompt('Enter placeholder (optional):');

    if (type && label) {
      setInputs((prev) => [...prev, { type, label, placeholder }]);
    } else {
      alert('Type and Label are required!');
    }
  };

  const handleRemoveInput = (index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Form title is required!');
      return;
    }

    try {
      const response = await axios.post('/create', { title: formTitle, inputs });
      onFormCreated(response.data);
      alert('Form created successfully!');
      setFormTitle('');
      setInputs([]);
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form. Check console for details.');
    }
  };

  return (
    <div className={styles.creator}>
      <h2>Create New Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <inputs
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title"
          className={styles.titleInput}
          required
        />
        <div className={styles.inputs}>
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputItem}>
              <span>{`${input.label} (${input.type})`}</span>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveInput(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" className={styles.addButton} onClick={handleAddInput}>
          Add Input
        </button>
        <button type="submit" className={styles.submitButton}>
          Create Form
        </button>
      </form>
    </div>
  );
};

export default FormCreator;
