import * as React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import './CarsDataGrid.css';
import { updateCar } from '../../shared/carApi';

export interface CarData {
  id: number;
  brand: string;
  model: string;
  year: string;
  plateNumber: string;
  pricePerDay: string;
  status: 'AVAILABLE' | 'RENTED' | 'INACTIVE';
  segment: string;
  endOfInspectionDate: string;
  endOfInsuranceDate: string;
  imageLink: string;
}

interface CarsDataGridProps {}

const CarsDataGrid: React.FC<CarsDataGridProps> = () => {
  const [rows, setRows] = React.useState<CarData[]>([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editCar, setEditCar] = React.useState<CarData | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Pobierz auta z API
React.useEffect(() => {
  import('../../shared/carApi').then(({ getAllCars }) => {
    getAllCars().then(data => {
      // MAPOWANIE POL
      const mapped = data.map((car: any) => ({
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plateNumber: car.plate_number,
        pricePerDay: car.price_per_day,
        status: car.status,
        segment: car.segment,
        endOfInspectionDate: car.end_of_inspection_date,
        endOfInsuranceDate: car.end_of_insurance_date,
        imageLink: car.image_link,
      }));
      setRows(mapped);
    });
  });
}, []);

  const handleEdit = (id: number) => {
    const car = rows.find((c) => c.id === id);
    if (car) {
      setEditCar({ ...car });
      setEditOpen(true);
      setSuccess(false);
      setError(null);
    }
  };

  const handleEditClose = () => {
  setEditOpen(false);
  setEditCar(null);
  setSuccess(false);
  setError(null);
  // Odśwież listę aut po zamknięciu okna edycji
  import('../../shared/carApi').then(({ getAllCars }) => {
    getAllCars().then(data => {
      const mapped = data.map((car: any) => ({
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plateNumber: car.plate_number,
        pricePerDay: car.price_per_day,
        status: car.status,
        segment: car.segment,
        endOfInspectionDate: car.end_of_inspection_date,
        endOfInsuranceDate: car.end_of_insurance_date,
        imageLink: car.image_link,
      }));
      setRows(mapped);
    });
  });
};

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditCar((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleEditSave = async () => {
    if (!editCar) return;
    setError(null);
    setSuccess(false);

    // Walidacja
    if (
      !editCar.brand ||
      !editCar.model ||
      !editCar.year ||
      !editCar.plateNumber ||
      !editCar.pricePerDay ||
      !editCar.status ||
      !editCar.segment ||
      !editCar.endOfInspectionDate ||
      !editCar.endOfInsuranceDate ||
      !editCar.imageLink
    ) {
      setError('Wszystkie pola są wymagane.');
      return;
    }
    if (isNaN(Number(editCar.year)) || Number(editCar.year) < 1900) {
      setError('Rok produkcji musi być liczbą większą od 1900.');
      return;
    }
    if (isNaN(Number(editCar.pricePerDay)) || Number(editCar.pricePerDay) <= 0) {
      setError('Cena za dzień musi być liczbą dodatnią.');
      return;
    }

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('Brak uprawnień. Zaloguj się ponownie.');
      return;
    }
    try {
      await updateCar(editCar, accessToken);
      setSuccess(true);
      // Odśwież listę aut po zapisie
      import('../../shared/carApi').then(({ getAllCars }) => {
      getAllCars().then(data => {
        const mapped = data.map((car: any) => ({
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          plateNumber: car.plate_number,
          pricePerDay: car.price_per_day,
          status: car.status,
          segment: car.segment,
          endOfInspectionDate: car.end_of_inspection_date,
          endOfInsuranceDate: car.end_of_insurance_date,
          imageLink: car.image_link,
        }));
        setRows(mapped);
      });
    });
      setTimeout(() => {
        setEditOpen(false);
        setEditCar(null);
        setSuccess(false);
      }, 1200);
    } catch (e) {
      setSuccess(false);
      setError('Błąd podczas zapisu zmian.');
    }
  };

const handleDelete = async (id: number) => {
  if (!window.confirm('Czy na pewno chcesz usunąć ten samochód?')) return;
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    setError('Brak uprawnień. Zaloguj się ponownie.');
    return;
  }
  try {
    await import('../../shared/carApi').then(({ deleteCar }) => deleteCar(id, accessToken));
    // Odśwież listę aut po usunięciu
    import('../../shared/carApi').then(({ getAllCars }) => {
      getAllCars().then(data => {
        const mapped = data.map((car: any) => ({
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          plateNumber: car.plate_number,
          pricePerDay: car.price_per_day,
          status: car.status,
          segment: car.segment,
          endOfInspectionDate: car.end_of_inspection_date,
          endOfInsuranceDate: car.end_of_insurance_date,
          imageLink: car.image_link,
        }));
        setRows(mapped);
      });
    });
  } catch (e) {
    setError('Błąd podczas usuwania samochodu.');
  }
};

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Marka', width: 120 },
    { field: 'model', headerName: 'Model', width: 120 },
    { field: 'year', headerName: 'Rok', width: 90 },
    { field: 'plateNumber', headerName: 'Rejestracja', width: 130 },
    { field: 'pricePerDay', headerName: 'Cena/dzień (PLN)', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'segment', headerName: 'Segment', width: 100 },
    { field: 'endOfInspectionDate', headerName: 'Przegląd do', width: 130 },
    { field: 'endOfInsuranceDate', headerName: 'Ubezpieczenie do', width: 150 },
    {
      field: 'imageLink',
      headerName: 'Zdjęcie',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="car"
          style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
        />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEdit(params.row.id)}
            className="edit-button"
          >
            Edytuj
          </button>
          <button
          onClick={() => handleDelete(params.row.id)}
          className="delete-button"
          style={{ marginLeft: 8 }}
        >
          Usuń
        </button>
        </div>
      ),
    },
  ];

  return (
    <div className="cars-datagrid-container">
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        showToolbar
        getRowId={(row) => row.id}
      />

      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edytuj samochód</DialogTitle>
        <DialogContent>
          {editCar && (
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                label="Marka"
                name="brand"
                value={editCar.brand}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Model"
                name="model"
                value={editCar.model}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Rok produkcji"
                name="year"
                type="number"
                value={editCar.year}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 1900, max: 2100 }}
              />
              <TextField
                label="Numer rejestracyjny"
                name="plateNumber"
                value={editCar.plateNumber}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Cena za dzień (PLN)"
                name="pricePerDay"
                type="number"
                value={editCar.pricePerDay}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                select
                label="Status"
                name="status"
                value={editCar.status}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value="AVAILABLE">Dostępny</MenuItem>
                <MenuItem value="UNAVAILABLE">Nieaktywny</MenuItem>
              </TextField>
              <TextField
                select
                label="Segment"
                name="segment"
                value={editCar.segment}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
              >
                {['A', 'B', 'C', 'D', 'E', 'F', 'J', 'M', 'S'].map(seg => (
                  <MenuItem key={seg} value={seg}>{seg}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Przegląd ważny do"
                name="endOfInspectionDate"
                type="date"
                value={editCar.endOfInspectionDate}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Ubezpieczenie ważne do"
                name="endOfInsuranceDate"
                type="date"
                value={editCar.endOfInsuranceDate}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="URL zdjęcia"
                name="imageLink"
                value={editCar.imageLink}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                required
              />
              {error && (
                <Paper elevation={0} className="form-error" sx={{ mt: 2, p: 1 }}>
                  <Typography variant="body1" color="error">
                    {error}
                  </Typography>
                </Paper>
              )}
              {success && (
                <Paper elevation={0} className="form-success" sx={{ mt: 2, p: 1 }}>
                  <Typography variant="body1" color="success.main">
                    Zmiany zapisane!
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant="outlined">
            Wróć
          </Button>
          <Button onClick={handleEditSave} variant="contained" disabled={!editCar}>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CarsDataGrid;