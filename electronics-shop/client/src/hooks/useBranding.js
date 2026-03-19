import { useSite } from "../context/SiteContext";

export const useBranding = () => {
  const site = useSite();
  return site.data?.settings || {};
};
