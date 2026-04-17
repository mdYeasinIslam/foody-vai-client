'use client'
import { queryClient } from "@/src/@libs/config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";


const Provider= ({children}:{children:any}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
// "use client";

// import { DayjsConfig } from "@lib/config";
// import { queryClient } from "@lib/config/react-query/react-query";
// import { NextFontWithVariable } from "next/dist/compiled/@next/font";
// import dynamic from "next/dynamic";
// import NextNProgress from "nextjs-progressbar";
// import { QueryClientProvider } from "node_modules/@tanstack/react-query/build/modern/QueryClientProvider";
// import { type PropsWithChildren } from "react";
// import { Toaster } from "sonner";

// const PathGuard = dynamic(() => import("./PathGuard"), {
//   ssr: false,
// });

// type TProps = PropsWithChildren<{
//   nextFont: (NextFontWithVariable & { originalVariableName: string })[];
// }>;

// export const Providers = ({ nextFont, children }: TProps) => {
//   DayjsConfig();

//   return (
//     <PathGuard>
//       <QueryClientProvider client={queryClient}>
//         <NextNProgress
//           color="var(--color-primary)"
//           height={3}
//           options={{ showSpinner: false }}
//         />
//         <main
//           role="main"
//           id="__main"
//           className={[
//             ...nextFont.map((font) => font.variable),
//             "font-poppins",
//           ].join(" ")}
//         >
//           {children}
//         </main>
//         <Toaster position="top-right" />
//       </QueryClientProvider>
//     </PathGuard>
//   );
// };
