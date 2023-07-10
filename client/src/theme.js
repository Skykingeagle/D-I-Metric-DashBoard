export const tokensDark = {
    grey: {
      0: "#ffffff",
      10: "#f6f6f6",
      50: "#f0f0f0",
      100: "#424242",
      200: "#292929",
      300: "#191F45",
      400: "#141937",
      500: "#0D1025",
      600: "#070812",
      700: "#000000",
    },
    primary: {
      100: "#D3D4DE",
      200: "#A6A9BE",
      300: "#7A7F9D",
      400: "#373E6C",
      500: "#21295C",
      600: "#673AB7",
      700: "#5C2E9B",
      800: "#521F80",
      900: "#471466",
      1000: "#5c34a4",
    },
    secondary: {
      50: "#F0F0F0",
      100: "#FFF6E0",
      200: "#FFEDC2",
      300: "#FFE3A3",
      400: "#FFDA85",
      500: "#FFC107",
      600: "#CCA752",
      700: "#997D3D",
      800: "#665429",
      900: "#332A14",
    },
  };

  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.primary[600],
                alt: tokensDark.primary[500],
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[50],
                light: tokensDark.grey[100],
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensDark.secondary[600],
                light: tokensDark.secondary[700],
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.grey[0],
                alt: tokensDark.grey[50],
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };