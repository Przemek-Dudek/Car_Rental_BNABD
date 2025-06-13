import React, { useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import './ReservationsDataGrid.css'; // możesz zmienić nazwę pliku CSS
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export interface ReservationData {
  id: number;
  user_id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  total_price: number;
}

const initialReservations: ReservationData[] = [
  {
    id: 1,
    user_id: 2,
    car_id: 101,
    start_date: '2025-05-25',
    end_date: '2025-06-01',
    status: 'PENDING',
    total_price: 800
  },
  {
    id: 2,
    user_id: 3,
    car_id: 102,
    start_date: '2025-05-20',
    end_date: '2025-05-30',
    status: 'CONFIRMED',
    total_price: 600
  },
  {
    id: 3,
    user_id: 1,
    car_id: 103,
    start_date: '2025-04-01',
    end_date: '2025-04-10',
    status: 'COMPLETED',
    total_price: 900
  },
];

const ReservationDataGrid: React.FC = () => {
  const [rows, setRows] = React.useState<ReservationData[]>(initialReservations);

  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);


  const updateStatus = (id: number, newStatus: ReservationData['status']) => {
    setRows(prev =>
      prev.map(reservation =>
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'car_id', headerName: 'Car ID', width: 100 },
    { field: 'start_date', headerName: 'Start Date', width: 120 },
    { field: 'end_date', headerName: 'End Date', width: 120 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'total_price', headerName: 'Total Price (zł)', width: 150 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 280,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const { id, status } = params.row;

        switch (status) {
          case 'PENDING':
            return (
              <div className="action-buttons">
                <button onClick={() => updateStatus(id, 'CONFIRMED')} className="accept-button">Akceptuj</button>
                <button onClick={() => updateStatus(id, 'CANCELLED')} className="cancel-button">Odrzuć</button>
              </div>
            );
          case 'CONFIRMED':
            return (
              <div className="action-buttons">
                <button onClick={() => updateStatus(id, 'CANCELLED')} className="cancel-button">Anuluj</button>
                <button onClick={() => alert('Przedłużenie niezaimplementowane')} className="extend-button">Przedłuż</button>
              </div>
            );
          case 'COMPLETED':
          return (
            <button
              className="note-button"
              onClick={() => {
                setSelectedReservationId(id);
                setNoteValue('');
                setNoteDialogOpen(true);
              }}
            >
              Dodaj notatkę
            </button>
          );
          default:
            return null;
        }
      }
    }
  ];

  return (
    <div className="reservations-data-grid">
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        showToolbar
      />
      {/* Dialog dla notatki */}
      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Dodaj notatkę do rezerwacji</DialogTitle>
        <DialogContent>
          <TextField
            label="Notatka"
            value={noteValue}
            onChange={e => setNoteValue(e.target.value.slice(0, 150))}
            fullWidth
            multiline
            inputProps={{ maxLength: 150 }}
            helperText={`${noteValue.length}/150`}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)} variant="outlined">Wróć</Button>
          <Button onClick={() => setNoteDialogOpen(false)} variant="contained">Zapisz</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReservationDataGrid;