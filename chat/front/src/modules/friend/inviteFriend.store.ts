import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { FriendRequest } from "@/api/friendRequest";
import { IInviteFriend } from "@/modules/friend/interfaces/IInviteFriend";

interface IInviteFriendStore {
  loading: boolean;
  inviteUsers: IInviteFriend[];
  inviteFriend: (email: string) => Promise<void>;
  acceptFriend: (id: string) => Promise<void>;
  rejectFriend: (id: string) => Promise<void>;
  getAllInvitations: () => Promise<void>;
}

export const useInviteFriendStore = create<IInviteFriendStore>()(
  devtools(
    immer((set) => ({
      loading: false,
      inviteUsers: [],
      inviteFriend: async (email: string) => {
        set({ loading: true });
        await new FriendRequest().invite(email);
        set({ loading: false });
      },
      acceptFriend: async (id: string) => {
        const accept = await new FriendRequest().accept(id);
        if (accept) {
          set((state) => {
            state.inviteUsers = state.inviteUsers.filter((el) => el.id !== id);
          });
        }
      },
      rejectFriend: async (id: string) => {
        const reject = await new FriendRequest().reject(id);
        if (reject) {
          set((state) => {
            state.inviteUsers = state.inviteUsers.filter((el) => el.id !== id);
          });
        }
      },
      getAllInvitations: async () => {
        set({ loading: true });
        const inviteUsers = await new FriendRequest().getAllInvite();
        set({ loading: false, inviteUsers: inviteUsers || [] });
      },
    })),
  ),
);
