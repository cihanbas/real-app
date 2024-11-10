// In App.js in a new project

import * as React from "react";
import AppNavigation from "./src/navigations/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}

export default App;
