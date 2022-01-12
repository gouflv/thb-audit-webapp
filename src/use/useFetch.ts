import { ref } from "vue";
import { defaultErrorHandler, POST } from "../ajax";
import { Toast } from "vant";

export const useFetch = (options: {
  url: string;
  params?: any;
  paginated?: boolean;
}) => {
  const index = ref(1);
  const size = ref(10);

  const data = ref([]);
  const total = ref([]);
  const loading = ref(false);

  async function fetch() {
    try {
      loading.value = true;
      Toast.loading({ duration: 0, forbidClick: false });

      if (options.paginated) {
        const { data: _data, total: _total } = await POST({
          url: options.url,
          params: {
            ...options.params,
            per_page: size.value,
            current_page: index.value,
          },
        });

        data.value = _data;
        total.value = _total;
        index.value += 1;
      } else {
        const _data = await POST({
          url: options.url,
          params: options.params,
        });
        data.value = _data;
      }
    } catch (e) {
      defaultErrorHandler(e);
    } finally {
      loading.value = false;
      Toast.clear();
    }
  }

  function reset() {
    index.value = 1;
  }

  return {
    data,
    total,
    loading,
    fetch,
    reset,
  };
};
