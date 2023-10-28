"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
    import { useTheme } from "next-themes"
   import { MoonIcon, SunIcon,DesktopIcon } from "@radix-ui/react-icons"
   import { Button } from "@/components/ui/button"
function Themegenerator() {
    const {theme,setTheme}=useTheme();
    // const [mounted,setmounted]=useState(false)
  return (
    <Tabs defaultValue={theme} >
    <TabsList className="border" >
      <TabsTrigger onClick={()=>setTheme("light")} value="light">
      <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      
      </TabsTrigger>
      <TabsTrigger onClick={()=>setTheme("dark")} value="dark">
      <MoonIcon  className="h-[1.2rem] w-[1.2rem]"/>
        </TabsTrigger>
        <TabsTrigger onClick={()=>setTheme("system")} value="system">
         <DesktopIcon  />
        </TabsTrigger>
   
    </TabsList>
   
  </Tabs>
  
  )
}

export default Themegenerator