import React from 'react';
import styles from '../styles/FormViewer.module.css';

const FormViewer = ({ form }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());
    console.log('Form Submitted:', entries);
    alert('Form Submitted! Check the console for the data.');
  };

  return (
    <div className={styles.viewer}>
      <h2>{form.title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {form.inputs.map((input, index) => (
          <div key={index} className={styles.inputGroup}>
            <label>{input.label}</label>
            <input
              type={input.type}
              className={styles.inputbox}
              name={input.label}
              placeholder={input.placeholder}
              required
            />
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormViewer;
