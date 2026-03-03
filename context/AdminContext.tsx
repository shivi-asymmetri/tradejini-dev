// "use client";

// import { User } from "firebase/auth";
// import { useContext, createContext, useState, useEffect } from "react";
// const AdminContext = createContext<{
//   user: User,
//   setUser
// }>(null);

// function AdminProvider({ children }: Readonly<{ children: React.ReactNode }>) {
//   const [admin, setAdmin] = useState(null);

//   return (
//     <AdminContext.Provider value={{ user, setUser }}>
//       {children}
//     </AdminContext.Provider>
//   );
// }

// export default function useAdmin() {
//   return useContext(AdminContext);
// }
// export { AdminProvider };
