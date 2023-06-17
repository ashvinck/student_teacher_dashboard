import { apiSlice } from '../../App/api/apiSlice';

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherData: builder.query({
      query: (classId) => `dashboard/teacher/${classId}`,
      providesTags: [
        'teacherData',
        'studentInfo',
        'assignments',
        'events',
        'exams',
        'results',
        'attendance',
        'miscellaneous',
      ],
      invalidatesTags: ['teacherData'],
    }),

    addStudent: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/teacher/${classId}/student/add-new`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['studentInfo'],
    }),

    updateStudent: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/student/${id}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['studentInfo'],
    }),

    deleteStudent: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/student/${id}/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['studentInfo'],
    }),

    addAssignment: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/teacher/${classId}/assignment/add-new`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['assignments'],
    }),

    updateAssignment: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/assignment/${id}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['assignments'],
    }),

    deleteAssignment: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/assignment/${id}/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['assignments'],
    }),

    addEvent: builder.mutation({
      query: ({ classId, ...data }) => ({
        url: `dashboard/teacher/${classId}/event/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['events'],
    }),

    deleteEvent: builder.mutation({
      query: ({ classId, ...data }) => ({
        url: `dashboard/teacher/${classId}/event/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['events'],
    }),

    addExams: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/teacher/${classId}/upload/exam`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['exams'],
    }),

    updateExamination: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/examination/${id}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['exams'],
    }),

    deleteExamination: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/examination/${id}/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['exams'],
    }),

    addResults: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/teacher/${classId}/upload/results`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['results'],
    }),

    updateResults: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/results/${id}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['results'],
    }),

    deleteResult: builder.mutation({
      query: ({ classId, id, data }) => ({
        url: `dashboard/teacher/${classId}/results/${id}/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['results'],
    }),

    addAttendance: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/teacher/${classId}/upload/attendance`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['attendance'],
    }),

    addMiscellanousInfo: builder.mutation({
      query: ({ classId, data }) => ({
        url: `dashboard/teacher/${classId}/upload/miscellaneous`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['miscellaneous'],
    }),
  }),
});

export const {
  useGetTeacherDataQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,

  useAddEventMutation,
  useDeleteEventMutation,

  useAddExamsMutation,
  useUpdateExaminationMutation,
  useDeleteExaminationMutation,

  useAddResultsMutation,
  useUpdateResultsMutation,
  useDeleteResultMutation,

  useAddAttendanceMutation,

  useAddMiscellanousInfoMutation,
} = teacherApiSlice;
