import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/data';

export const AuthContext = React.createContext(null);

const decodeJwt = (token) => {
    try {
        const payload = token.split('.')[1];
        const json = JSON.parse(atob(payload));
        return json;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [authLoading, setAuthLoading] = React.useState(false);
    const [validationLoading, setValidationLoading] = React.useState(true);
    const inactivityTimerRef = React.useRef(null);
    const navigate = useNavigate();

    const clearAuth = React.useCallback(() => {
        Cookies.remove('authtoken');
        setAuthToken(null);
        setIsAuthenticated(false);
        setUser(null);
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = null;
        }
    }, []);

    // Validate user exists in database
    const validateUser = React.useCallback(async (token) => {
        try {
            const response = await fetch(`${API_BASE}/auth/getuser`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'authtoken': token
                }
            });
            const result = await response.json();
            
            if (!result.success || !result.user) {
                clearAuth();
                return false;
            }
            setUser(result.user);
            return true;
        } catch (error) {
            console.error('User validation failed:', error);
            clearAuth();
            return false;
        }
    }, [clearAuth]);

    React.useEffect(() => {
        const initAuth = async () => {
            const token = Cookies.get('authtoken');
            if (token) {
                const decoded = decodeJwt(token);
                if (decoded) {
                    setUser(decoded);
                    setAuthToken(token);
                    setIsAuthenticated(true);
                    
                    // Validate user in background
                    await validateUser(token);
                } else {
                    clearAuth();
                }
            }
            setValidationLoading(false);
        };
        
        initAuth();
    }, [validateUser, clearAuth]);

    // Periodic validation check every 5 minutes
    React.useEffect(() => {
        if (!isAuthenticated || !authToken) return;

        const intervalId = setInterval(async () => {
            await validateUser(authToken);
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(intervalId);
    }, [isAuthenticated, authToken, validateUser]);

    const login = React.useCallback(async (email, password) => {
        setAuthLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const json = await res.json();
            if (!json.success) {
                throw new Error(json.error || 'Invalid credentials');
            }
            const token = json.authtoken;
            if (token) {
                Cookies.set('authtoken', token, { sameSite: 'Lax' });
                setAuthToken(token);
                setIsAuthenticated(true);
                setUser(json.user || null);
            }
            return { success: true, user: json.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const register = React.useCallback(async (name, email, phone, password) => {
        setAuthLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, phone, password, role: 'User' }),
            });
            const json = await res.json();
            if (!json.success) {
                throw new Error(json.error || 'Registration failed');
            }
            const token = json.authtoken;
            if (token) {
                Cookies.set('authtoken', token, { sameSite: 'Lax' });
                setAuthToken(token);
                setIsAuthenticated(true);
                setUser(json.user || null);
            }
            return { success: true, user: json.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const completeProfile = React.useCallback(async (onboardingData) => {
        if (!authToken) return { success: false, error: 'Not authenticated' };
        setAuthLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/complete-profile`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'authtoken': authToken
                },
                credentials: 'include',
                body: JSON.stringify(onboardingData || {})
            });
            const json = await res.json();
            if (!json.success) {
                throw new Error(json.error || 'Failed to complete profile');
            }
            const token = json.authtoken;
            if (token) {
                Cookies.set('authtoken', token, { sameSite: 'Lax' });
                setAuthToken(token);
                setIsAuthenticated(true);
                setUser(json.user || null);
            }
            return { success: true, user: json.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setAuthLoading(false);
        }
    }, [authToken]);

    const continueAsGuest = React.useCallback(async () => {
        const guestEmail = `guest_${Math.random().toString(36).substring(2, 9)}@scoutfox.com`;
        const guestPassword = `guest_pass_${Math.random().toString(36).substring(2, 9)}`;
        const guestName = "Guest Traveler";
        const guestPhone = "0000000000";
        return await register(guestName, guestEmail, guestPhone, guestPassword);
    }, [register]);

    const updateProfile = React.useCallback(async (profileData) => {
        if (!authToken || !user) return { success: false, error: 'Not authenticated' };
        setAuthLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/update-profile`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'authtoken': authToken
                },
                credentials: 'include',
                body: JSON.stringify({ userId: user.id || user._id, ...profileData }),
            });
            const json = await res.json();
            if (!json.success) {
                throw new Error(json.error || 'Failed to update profile');
            }
            const token = json.authtoken;
            if (token) {
                Cookies.set('authtoken', token, { sameSite: 'Lax' });
                setAuthToken(token);
                setIsAuthenticated(true);
                setUser(json.user || null);
            }
            return { success: true, user: json.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setAuthLoading(false);
        }
    }, [authToken, user]);

    const refreshUser = React.useCallback(async () => {
        if (authToken) {
            await validateUser(authToken);
        }
    }, [authToken, validateUser]);

    const logout = React.useCallback(async () => {
        try {
            await fetch(`${API_BASE}/auth/logout`, { method: 'GET', credentials: 'include' });
        } catch {}
        clearAuth();
        navigate('/login');
    }, [clearAuth, navigate]);

    const value = React.useMemo(
        () => ({
            authToken,
            user,
            isAuthenticated,
            authLoading,
            validationLoading,
            login,
            register,
            logout,
            completeProfile,
            continueAsGuest,
            updateProfile,
            refreshUser,
        }),
        [authToken, user, isAuthenticated, authLoading, validationLoading, login, register, logout, completeProfile, continueAsGuest, updateProfile, refreshUser]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = React.useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return ctx;
};