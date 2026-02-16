export const colors = {
  // Primary
  "primary-100": "#F1EDFD",
  "primary-200": "#E2DAFB",
  "primary-300": "#B9AAE7",
  "primary-400": "#A991F3",
  "primary-500": "#8D6CEF",
  "primary-600": "#7047EB",

  // Secondary
  "secondary-100": "#E7EEFF",
  "secondary-200": "#D0DDFF",
  "secondary-300": "#A1BBFF",
  "secondary-400": "#7199FF",
  "secondary-500": "#4277FF",
  "secondary-600": "#1355FF",

  // Warning
  "warning-100": "#FFFCF1",
  "warning-200": "#FFF9E2",
  "warning-300": "#FFF2C5",
  "warning-400": "#FFECA8",
  "warning-500": "#FFE58B",
  "warning-600": "#FFDF6E",

  // Error
  "error-100": "#FEEAEF",
  "error-200": "#FDD4DF",
  "error-300": "#FBA9BF",
  "error-400": "#FA7E9F",
  "error-500": "#F8537F",
  "error-600": "#F6285F",

  // Success
  "success-100": "#F0F9F8",
  "success-200": "#D0EDE8",
  "success-300": "#A0DBD1",
  "success-400": "#71C9BA",
  "success-500": "#41B7A3",
  "success-600": "#12A58C",

  // Greyscale
  "grey-50": "#F9FAFB",
  "grey-100": "#F3F4F6",
  "grey-200": "#E5E7EB",
  "grey-300": "#D1D5DB",
  "grey-400": "#9CA3AF",
  "grey-500": "#6B7280",
  "grey-600": "#4B5563",
  "grey-700": "#374151",
  "grey-800": "#1F2937",
  "grey-900": "#111827",

  // Additional
  white: "#FFFFFF",
  grape: "#7214FF",
  "blue-light": "#00B3FF",
};

export const typography = {
  fontFamilyRegular: "Manrope_400Regular",
  fontFamilyMedium: "Manrope_500Medium",
  fontFamilySemiBold: "Manrope_600SemiBold",
  fontFamilyBold: "Manrope_700Bold",

  headings: {
    h1: {
      fontSize: 48,
      fontFamily: "Manrope_700Bold",
    },
    h2: {
      fontSize: 40,
      fontFamily: "Manrope_700Bold",
    },
    h3: {
      fontSize: 28,
      lineHeight: 34, // ~28 * 1.2
      fontFamily: "Manrope_700Bold",
    },
    h4: {
      fontSize: 24,
      fontFamily: "Manrope_700Bold",
    },
    h5: {
      fontSize: 20,
      fontFamily: "Manrope_700Bold",
    },
    h6: {
      fontSize: 16,
      fontFamily: "Manrope_700Bold",
    },
  },

  body: {
    xlarge: {
      bold: {
        fontSize: 18,
        fontFamily: "Manrope_700Bold",
      },
      semibold: {
        fontSize: 18,
        fontFamily: "Manrope_600SemiBold",
      },
      medium: {
        fontSize: 18,
        fontFamily: "Manrope_500Medium",
      },
      regular: {
        fontSize: 18,
        fontFamily: "Manrope_400Regular",
      },
    },

    large: {
      bold: {
        fontSize: 16,
        fontFamily: "Manrope_700Bold",
      },
      semibold: {
        fontSize: 16,
        fontFamily: "Manrope_600SemiBold",
      },
      medium: {
        fontSize: 16,
        fontFamily: "Manrope_500Medium",
      },
      regular: {
        fontSize: 16,
        fontFamily: "Manrope_400Regular",
      },
    },

    medium: {
      bold: {
        fontSize: 14,
        fontFamily: "Manrope_700Bold",
      },
      semibold: {
        fontSize: 14,
        fontFamily: "Manrope_600SemiBold",
      },
      medium: {
        fontSize: 14,
        fontFamily: "Manrope_500Medium",
      },
      regular: {
        fontSize: 14,
        fontFamily: "Manrope_400Regular",
      },
    },

    small: {
      bold: {
        fontSize: 12,
        fontFamily: "Manrope_700Bold",
      },
      semibold: {
        fontSize: 12,
        fontFamily: "Manrope_600SemiBold",
      },
      medium: {
        fontSize: 12,
        fontFamily: "Manrope_500Medium",
      },
      regular: {
        fontSize: 12,
        fontFamily: "Manrope_400Regular",
      },
    },
  },
};

export const theme = {
  colors,
  typography,
};
