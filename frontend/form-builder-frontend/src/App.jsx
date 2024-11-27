import React, { useState, useEffect } from 'react';
import FormCreator from './components/FormCreator';
import FormList from './components/FormList';
import FormViewer from './components/FormViewer';
import FormEditor from './components/FormEditor';
import axios from './api/axios';
import styles from './App.module.css';

const App = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all forms on initial render
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  // Create a new form
  const handleCreateForm = () => {
    setSelectedForm(null);
    setIsEditing(true);
  };

  // Edit an existing form
  const handleEditForm = (form) => {
    setSelectedForm(form);
    setIsEditing(true);
  };

  // Delete a form
  const handleDeleteForm = async (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await axios.delete(`/${id}`);
        setForms((prev) => prev.filter((form) => form._id !== id));
        alert('Form deleted successfully!');
      } catch (error) {
        console.error('Error deleting form:', error);
        alert('Failed to delete form.');
      }
    }
  };

  // Save a form (create or update)
  const handleSaveForm = (newForm) => {
    setIsEditing(false);

    setForms((prev) =>
      prev.some((f) => f._id === newForm._id)
        ? prev.map((f) => (f._id === newForm._id ? newForm : f))
        : [...prev, newForm]
    );

    alert(newForm._id ? 'Form updated successfully!' : 'Form created successfully!');
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Form Manager</h1>
      {isEditing ? (
        <FormEditor form={selectedForm} onSave={handleSaveForm} />
      ) : selectedForm ? (
        <FormViewer
          form={selectedForm}
          onBack={() => setSelectedForm(null)}
        />
      ) : (
        <div className={styles.home}>
          <button className={styles.createButton} onClick={handleCreateForm}>
            Create New Form
          </button>
          <FormList
            forms={forms}
            onSelectForm={setSelectedForm}
            onEditForm={handleEditForm}
            onDeleteForm={handleDeleteForm}
          />
        </div>
      )}
    </div>
  );
};

export default App;
