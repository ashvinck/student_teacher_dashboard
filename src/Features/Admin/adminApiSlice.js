import { apiSlice } from '../../App/api/apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `dashboard/admin/users`,
      providesTags: ['users'],
      invalidatesTags: ['users'],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `dashboard/admin/users`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),

    deleteUser: builder.mutation({
      query: (email) => ({
        url: `dashboard/admin/users`,
        method: 'DELETE',
        body: email,
      }),
      invalidatesTags: ['users'],
    }),

    getClassData: builder.query({
      query: (classId) => `dashboard/admin/${classId}`,
      providesTags: ['timetable', 'staffdata'],
      invalidatesTags: ['timetable', 'staffdata'],
    }),

    updateTimetable: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/admin/${classId}/timetable`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['timetable'],
    }),

    addStaffData: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/admin/${classId}/staff/add-new`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['staffdata'],
    }),

    updateStaffData: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/admin/${classId}/staffdata/${id}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['staffdata'],
    }),

    deleteStaffData: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/admin/${classId}/staffdata/${id}/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['staffdata'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useGetClassDataQuery,

  useUpdateTimetableMutation,

  useAddStaffDataMutation,
  useUpdateStaffDataMutation,
  useDeleteStaffDataMutation,
} = adminApiSlice;
