import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box } from '@mui/material';

import { CardWrapper } from '../../Components/CardWrapper';

export const Calendar = (events) => {
  return (
    <CardWrapper title='Calendar'>
      <Box sx={{ height: '550px' }}>
        <Box sx={{ p: 1, height: '100%' }}>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            height='100%'
            headerToolbar={{
              left: 'today',
              center: 'title',
              right: 'prev,next',
            }}
            footerToolbar={{
              left: '',
              center: '',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            }}
            initialView='dayGridMonth'
            initialEvents={events}
            selectMirror={true}
            dayMaxEvents={true}
          />
        </Box>
      </Box>
    </CardWrapper>
  );
};
