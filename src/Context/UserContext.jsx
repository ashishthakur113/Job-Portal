import { createContext, useState, useEffect } from 'react';

export const searchContext = createContext();

export default function UserContext({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    localStorage.removeItem("user");
    setUserData(null);
  };

  // ✅ Update user profile
  const updateUserProfile = (updatedProfile) => {
    setUserData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updatedProfile }
    }));
  };

  const data = {
    searchTerm, setSearchTerm,
    jobs, setJobs,
    allJobs, setAllJobs,
    userData, setUserData,
    logout,
    updateUserProfile
  };

  return (
    <searchContext.Provider value={data}>
      {children}
    </searchContext.Provider>
  );
}
