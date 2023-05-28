// color design tokens export
export const goldPalette = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#f5efe2",
    100: "#e8d7b6",
    200: "#dabd88",
    300: "#cca35e",
    400: "#c39344",
    500: "#bd822b",
    600: "#b97927",
    700: "#b36d22",
    800: "#ac601b",
    900: "#594726",
  },
};

export const purplePalette = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#ebecfc",
    100: "#cccef7",
    200: "#aaaef1",
    300: "#888deb",
    400: "#6e71e6",
    500: "#5656df",
    600: "#504dd4",
    700: "#4742c7",
    800: "#4036bb",
    900: "#4e44e742",
  },
};

export const pastelRedPalette = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#ffeef1",
    100: "#ffd4d9",
    200: "#f8a6a5",
    300: "#f28482",
    400: "#ff6961",
    500: "#ff5b47",
    600: "#ff5b47",
    700: "#f75448",
    800: "#d7443a",
    900: "#692824",
  },
};

export const skyBluePalette = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#e0f5ff",
    100: "#afe6ff",
    200: "#77d5ff",
    300: "#7fd4f5",
    400: "#4bc3f2",
    500: "#00abff",
    600: "#009def",
    700: "#009def",
    800: "#0078c7",
    900: "#054863",
  },
};

// mui theme settings
const goldTheme = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: goldPalette.primary[900],
            main: goldPalette.primary[400],
            light: goldPalette.primary[900],
          },
          neutral: {
            dark: goldPalette.grey[100],
            main: goldPalette.grey[200],
            mediumMain: goldPalette.grey[300],
            medium: goldPalette.grey[400],
            light: goldPalette.grey[700],
          },
          background: {
            default: goldPalette.grey[900],
            alt: goldPalette.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: goldPalette.primary[700],
            main: goldPalette.primary[300],
            light: goldPalette.primary[50],
          },
          neutral: {
            dark: goldPalette.grey[700],
            main: goldPalette.grey[500],
            mediumMain: goldPalette.grey[400],
            medium: goldPalette.grey[300],
            light: goldPalette.grey[50],
          },
          background: {
            default: goldPalette.grey[10],
            alt: goldPalette.grey[0],
          },
        }),
      },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

const skyBlueTheme = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: skyBluePalette.primary[900],
            main: skyBluePalette.primary[400],
            light: skyBluePalette.primary[900],
          },
          neutral: {
            dark: skyBluePalette.grey[100],
            main: skyBluePalette.grey[200],
            mediumMain: skyBluePalette.grey[300],
            medium: skyBluePalette.grey[400],
            light: skyBluePalette.grey[700],
          },
          background: {
            default: skyBluePalette.grey[900],
            alt: skyBluePalette.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: skyBluePalette.primary[700],
            main: skyBluePalette.primary[300],
            light: skyBluePalette.primary[50],
          },
          neutral: {
            dark: skyBluePalette.grey[700],
            main: skyBluePalette.grey[500],
            mediumMain: skyBluePalette.grey[400],
            medium: skyBluePalette.grey[300],
            light: skyBluePalette.grey[50],
          },
          background: {
            default: skyBluePalette.grey[10],
            alt: skyBluePalette.grey[0],
          },
        }),
      },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

const pastelRedTheme = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: pastelRedPalette.primary[900],
            main: pastelRedPalette.primary[300],
            light: pastelRedPalette.primary[900],
          },
          neutral: {
            dark: pastelRedPalette.grey[100],
            main: pastelRedPalette.grey[200],
            mediumMain: pastelRedPalette.grey[300],
            medium: pastelRedPalette.grey[400],
            light: pastelRedPalette.grey[700],
          },
          background: {
            default: pastelRedPalette.grey[900],
            alt: pastelRedPalette.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: pastelRedPalette.primary[700],
            main: pastelRedPalette.primary[300],
            light: pastelRedPalette.primary[50],
          },
          neutral: {
            dark: pastelRedPalette.grey[700],
            main: pastelRedPalette.grey[500],
            mediumMain: pastelRedPalette.grey[400],
            medium: pastelRedPalette.grey[300],
            light: pastelRedPalette.grey[50],
          },
          background: {
            default: pastelRedPalette.grey[10],
            alt: pastelRedPalette.grey[0],
          },
        }),
      },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

const purpleTheme = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
      ? {
        // palette values for dark mode
        primary: {
            dark: purplePalette.primary[900],
            main: purplePalette.primary[400],
            light: purplePalette.primary[900],
          },
          neutral: {
            dark: purplePalette.grey[100],
            main: purplePalette.grey[200],
            mediumMain: purplePalette.grey[300],
            medium: purplePalette.grey[400],
            light: purplePalette.grey[700],
          },
          background: {
            default: purplePalette.grey[900],
            alt: purplePalette.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: purplePalette.primary[700],
            main: purplePalette.primary[300],
            light: purplePalette.primary[50],
          },
          neutral: {
            dark: purplePalette.grey[700],
            main: purplePalette.grey[500],
            mediumMain: purplePalette.grey[400],
            medium: purplePalette.grey[300],
            light: purplePalette.grey[50],
          },
          background: {
            default: purplePalette.grey[10],
            alt: purplePalette.grey[0],
          },
        }),
      },
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};


export const themeSettings = {
  gold: goldTheme,
  purple: purpleTheme,
  pastelRed: pastelRedTheme,
  skyBlue: skyBlueTheme
}