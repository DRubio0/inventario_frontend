import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const AddItemDialog = ({ open, onClose, onSubmit }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(newItem);
    // Resetear el estado del formulario a valores por defecto
    setNewItem({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    onClose(); // Cerrar diálogo tras enviar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newItem.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={newItem.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={newItem.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="stock"
          label="Stock"
          type="number"
          fullWidth
          variant="outlined"
          value={newItem.stock}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
