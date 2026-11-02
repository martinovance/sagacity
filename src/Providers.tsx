import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "./context/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const reactQueryConfig = {
  refetchOnWindowFocus: false,
  retry: true,
};

const mutationQueryConfig = {
  refetchOnWindowFocus: false,
  retry: false,
};

const defaultOptions = {
  queries: reactQueryConfig,
  mutations: mutationQueryConfig,
};

const queryClient = new QueryClient({
  defaultOptions,
  queryCache: new QueryCache({
    onError: (_err, query) => {
      if (query?.meta?.errorMessage) {
        // handle error appropriately, e.g. show a toast notification
      }
    },
  }),
});

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
