import { useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import "./index.css";

function App() {
  const [activeTheme, setActiveTheme] = useState("neutral");
  const themesList = ["neutral", "brand", "error", "success", "warning", "info"];
  const [enabled] = useDarkMode()

  const getTheme = (theme: string) => {
    if (enabled) {
      return `${theme}-dark`;
    }
    return theme;
  }


  return (
    <div data-theme={getTheme(activeTheme)} className="bg-theme-pure min-h-screen">
      <div className="mx-auto pt-20 max-w-screen-md px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-theme-base">Theme Plugin Demo</h1>

        <div className="mt-8 flex gap-4 flex-wrap">
          {themesList.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              data-theme={getTheme(theme)}
              className="rounded bg-theme-base hover:bg-theme-muted transition border border-theme-base px-5 py-2 font-medium text-theme-base shadow"
            >
              {theme}
            </button>
          ))}
        </div>

        <p className="mt-4 text-theme-muted">
          Current theme: <span className="font-medium text-theme-base">{activeTheme}</span>
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-theme-base p-6 shadow-md border border-theme-base">
            <p className="text-theme-base">
              <strong>Base</strong> text and background colors.
            </p>
          </div>
          <div className="rounded-lg bg-theme-inverted p-6 shadow-md transition hover:md:theme-aqua:-rotate-6 border border-theme-inverted">
            <p className="text-theme-inverted">
              <strong>Inverted</strong> text and background colors.
            </p>
          </div>
          <div className="rounded-lg bg-theme-muted p-6 shadow-md transition hover:md:theme-aqua:-rotate-6 border border-theme-muted">
            <p className="text-theme-muted">
              <strong>Muted</strong> text and background colors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
