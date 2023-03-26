import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
}

async function deleteEvent(eventId: string) {
  const response = await axios.delete(`http://localhost:3001/events/${eventId}`);

  if (response.status !== 204) {
    throw new Error('An error occurred while deleting the event');
  }

  return eventId;
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteEvent, {
    onSuccess: (eventId: string) => {
      queryClient.setQueryData<Event[]>(['events'], (oldEvents = []) => oldEvents.filter(event => event.id !== eventId));
    },
  });

  return mutation;
}