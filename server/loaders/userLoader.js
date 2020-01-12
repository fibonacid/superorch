import DataLoader from "dataloader";
import { find } from "../models/users";

const batchUsers = async ids => {
  console.log(ids);
  const users = await find({ _id: { $in: ids } });

  const userMap = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id] || new Error(`No result for ${id}`));
};

export default userLoader = () => new DataLoader(batchUsers);
