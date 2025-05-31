import React, { useState, useMemo } from 'react';
import './MainPage.css';
import CarCard, { type CarData } from '../../components/MainPage/CarCard';
import {
  TextField,
  MenuItem,
  Button
} from '@mui/material';


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

const ITEMS_PER_PAGE = 6;

const MainPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedCars = useMemo(() => {
    const filtered = carList
      .filter(car =>
        (`${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase()))
      )
      .filter(car => !statusFilter || car.status === statusFilter)
      .filter(car => !segmentFilter || car.segment === segmentFilter)
      .filter(car => !yearFilter || car.year.toString() === yearFilter)
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.price_per_day - b.price_per_day
          : b.price_per_day - a.price_per_day
      );

    return filtered;
  }, [search, statusFilter, segmentFilter, yearFilter, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredAndSortedCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('');
    setSegmentFilter('');
    setYearFilter('');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return (
    <div className='main-page'>
      <h1>Dostępne samochody</h1>

      <div className="filters">
        <TextField
          label="Szukaj marki lub modelu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          margin="normal"
          className = "filters-element"
        />

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          fullWidth
          margin="normal"
          className = "filters-element"
        >
          <MenuItem value="">Wszystkie statusy</MenuItem>
          <MenuItem value="AVAILABLE">Dostępne</MenuItem>
          <MenuItem value="RENTED">Wypożyczone</MenuItem>
          <MenuItem value="INACTIVE">Nieaktywne</MenuItem>
        </TextField>

        <TextField
          select
          label="Segment"
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          fullWidth
          margin="normal"
          className = "filters-element"
        >
          <MenuItem value="">Wszystkie segmenty</MenuItem>
          {['A', 'B', 'C', 'D'].map((seg) => (
            <MenuItem key={seg} value={seg}>{seg}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Rok produkcji"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          fullWidth
          margin="normal"
          className = "filters-element"
        >
          <MenuItem value="">Wszystkie roczniki</MenuItem>
          {Array.from(new Set(carList.map(car => car.year))).map(year => (
            <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sortowanie (Cena)"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          fullWidth
          margin="normal"
          className = "filters-element"
        >
          <MenuItem value="asc">Cena rosnąco</MenuItem>
          <MenuItem value="desc">Cena malejąco</MenuItem>
        </TextField>

        <Button
         variant="outlined"
         onClick={resetFilters}
         fullWidth sx={{ mt: 2 }}
         className = "filters-element"
         >
          Resetuj
        </Button>
      </div>

      <div className='car-cards-container'>
        {paginatedCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>

      <div className="pagination">
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          ← Poprzednia
        </Button>

        <span style={{ margin: '0 16px' }}>
          Strona {currentPage} z {totalPages}
        </span>

        <Button
          variant="contained"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Następna →
        </Button>
      </div>
    </div>
  );
};

export default MainPage;