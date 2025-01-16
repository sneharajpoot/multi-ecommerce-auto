import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStore, updateStore } from '../actions/storeActions';

const StoreForm = ({ store, isEdit }) => {
  const [formData, setFormData] = useState(store || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (isEdit) {
      await dispatch(updateStore(store.id, formData));
    } else {
      await dispatch(addStore(formData));
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        required
      />
      {/* Other form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isEdit ? 'Update Store' : 'Add Store'}
      </button>
    </form>
  );
};

export default StoreForm;
