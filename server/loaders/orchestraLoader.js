import DataLoader from "dataloader";
import { find } from "../models/orchestras";

const batchOrchestras = async ids => {
  const orchestras = await find({ _id: { $in: ids } });

  const orchestraMap = {};
  orchestras.forEach(o => {
    orchestraMap[o.id] = o;
  });

  return ids.map(id => orchestraMap[id] || new Error(`No result for ${id}`));
};

export default orchestraLoader = () => new DataLoader(batchOrchestras);
