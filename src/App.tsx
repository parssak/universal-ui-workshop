import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { UniversalUIConfigProvider } from "./config/UniversalUIConfigContext";
import { useDarkMode } from "./hooks/useDarkMode";
import "./index.css";

const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState("neutral");
  const [enabled] = useDarkMode();

  const theme = useMemo(() => {
    if (enabled) {
      return `${activeTheme}-dark`;
    }
    return activeTheme;
  }, [enabled, activeTheme]);

  return [theme, setActiveTheme] as const;
};

const themesList = ["neutral", "brand", "error", "success", "warning", "info"] as const;
const sizesList = ["xs", "sm", "md", "lg", "xl"] as const;
const variantsList = ["solid", "outline", "ghost", "inverted"] as const;

function App() {
  const [theme, setActiveTheme] = useTheme();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <UniversalUIConfigProvider
      value={{
        borderClass: "border",
        components: {
          button: "focus:outline-none focus:ring-2 focus:ring-theme-active active:scale-95"
        }
      }}
    >
      <div data-theme={theme} className="min-h-screen pb-8 bg-theme-pure">
        <div className="mx-auto pt-20 max-w-screen-md px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-theme-base">
            Theme Plugin Demo
          </h1>

          <div className="mt-8 flex gap-2 flex-wrap">
            {themesList.map((theme) => (
              <Button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                theme={theme}
                size="lg"
                className="capitalize"
              >
                {theme}
              </Button>
            ))}
          </div>

          <p className="mt-4 text-theme-active py-1 px-2 rounded border border-theme-active bg-theme-base">
            Current theme: <span className="font-medium text-theme-base">{theme}</span>
          </p>

          {variantsList.map((variant) => (
            <>
              <h3 className="font-medium text-lg text-theme-active capitalize mt-6">{variant}</h3>
              <div className="flex flex-col items-start mt-2 gap-2 flex-wrap">
                {sizesList.map((size) => (
                  <div key={size} data-size={size} className="flex gap-2">
                    <Button className="relative" variant={variant}>
                      <span className="leading-none absolute top-[0.125em] right-[0.125em] text-theme-active opacity-25 font-bold font-mono text-[0.75em]">
                        {size}
                      </span>
                      Button
                    </Button>
                    <Input type="text" placeholder="Input" variant={variant} />
                  </div>
                ))}
              </div>
            </>
          ))}

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-theme-base p-6 shadow-md border border-theme-base">
              <p className="text-theme-base">
                <strong>Base</strong> text and background colors.
              </p>
            </div>
            <div className="rounded-lg bg-theme-inverted p-6 shadow-md transition hover:md:theme-aqua:-rotate-6 border-2 border-transparent">
              <p className="text-theme-inverted">
                <strong>Inverted</strong> text and background colors.
              </p>
            </div>
            <div className="rounded-lg md:col-span-2 bg-theme-active p-6 shadow-md transition hover:md:theme-aqua:-rotate-6 border border-theme-active">
              <p className="text-theme-active">
                <strong>Active</strong> text and background colors.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-theme-base mt-8 border-theme-base border-y">
          <div className="max-w-screen-md mx-auto px-8 py-6">
            <span className="font-mono text-sm text-theme-base/30 font-bold tracking-wide">
              DEMO
            </span>
            <h1 className="text-3xl tracking-tight font-bold text-theme-base">Hello World</h1>
            <p className="text-theme-muted max-w-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quas illum soluta
              maiores natus vitae quis?
            </p>
            <div className="mt-6 rounded-lg border border-theme-active bg-theme-active p-4  grid md:grid-cols-2 gap-6">
              <div className="flex flex-col order-2 md:order-1">
                <h2 className="text-xl font-semibold text-theme-base">Absolutely Magnificent.</h2>
                <p className="text-theme-muted max-w-xs mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <br />
                  Provident perferendis, eveniet repudiandae.
                </p>
                <div className="mt-auto pt-4">
                  <Button
                    variant="inverted"
                    className="bg-theme-inverted hover:bg-theme-base transition rounded text-theme-inverted text-size py-size-y px-size-x font-medium tracking-tight hover:text-theme-active w-full sm:w-max"
                  >
                    I want it
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="https://i.picsum.photos/id/390/600/400.jpg?hmac=yJa5v0pHId9U60DyGIK2nOvzH5dM6KSiFdXFuMwY7RA"
                  alt=""
                  className="w-full h-full rounded-lg object-cover border border-theme-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UniversalUIConfigProvider>
  );
}

export default App;
