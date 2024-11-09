import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EventCard from '../EventCard/EventCard';
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import sprite from '../../img/sprite.svg';
import c from './EventList.module.css';

const events = [
  {
    id: 1,
    title: 'кавер вечыр стрыкало пати хард',
    description: 'Description for Event 1',
    date: '2024-08-01',
    time: '18:00',
    price: 300,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for Event 2',
    date: '2024-08-02',
    time: '19:00',
    price: 350,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 3,
    title: 'Event 3',
    description: 'Description for Event 3',
    date: '2024-08-03',
    time: '20:00',
    price: 400,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 4,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-08-22',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 5,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-08-22',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 6,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-08-22',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 7,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-10-30',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 8,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-10-30',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 9,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-10-30',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 10,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-10-30',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
];

const EventList = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchText, setSearchText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterLabel, setFilterLabel] = useState('Усі події'); // Показать на украинском

  const applyFilter = (filterType) => {
    const today = new Date();
    let filtered = events;

    switch (filterType) {
      case 'week':
        const startOfWeekDate = startOfWeek(today);
        const endOfWeekDate = endOfWeek(today);
        filtered = events.filter(
          (event) =>
            new Date(event.date) >= startOfWeekDate &&
            new Date(event.date) <= endOfWeekDate,
        );
        setFilterLabel('На цьому тижні');
        break;
      case 'month':
        const startOfMonthDate = startOfMonth(today);
        const endOfMonthDate = endOfMonth(today);
        filtered = events.filter(
          (event) =>
            new Date(event.date) >= startOfMonthDate &&
            new Date(event.date) <= endOfMonthDate,
        );
        setFilterLabel('У цьому місяці');
        break;
      case 'tomorrow':
        const tomorrowDate = addDays(today, 1);
        filtered = events.filter(
          (event) =>
            new Date(event.date).toDateString() === tomorrowDate.toDateString(),
        );
        setFilterLabel('Завтра');
        break;
      case 'today':
        filtered = events.filter(
          (event) =>
            new Date(event.date).toDateString() === today.toDateString(),
        );
        setFilterLabel('Сьогодні');
        break;
      default:
        filtered = events;
        setFilterLabel('Усі події');
    }
    setFilteredEvents(filtered);
    setDrawerOpen(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    const filtered = events.filter((e) =>
      e.title.toLowerCase().includes(query),
    );
    setFilteredEvents(filtered);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: 2,
        // overflowX: 'hidden',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            width: '100%',
          }}
        >
          <IconButton
            sx={{ p: '10px', borderRadius: '0', opacity: '60%' }}
            aria-label="search"
          >
            <svg width="24" height="24">
              <use href={`${sprite}#icon-search`} />
            </svg>
          </IconButton>
          <TextField
            placeholder="Пошук за назвою"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
            sx={{ '& fieldset': { border: 'none' }, width: '100%' }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            boxShadow: 'none',
          }}
          className={c.buttonFilter}
        >
          {filterLabel}
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {filteredEvents.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={6} lg={6}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: '40px',
            borderTopRightRadius: '40px',
            overflow: 'hidden',
            height: isMobile ? '300px' : 'auto',
          },
        }}
      >
        <Box role="presentation" sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Усі події', value: 'all' },
              { label: 'На цьому тижні', value: 'week' },
              { label: 'У цьому місяці', value: 'month' },
              { label: 'Завтра', value: 'tomorrow' },
              { label: 'Сьогодні', value: 'today' },
            ].map((filter) => (
              <Button
                key={filter.value}
                onClick={() => applyFilter(filter.value)}
                sx={{
                  color: filterLabel === filter.label ? '#FFF' : '#000',
                  backgroundColor:
                    filterLabel === filter.label ? '#000' : '#F9F9F9',
                  border: '1px solid #EAEAEA',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor:
                      filterLabel === filter.label ? '#000' : '#F0F0F0',
                  },
                }}
              >
                {filter.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default EventList;
