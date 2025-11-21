import { create } from "zustand";
import { loadingPlanService } from "../services/loadingPlanService";

interface LoadingPlan {
  id: string;
  name: string;
  value?: string;
}

interface LoadingPlanState {
  loadingPlans: LoadingPlan[];
  loading: boolean;
  error: string | null;
  fetchLoadingPlans: () => Promise<void>;
}

export const useLoadingPlanStore = create<LoadingPlanState>((set) => ({
  loadingPlans: [],
  loading: false,
  error: null,

  fetchLoadingPlans: async () => {
    try {
      set({ loading: true, error: null });
      const plans = await loadingPlanService.getAllLoadingPlans();

      set({
        loadingPlans: plans,
        loading: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({
        error: err.message || "Failed fetching loading plans",
        loading: false,
      });
    }
  },
}));
