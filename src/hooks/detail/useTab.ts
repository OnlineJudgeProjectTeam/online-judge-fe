import { ref } from "vue";

const useTab = () => {
  const activeTab = ref(0);

  const setActiveTab = (tab: number) => {
    activeTab.value = tab;
  };

  return { activeTab, setActiveTab };
};

export default useTab;
