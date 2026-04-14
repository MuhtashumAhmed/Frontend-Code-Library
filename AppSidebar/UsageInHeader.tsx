// ====== make sure to install sidebar compoentn from Shadcn UI 
// ---- aslo wrap main layout.tsx file with provider


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
       
          <SidebarProvider>
            <AppSidebar />

            <div className="w-full px-2 md:px-4  ">
              <Header />

              {children}
            </div>
          </SidebarProvider>
       
      </body>
    </html>
  );
}



// ========= Then Use in Header sothat sidebar can be OPen close using buttons ===

{/* sidebar button */}
      <div className="">
        <SidebarTrigger />
        
      </div>