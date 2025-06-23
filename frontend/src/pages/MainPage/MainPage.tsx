import React, { useState, useMemo, useEffect } from 'react';
import './MainPage.css';
import CarCard, { type CarData } from '../../components/MainPage/CarCard';
import { TextField, MenuItem, Button } from '@mui/material';
import { getAllCars, getAvailableCars } from '../../shared/carApi';

const ITEMS_PER_PAGE = 6;

const MainPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [segmentFilter, setSegmentFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [cars, setCars] = useState<CarData[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const accessToken = localStorage.getItem('access_token');
    const isLoggedIn = !!accessToken;

    useEffect(() => {
        getAllCars()
            .then(data => {
                console.log('API response:', data);
                setCars(data);
            })
            .catch(() => setCars([]))
            .finally(() => setLoading(false));
    }, []);

    const getCars = (startDate: string, endDate: string, segmentFilter: string, p0: null, accessToken: string | null) => {
        getAvailableCars(startDate, endDate, segmentFilter, null, accessToken)
            .then(data => {
                console.log('API response:', data);
                setCars(data);
            })
            .catch(() => setCars([]))
            .finally(() => setLoading(false));
    };

    const filteredAndSortedCars = useMemo(() => {
        const filtered = cars
            .filter(car =>
                (`${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase()))
            )
            .filter(car => !statusFilter || car.status === statusFilter)
            .filter(car => !segmentFilter || car.segment === segmentFilter)
            .filter(car => !yearFilter || car.year === yearFilter)
            .sort((a, b) =>
                sortOrder === 'asc'
                    ? Number(a.price_per_day) - Number(b.price_per_day)
                    : Number(b.price_per_day) - Number(a.price_per_day)
            );

        return filtered;
    }, [cars, search, statusFilter, segmentFilter, yearFilter, sortOrder]);

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
                    className="filters-element"
                />

                <TextField
                    select
                    label="Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="filters-element"
                >
                    <MenuItem value="">Wszystkie statusy</MenuItem>
                    <MenuItem value="AVAILABLE">Dostępne</MenuItem>
                    <MenuItem value="UNAVAILABLE">Nieaktywne</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Segment"
                    value={segmentFilter}
                    onChange={(e) => setSegmentFilter(e.target.value)}
                    fullWidth
                    margin="normal"
                    className="filters-element"
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
                    className="filters-element"
                >
                    <MenuItem value="">Wszystkie roczniki</MenuItem>
                    {Array.from(new Set(cars.map(car => car.year))).map(year => (
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
                    className="filters-element"
                >
                    <MenuItem value="asc">Cena rosnąco</MenuItem>
                    <MenuItem value="desc">Cena malejąco</MenuItem>
                </TextField>

                <Button
                    variant="outlined"
                    onClick={resetFilters}
                    fullWidth sx={{ mt: 2 }}
                    className="filters-element"
                >
                    Resetuj
                </Button>

                <TextField
                    label="Data rozpoczęcia"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={startDate}
                    onChange={(e) => {
                        const val = e.target.value;
                        setStartDate(val);
                    }}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="Data zakończenia"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={endDate}
                    onChange={(e) => {
                        const val = e.target.value;
                        setEndDate(val);
                    }}
                    InputLabelProps={{ shrink: true }}
                />

                <Button
                    variant="contained"
                    onClick={() => getCars(startDate, endDate, segmentFilter, null, accessToken)}
                >
                    Szukaj
                </Button>
            </div>

            <div className='car-cards-container'>
                {paginatedCars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        isLoggedIn={isLoggedIn}
                        initialStartDate={startDate}
                        initialEndDate={endDate}
                    />
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
