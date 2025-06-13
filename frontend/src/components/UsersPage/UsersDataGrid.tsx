import React, { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { getAllUsers, deleteUser } from '../../shared/userApi';

export interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const UsersDataGrid: React.FC = () => {
  const [rows, setRows] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('Brak uprawnień. Zaloguj się ponownie.');
      return;
    }
    try {
      const users = await getAllUsers(accessToken);
      setRows(users);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Błąd pobierania użytkowników.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) return;
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('Brak uprawnień. Zaloguj się ponownie.');
      return;
    }
    try {
      await deleteUser(id, accessToken);
      fetchUsers(); // odśwież listę po usunięciu
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Błąd podczas usuwania użytkownika.');
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'Imię', width: 130 },
    { field: 'lastname', headerName: 'Nazwisko', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Rola', width: 100 },
    {
      field: 'actions',
      headerName: 'Akcje',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        params.row.role !== 'ADMIN' ? (
        <button
          onClick={() => handleDelete(params.row.id)}
          className="delete-button"
        >
          Usuń
        </button>
      ) : null
    ),
    },
  ];

  return (
    <div className="users-data-grid">
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        showToolbar
      />
    </div>
  );
};

export default UsersDataGrid;