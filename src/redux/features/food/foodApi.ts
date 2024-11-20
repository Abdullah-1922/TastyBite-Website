import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFoods: builder.query({
            query: ({ searchTerm, menu, min, max, limit }) => ({
                url: `/food`,
                method: "GET",
                params: { searchTerm, menu, min, max, limit },
            }),
            providesTags: ["food"],
        }),
        getSingleFood: builder.query({
            query: (id) => ({
                url: `/food/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "SingleFood", id }],
        }),
        getFoodByMenu: builder.query({
            query: (menuId) => ({
                url: `/menu/all-food/${menuId}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "food", id }],
        }),
        createFood: builder.mutation({
            query: (body) => ({
                url: "/food",
                method: "POST",
                body,
            }),
            invalidatesTags: ["food"],
        }),
        updateFood: builder.mutation({
            query: ({ body, id }) => ({
                url: `/food/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "food",
                { type: "SingleFood", id },
            ],
        }),
        deleteFood: builder.mutation({
            query: (id: string) => ({
                url: `/food/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "food",
                { type: "SingleFood", id },
            ],
        }),
        createFoodReview: builder.mutation({
            query: (body) => ({
                url: "/food-feedback",
                method: "POST",
                body,
            }),
            invalidatesTags: ["FoodFeedback"],
        }),
        getFoodReviewByFood: builder.query({
            query: (foodId) => ({
                url: `/food-feedback/${foodId}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "FoodFeedback", id }],
        }),
    }),
});

export const {
    useGetAllFoodsQuery,
    useGetSingleFoodQuery,
    useGetFoodByMenuQuery,
    useCreateFoodMutation,
    useUpdateFoodMutation,
    useDeleteFoodMutation,
    useCreateFoodReviewMutation,
    useGetFoodReviewByFoodQuery,
} = foodApi;
