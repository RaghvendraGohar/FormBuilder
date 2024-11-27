import { Schema, model } from 'mongoose';

const formSchema = new Schema({
  title: { type: String, required: true },
  inputs: [
    {
      type: { type: String, required: true },
      label: { type: String, required: true },
      placeholder: String,
    },
  ],
});

export default model('Form', formSchema);
