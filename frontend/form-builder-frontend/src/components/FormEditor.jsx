import React, { useState, useEffect } from 'react';
import styles from '../styles/FormEditor.module.css';///FormEditor.module.css
import axios from '../api/axios';

const FormEditor = ({ form, onSave }) => {
  const [formData, setFormData] = useState(form || { title: '', inputs: [] });

  useEffect(() => {
    setFormData(form || { title: '', inputs: [] });
  }, [form]);

  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleAddInput = (type) => {
    if (formData.inputs.length >= 20) {
      alert('Maximum of 20 inputs allowed.');
      return;
    }

    const label = prompt('Enter the label for the input:');
    const placeholder = prompt('Enter the placeholder for the input (optional):');
    if (label) {
      setFormData((prev) => ({
        ...prev,
        inputs: [...prev.inputs, { type, label, placeholder }],
      }));
    }
  };

  const handleDeleteInput = (index) => {
    setFormData((prev) => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index),
    }));
  };

  const handleSaveForm = async () => {
    try {
      if (formData._id) {
        // Update existing form
        await axios.put(`/${formData._id}/edit`, formData);
      } else {
        // Create new form
        const response = await axios.post('/create', formData);
        setFormData(response.data);
      }
      alert('Form saved successfully!');
      onSave(formData);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <div className={styles.editor}>
      <input
        type="text"
        value={formData.title}
        onChange={handleTitleChange}
        className={styles.titleInput}
        placeholder="Form Title"
      />
      <div className={styles.inputList}>
        {formData.inputs.map((input, index) => (
          <div key={index} className={styles.inputItem}>
            <span>{`${input.label} (${input.type})`}</span>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteInput(index)}
            >
              D
            </button>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        {['text', 'email', 'password', 'number', 'date'].map((type) => (
          <button
            key={type}
            className={styles.addButton}
            onClick={() => handleAddInput(type)}
          >
            Add {type}
          </button>
        ))}
      </div>
      <button className={styles.saveButton} onClick={handleSaveForm}>
        Save Form
      </button>
    </div>
  );
};

export default FormEditor;
