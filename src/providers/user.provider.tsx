// 'use client';

// import {UserInterface} from '@/types/user.types';
// import checkAuthStatus from '@/utils/auth';
// import {createContext, useContext, useEffect, useState} from 'react';

// interface UserContextInterface {
//     user: UserInterface | null;
//     setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
//     loading: boolean;
// }

// const UserContext = createContext<UserContextInterface | undefined>(undefined);

// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUser must be used within UserProvider');
//     }
//     return context;
// };

// export const UserProvider = ({
//     initialUser = null,
//     children,
// }: {
//     initialUser?: UserInterface | null;
//     children: React.ReactNode;
// }) => {
//     const [user, setUser] = useState<UserInterface | null>(initialUser);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const revalidateUser = async () => {
//             try {
//                 const res = await checkAuthStatus();
//                 setUser(res.user ?? null);
//             } catch {
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         revalidateUser();
//     }, []);

//     return (
//         <UserContext.Provider value={{user, setUser, loading}}>
//             {children}
//         </UserContext.Provider>
//     );
// };
