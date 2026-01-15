import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    isLoginOpen: boolean;
    toggleLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleLogin = () => setIsLoginOpen(prev => !prev);

    return (
        <AuthContext.Provider value={{ isLoginOpen, toggleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
