import { useEffect, useState } from "react";
import { trackingStore } from "../shared/store/tracking-store";

export function useTracking() {
  const [data] = useState(trackingStore.data);
  useEffect(() => {}, [data]);
  return { data };
}
