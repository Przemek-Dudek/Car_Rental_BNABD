import React, { useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import './UsersRentingsGrid.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';


export interface UserRenting {
  id: number;
  car_name: string;
  start_date: string;
  end_date: string;
  status: 'PENDING' | 'CONFIRMED' | 'PENDING_RENEWED' | 'CANCELLED' | 'COMPLETED';
  total_price: number;
}

const mockRentings: UserRenting[] = [
  {
    id: 1,
    car_name: 'Toyota Corolla',
    start_date: '2025-05-28',
    end_date: '2025-06-05',
    status: 'PENDING',
    total_price: 850,
  },
  {
    id: 2,
    car_name: 'BMW 3 Series',
    start_date: '2025-05-01',
    end_date: '2025-05-10',
    status: 'CONFIRMED',
    total_price: 1200,
  },
  {
    id: 3,
    car_name: 'Ford Focus',
    start_date: '2025-03-15',
    end_date: '2025-03-20',
    status: 'COMPLETED',
    total_price: 500,
  },
  {
    id: 4,
    car_name: 'Audi A4',
    start_date: '2025-05-10',
    end_date: '2025-05-15',
    status: 'PENDING_RENEWED',
    total_price: 950,
  },
  {
    id: 5,
    car_name: 'Volkswagen Golf',
    start_date: '2025-04-20',
    end_date: '2025-04-30',
    status: 'CANCELLED',
    total_price: 700,
  },
];

const UsersRentingsGrid: React.FC = () => {
  const [rows, setRows] = React.useState<UserRenting[]>(mockRentings);
  const [rateDialogOpen, setRateDialogOpen] = useState(false);
  const [rateValue, setRateValue] = useState<number | string>('');
  const [selectedRentingId, setSelectedRentingId] = useState<number | null>(null);

  const updateStatus = (id: number, newStatus: UserRenting['status']) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'car_name', headerName: 'Samochód', width: 150 },
    { field: 'start_date', headerName: 'Data rozpoczęcia', width: 150 },
    { field: 'end_date', headerName: 'Data zakończenia', width: 150 },
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'total_price', headerName: 'Cena całkowita (zł)', width: 180 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 300,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const { id, status } = params.row;

        switch (status) {
          case 'PENDING':
            return (
              <button
                onClick={() => updateStatus(id, 'CANCELLED')}
                className="cancel-button"
              >
                Anuluj
              </button>
            );
          case 'CONFIRMED':
            return (
              <div className="action-buttons">
                <button
                  onClick={() => updateStatus(id, 'CANCELLED')}
                  className="cancel-button"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => {
                    alert('Przedłużenie niezaimplementowane');
                    updateStatus(id, 'PENDING_RENEWED');
                  }}
                  className="extend-button"
                >
                  Przedłuż
                </button>
              </div>
            );
          case 'PENDING_RENEWED':
            return <span>Oczekuje na zatwierdzenie przedłużenia</span>;
          case 'COMPLETED':
          return (
            <button
              className="rate-button"
              onClick={() => {
                setSelectedRentingId(id);
                setRateValue('');
                setRateDialogOpen(true);
              }}
            >
              Oceń
            </button>
          );
          default:
            return null;
        }
      },
    },
  ];

  return (
    <div className="reservations-data-grid">
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        checkboxSelection
      />
      {/* Dialog dla oceny */}
      <Dialog open={rateDialogOpen} onClose={() => setRateDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Oceń rezerwację</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Ocena"
            value={rateValue}
            onChange={e => setRateValue(e.target.value)}
            fullWidth
            margin="normal"
          >
            {[0, 1, 2, 3, 4, 5].map(val => (
              <MenuItem key={val} value={val}>{val}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRateDialogOpen(false)} variant="outlined">Wróć</Button>
          <Button onClick={() => setRateDialogOpen(false)} variant="contained">Zapisz</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersRentingsGrid;
    