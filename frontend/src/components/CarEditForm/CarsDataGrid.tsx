import * as React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import './CarsDataGrid.css';

export interface CarData {
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  price_per_day: number;
  status: 'AVAILABLE' | 'RENTED' | 'INACTIVE';
  segment: string;
  przeglad_wazny_koniec: string;
  ubezpieczenie_koniec: string;
  image: string;
}

const carList: CarData[] = [
  {
    brand: "Hyundai",
    model: "i30",
    year: 2019,
    plate_number: "KR7890MN",
    price_per_day: 100,
    status: "AVAILABLE",
    segment: "C",
    przeglad_wazny_koniec: "2025-02-20",
    ubezpieczenie_koniec: "2025-01-10",
    image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
  },
  {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    plate_number: "WA4567BC",
    price_per_day: 120,
    status: "RENTED",
    segment: "C",
    przeglad_wazny_koniec: "2025-06-15",
    ubezpieczenie_koniec: "2025-03-01",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
  },
  {
    brand: "BMW",
    model: "3 Series",
    year: 2022,
    plate_number: "DW1234XY",
    price_per_day: 250,
    status: "AVAILABLE",
    segment: "D",
    przeglad_wazny_koniec: "2026-01-01",
    ubezpieczenie_koniec: "2025-12-01",
    image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"
  },
  {
    brand: "Kia",
    model: "Ceed",
    year: 2018,
    plate_number: "PO2345GH",
    price_per_day: 90,
    status: "INACTIVE",
    segment: "C",
    przeglad_wazny_koniec: "2024-11-10",
    ubezpieczenie_koniec: "2024-10-05",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
  },
  {
    brand: "Mercedes",
    model: "A-Class",
    year: 2021,
    plate_number: "LU5678JK",
    price_per_day: 200,
    status: "AVAILABLE",
    segment: "C",
    przeglad_wazny_koniec: "2025-08-30",
    ubezpieczenie_koniec: "2025-07-15",
    image: "https://images.pexels.com/photos/1007417/pexels-photo-1007417.jpeg"
  }
];

interface CarsDataGridProps {
  onEdit: (car: CarData) => void;
}

const CarsDataGrid: React.FC<CarsDataGridProps> = ({ onEdit }) => {
  const [rows] = React.useState(carList.map(car => ({ ...car, id: car.plate_number })));

  const handleEdit = (id: string) => {
    const car = carList.find((c) => c.plate_number === id);
    if (car) {
      onEdit(car);
    }
  };

  const handleDelete = (id: string) => {
    // TODO: implement delete logic
    console.log(`Delete ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Marka', width: 120 },
    { field: 'model', headerName: 'Model', width: 120 },
    { field: 'year', headerName: 'Rok', width: 90 },
    { field: 'plate_number', headerName: 'Rejestracja', width: 130 },
    { field: 'price_per_day', headerName: 'Cena/dzień (PLN)', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'segment', headerName: 'Segment', width: 100 },
    { field: 'przeglad_wazny_koniec', headerName: 'Przegląd do', width: 130 },
    { field: 'ubezpieczenie_koniec', headerName: 'Ubezpieczenie do', width: 150 },
    {
      field: 'image',
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

export default CarsDataGrid;
