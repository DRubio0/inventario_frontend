import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import AddItemDialog from "../components/AddItemDialog";
import EditItemDialog from "../components/EditItemDialog";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAddDialog = () => setAddItemOpen(true);
  const handleCloseAddDialog = () => setAddItemOpen(false);
  const handleOpenEditDialog = (item) => {
    setCurrentItem(item);
    setEditItemOpen(true);
  };
  const handleCloseEditDialog = () => setEditItemOpen(false);

  const handleAddItem = async (item) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de añadir un nuevo ítem.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, añadir!",
      cancelButtonText: "Cancelar",
    })
      .then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, proceder con la creación
          axios
            .post("http://127.0.0.1:8000/api/items", item)
            .then(() => {
              Swal.fire(
                "¡Añadido!",
                "El ítem ha sido añadido exitosamente.",
                "success"
              );
              fetchItems(); // Actualizar los ítems después de añadir uno nuevo
            })
            .catch((error) => {
              console.error("Error creating item:", error);
              Swal.fire("Error", "No se pudo añadir el ítem.", "error");
            });
        }
      })
      .finally(() => {
        handleCloseAddDialog(); // Cerrar el diálogo independientemente del resultado
      });
  };

  const handleEditItem = async (id, item) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/item/${id}`, item);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      handleCloseEditDialog();
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/items");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, proceder con la eliminación
        axios
          .delete(`http://127.0.0.1:8000/api/item/${id}`)
          .then(() => {
            Swal.fire("¡Eliminado!", "El ítem ha sido eliminado.", "success");
            fetchItems(); // Actualizar los ítems después de eliminar
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire("Error", "No se pudo eliminar el ítem.", "error");
          });
      }
    });
  };

  const handleLogout = async () => {
    try {
      // Enviar solicitud de logout al servidor
      await axios.post("http://localhost:8000/api/logout");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      // Aquí podrías manejar errores de logout si es necesario
    }
    // Redirigir al usuario al inicio de sesión independientemente del resultado del logout
    navigate("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            style={{ marginBottom: 16 }}
          >
            Cerrar Sesión
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddDialog}
            style={{ marginBottom: 16 }}
          >
            Crear Producto
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>$ {item.price}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenEditDialog(item)}>
                      <EditIcon
                        style={{
                          color: "blue",
                        }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon
                        style={{
                          color: "red",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <AddItemDialog
        open={addItemOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddItem}
      />

      <EditItemDialog
        open={editItemOpen}
        onClose={handleCloseEditDialog}
        item={currentItem}
        onSubmit={handleEditItem}
      />
    </Grid>
  );
};

export default Dashboard;
