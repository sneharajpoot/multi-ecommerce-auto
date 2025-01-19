import React, { useEffect, useState } from 'react';
import { fetchModules, addModule, updateModule, deleteModule } from '../api/moduleApi'; // Import the API functions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({ id: '', name: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const getModules = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetchModules();
      setModules(response.data);
    } catch (error) {
      setError('Error fetching modules.');
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  const handleSaveModule = async () => {
    setLoading(true);
    try {
      if (isEditMode) {
        await updateModule(currentModule);
        setMessage('Module updated successfully.');
      } else {
        await addModule(currentModule);
        setMessage('Module added successfully.');
      }
      getModules();
      setShowModal(false);
    } catch (error) {
      setError('Error saving module.');
      console.error('Error saving module:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModule = async (id) => {
    setLoading(true);
    try {
      await deleteModule(id);
      setMessage('Module deleted successfully.');
      getModules();
    } catch (error) {
      setError('Error deleting module.');
      console.error('Error deleting module:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditModule = (module) => {
    setCurrentModule(module);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddModule = () => {
    setCurrentModule({ id: '', name: '', description: '' });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModule({ id: '', name: '', description: '' });
    setMessage('');
    setError('');
  };

  return (
    <div>
      <h1>Module List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
      <Button onClick={handleAddModule}>Add Module</Button>
      <ul>
        {modules.map((module) => (
          <li key={module.id}>
            {module.name} - {module.description}
            <Button onClick={() => handleEditModule(module)}>Edit</Button>
            <Button onClick={() => handleDeleteModule(module.id)}>Delete</Button>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Module' : 'Add Module'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formModuleName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter module name"
                value={currentModule.name}
                onChange={(e) => setCurrentModule({ ...currentModule, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formModuleDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter module description"
                value={currentModule.description}
                onChange={(e) => setCurrentModule({ ...currentModule, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveModule}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModuleList;
