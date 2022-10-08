import { useState } from "react";
import "./index.css";

function App() {
  const [activeTheme, setActiveTheme] = useState("default");
  const themesList = ["default", "dark"];

  return (
    <div data-theme={activeTheme} className="bg-theme-base min-h-screen">
      <div className="mx-auto pt-20 max-w-4xl px-8">
        <h1 className="text-2xl font-medium text-theme-base">Theme plugin demo</h1>

        <div className="mt-8 flex gap-4">
          {themesList.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              data-theme={theme}
              className="rounded bg-theme-base border border-theme-base px-5 py-2 font-medium text-theme-base shadow hover:bg-theme-base/75"
            >
              {theme}
            </button>
          ))}
        </div>

        <p className="mt-4 text-theme-muted">
          Current theme: <span className="font-medium text-theme-base">{activeTheme}</span>
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-theme-base p-8 shadow-xl border border-theme-base">
            <p className="text-theme-base">
              <strong>Base</strong> text and background colors.
            </p>
            <p className="text-theme-muted">
              <strong>Muted</strong> text color.
            </p>
          </div>
          <div className="rounded-xl bg-theme-inverted p-8 shadow-xl transition hover:md:theme-aqua:-rotate-6 border border-theme-inverted">
            <p className="text-theme-inverted">
              <strong>Inverted</strong> text and background colors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
