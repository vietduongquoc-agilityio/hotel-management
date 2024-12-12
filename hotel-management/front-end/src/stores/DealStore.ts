import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Import deal services
import { getDeals, createDealApi, updateDeal, deleteDeal } from "@/services";

// Import interfaces
import { NewDealData, DealData } from "@/interfaces";

// Deal Store State and Actions Interface
interface DealState {
  deals: DealData[];
  totalDeals: number;
  isLoading: boolean;
  error: string | null;
  fetchDeals: (page: number, pageSize: number) => Promise<void>;
  createDeal: (dealData: NewDealData) => Promise<void>;
  editDeal: (dealId: string, dealData: NewDealData) => Promise<void>;
  deleteDeal: (dealId: string) => Promise<void>;
}

// Create Deal Store
export const useDealStore = create<DealState>()(
  devtools((set) => ({
    deals: [],
    totalDeals: 0,
    isLoading: false,
    error: null,

    // Fetch deals from API
    fetchDeals: async (page, pageSize) => {
      set({ isLoading: true });
      try {
        const data = await getDeals(page, pageSize);
        if (data?.data) {
          set({
            deals: data.data,
            totalDeals: data.meta.pagination.total,
            isLoading: false,
          });
        } else {
          set({ error: data.message, isLoading: false });
        }
      } catch (error) {
        set({ error: "Failed to fetch deals.", isLoading: false });
      }
    },

    // Create a new deal
    createDeal: async (dealData) => {
      set({ isLoading: true, error: null });
      try {
        const response = await createDealApi(dealData);
        if (response?.data) {
          set((state) => ({
            deals: [response.data, ...state.deals],
            totalDeals: state.totalDeals + 1,
            isLoading: false,
          }));
        } else {
          set({ error: response.message, isLoading: false });
        }
      } catch (error) {
        set({ error: "Failed to create deal.", isLoading: false });
      }
    },

    editDeal: async (dealId: string, dealData: NewDealData) => {
      try {
        await updateDeal(dealId, dealData);
        set((state) => ({
          deals: state.deals.map((deal) =>
            deal.documentId === dealId ? { ...deal, ...dealData } : deal
          ),
        }));
      } catch (error) {
        console.error("Error editing deal:", error);
      }
    },

    // Delete a deal
    deleteDeal: async (dealId: string) => {
      try {
        await deleteDeal(dealId);
        set((state) => ({
          deals: state.deals.filter((deal) => deal.documentId !== dealId),
        }));
      } catch (error) {
        console.error("Error deleting deal:", error);
      }
    },
  }))
);
