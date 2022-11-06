import { createContext, useContext } from "react";
import { ButtonProps } from "../components/Button";

const UniversalUIConfigContext = createContext({
  borderClass: "border",
  components: {
    button: ""
  }
} as {
  borderClass?: string;
  components?: {
    button?: string | ((props: ButtonProps) => string);
  };
});

export const useConfig = () => {
  return useContext(UniversalUIConfigContext);
};

export const UniversalUIConfigProvider = UniversalUIConfigContext.Provider;

export default UniversalUIConfigContext;
