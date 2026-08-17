import localFont from "next/font/local";

export const archivoExpanded = localFont({
  src: [
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Archivo-Expanded-Font-Family/Archivo_Expanded-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-archivo-expanded",
  display: "swap",
});
