// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { Cross, X } from "lucide-react";

// export const PopupDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [per, setPer] = useState(false);
//   useEffect(() => {
//     // Timer for 5 seconds
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 5000);

//     // Scroll handler
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setIsOpen(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <AnimatePresence>
//       {isOpen && !per && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           className="fixed inset-0 z-[99999999999] flex items-center justify-center bg-black/50"
//           onClick={() => {
//             setIsOpen(false);
//             setPer(true);
//           }}
//         >
//           <div className="flex flex-col items-end gap-3">
//             <Button
//               variant="destructive"
//               className="w-fit flex-1"
//               onClick={() => {
//                 setIsOpen(false);
//                 setPer(true);
//               }}
//             >
//               <X></X>
//             </Button>
//             <Image
//               className="rounded-lg"
//               width={500}
//               height={500}
//               alt="popup"
//               src="/popup.webp"
//             ></Image>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
