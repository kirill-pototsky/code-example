import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { RootState } from '@/store';

import api from '@/api/index.api';
import { AccessesState } from '@/common/models/states.model';
import { EventItem } from '@/common/models/event.model';
import { RequestParams } from '@/common/models/requestParams.model';
import { Pagination } from '@/common/models/meta.model';

export const state = (): AccessesState => ({
  accesses: [],
  pagination: null,
  accessesCount: null
});

export const getters: GetterTree<AccessesState, RootState> = {
  ACCESSES_ALL: (state: AccessesState) => {
    return state.accesses;
  },
  TOTAL_ACCESSES_COUNT: (state: AccessesState): number => {
    return state.pagination?.total;
  }
};

export const actions: ActionTree<AccessesState, RootState> = {
  GET_ACCESSES: async (context, params?: RequestParams): Promise<void> => {
    const response = await api.event.getAccesses(params);

    context.commit('SET_ACCESSES', response.data.data);
    context.commit('SET_PAGINATION', response.data.pagination);
  },
  GET_ACCESSES_COUNT: async (context): Promise<void> => {
    const response = await api.event.getAccessesCount();

    context.commit('SET_ACCESSES_COUNT', response.data.data.count);
  }
};

export const mutations: MutationTree<AccessesState> = {
  SET_ACCESSES: (state, events: EventItem[]): void => {
    state.accesses = events;
  },
  SET_ACCESSES_COUNT: (state, count: number): void => {
    state.accessesCount = count;
  },
  SET_PAGINATION: (state, pagination: Pagination): void => {
    state.pagination = pagination;
  }
};
