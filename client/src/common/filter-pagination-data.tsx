/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "../http";

type PaginationData = {
  create_new_arr?: boolean;
  state: {
    results: any[];
    page: number;
    totalDocs: number;
  } | null;
  data: any[];
  page: number;
  countRoute: string;
};

export const filterPaginationData = async ({
  create_new_arr = false,
  state,
  data,
  page,
  countRoute,
}: PaginationData) => {
  let obj: {
    results: any[];
    page: number;
    totalDocs: number;
  } = {
    results: [],
    page: 0,
    totalDocs: 0,
  };

  if (state !== null && !create_new_arr) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    try {
      const {
        data: { totalDocs },
      } = await http.get(countRoute);
      obj = {
        results: data,
        page: 1,
        totalDocs,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return obj;
};
