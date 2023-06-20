import { apiSlice } from '../../App/api/apiSlice';
import { setCredentials } from './AuthSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

    // verifyAccount: builder.query({
    //   query: ({ email, token }) => `auth/verifyaccount/${email}/${token}`,
    // }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken: accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgotpassword',
        method: 'POST',
        body: email,
      }),
    }),

    updatePassword: builder.mutation({
      query: ({ _id, token, ...credentials }) => ({
        url: `/auth/resetpassword/${_id}/${token}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
} = authApiSlice;
