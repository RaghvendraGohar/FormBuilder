import { Router } from 'express';
import Form from '../models/Form.js';
const router = Router();

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a single form
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a form
router.post('/create', async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.json(newForm);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a form
router.put('/:id/edit', async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete an input from a form
router.delete('/:id/input/:inputId', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    form.inputs = form.inputs.filter((input) => input._id.toString() !== req.params.inputId);
    await form.save();
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});
// Delete a form
router.delete('/:id', async (req, res) => {
   try { const form = await Form.findByIdAndDelete(req.params.id);
     if (!form) { 
      return res.status(404).json({ error: 'Form not found' });
     }
      res.json({ message: 'Form deleted successfully' });
     }
    catch (error) { 
      res.status(500).json({ error: 'Server Error' }); 
    }
    });
export default router;
