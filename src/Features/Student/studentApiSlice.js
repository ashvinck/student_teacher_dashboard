import { apiSlice } from '../../App/api/apiSlice';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: () => `student/dashboard`,
    }),
  }),
});

export const { useGetStudentDataQuery } = studentApiSlice;
