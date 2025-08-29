import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/providers/ThemeProvider"
import { Toaster } from "./components/ui/sonner"
import MainLayout from "./layouts"
import NotFound from "./pages/NotFoundPage"
import HomePage from "./pages/HomePage"
import MoodPage from "./pages/MoodPage"

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mood" element={<MoodPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App