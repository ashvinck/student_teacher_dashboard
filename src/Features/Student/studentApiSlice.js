import { apiSlice } from '../../App/api/apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: (classId) => `dashboard/student/${classId}`,
    }),
  }),
});

export const { useGetStudentDataQuery } = studentApiSlice;
