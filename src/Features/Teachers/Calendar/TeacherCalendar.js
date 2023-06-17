import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box } from '@mui/material';
import { CardWrapper } from '../../../Components/CardWrapper';
import { useParams } from 'react-router-dom';
import {
  useAddEventMutation,
  useDeleteEventMutation,
} from '../teachersApiSlice';
import Loading from '../../../Components/Loading';

export const TeacherCalendar = (events) => {
  // Hook for setting events
  const [event, setEvent] = useState([]);

  const { classId } = useParams();
  const [addEvent, { isLoading }] = useAddEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  // Trigger for setting events
  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const eventInfo = {
        id: `${selected.startStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      addEvent({ classId: classId, ...eventInfo })
        .unwrap()
        .then(() => calendarApi.addEvent(eventInfo))
        .catch((error) => console.log(error));
    }
  };

  // Trigger to delete selected event
  const handleEventClick = (selected) => {
    const title = selected.event.title;
    const data = {
      title: title,
    };
    console.log('title', title);
    if (
      window.confirm(`Are you sure you want to delete the event '${title}'`)
    ) {
      selected.event.remove();
      deleteEvent({ classId: classId, ...data })
        .unwrap()
        .then((res) => console.log(res))
        // .then(() => selected.event.remove())
        .catch((error) => console.log(error));
    }
  };

  return (
    <CardWrapper title='Calendar'>
      {isLoading ? (
        <Loading open={isLoading} />
      ) : (
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
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(event) => setEvent(event)}
            />
          </Box>
        </Box>
      )}
    </CardWrapper>
  );
};
