import * as React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import './UsersDataGrid.css';

export interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: 'ADMIN' | 'CLIENT' | 'NOT_LOGGED_IN';
  created_at: string;
}

const initialUsers: UserData[] = [
  {
    id: 1,
    name: 'Jan',
    surname: 'Kowalski',
    email: 'jan.kowalski@example.com',
    role: 'ADMIN',
    created_at: '2023-10-01T12:00:00Z'
  },
  {
    id: 2,
    name: 'Anna',
    surname: 'Nowak',
    email: 'anna.nowak@example.com',
    role: 'CLIENT',
    created_at: '2024-02-14T09:30:00Z'
  },
  {
    id: 3,
    name: 'Piotr',
    surname: 'Zieliński',
    email: 'piotr.zielinski@example.com',
    role: 'CLIENT',
    created_at: '2024-06-05T18:45:00Z',
  },
];

const UsersDataGrid: React.FC = () => {
  const [rows, setRows] = React.useState<UserData[]>(initialUsers);

  const handleDelete = (id: number) => {
    setRows(prev => prev.filter(user => user.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'surname', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Rola', width: 150 },
    { field: 'created_at', headerName: 'Utworzono', width: 200 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row.id)}
          className="delete-button"
        >
          Usuń
        </button>
      )
    }
  ];

  return (
    <div className="users-data-grid">
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        showToolbar
      />
    </div>
  );
};

export default UsersDataGrid;
