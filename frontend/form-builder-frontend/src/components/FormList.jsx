import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styles from '../styles/FormList.module.css';

const FormList = ({ onSelectForm, onFormDeleted }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await axios.delete(`/${id}`);
        setForms((prev) => prev.filter((form) => form._id !== id));
        onSelectForm(id);
        alert('Form deleted successfully!');
      } catch (error) {
        console.error('Error deleting form:', error);
        alert('Failed to delete form. Check console for details.');
      }
    }
  };

  if (loading) {
    return <p>Loading forms...</p>;
  }

  return (
    <div className={styles.list}>
      <h2>Available Forms</h2>
      {forms.length === 0 ? (
        <p>No forms found. Create one!</p>
      ) : (
        <ul className={styles.formItems}>
          {forms.map((form) => (
            <li key={form._id} className={styles.formItem}>
              <span className={styles.formTitle}>{form.title}</span>
              <div className={styles.actions}>
                <button onClick={() => onSelectForm(form)} className={styles.viewButton}>
                  View
                </button>
                <button onClick={() => handleDelete(form._id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormList;
