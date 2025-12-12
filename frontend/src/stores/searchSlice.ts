import { createSlice, current } from "@reduxjs/toolkit";
import type { Routes } from "../interfaces/Routes";
import type { Schedules } from "../interfaces/Schedules";
import _ from "lodash";

interface Input {
  departure: string;
  arrival: string;
  departureDate: string;
}

type Init = {
  status: "idle" | "pending" | "success" | "error";
  input: Input;
  routesId: string | undefined;
  schedulesFilter: Schedules[];
};

const initialState: Init = {
  status: "idle",
  input: {
    departure: "",
    arrival: "",
    departureDate: "",
  },
  routesId: undefined,
  schedulesFilter: [],
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    searchRoutes: (state, action) => {
      state.input = action.payload;
      console.log("input : ", state.input);
    },
    setRoutesId: (state, action) => {
      const input = current(state.input);

      const routesData: Routes[] = action.payload.routesData;

      const find = routesData.find(
        (element) =>
          element.departure_station_name.trim().toLowerCase() ==
            input.departure.trim().toLowerCase() &&
          element.arrival_station_name.trim().toLowerCase() ==
            input.arrival.trim().toLowerCase()
      );
      console.log("find : ", find);

      if (find) {
        state.routesId = find.id;
      } else {
        state.routesId = undefined;
      }
    },
    filterScheduleData: (state, action) => {
      state.schedulesFilter = [];
      const routesId = state.routesId;
      const scheduleData: Schedules[] = action.payload.scheduleData;
      state.schedulesFilter = scheduleData.filter(
        (element) => element.route_id === routesId
      );
      console.log("filter : ", state.schedulesFilter);

      console.log(state.schedulesFilter.length);
    },
  },
});

export const { searchRoutes, setRoutesId, filterScheduleData } =
  searchSlice.actions;
export default searchSlice.reducer;
