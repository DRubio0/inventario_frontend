// Importaciones necesarias
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EditItemDialog = ({ open, onClose, item, onSubmit }) => {
  const [editedItem, setEditedItem] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (item) {
      setEditedItem({
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(item.id, editedItem);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedItem.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={editedItem.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={editedItem.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="stock"
          label="Stock"
          type="number"
          fullWidth
          variant="outlined"
          value={editedItem.stock}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemDialog;
