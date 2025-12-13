import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config';

const useRole = () => {
    const { user, isLoaded } = useUser();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded) return;

        if (user) {
            setLoading(true); // Optional: reset loading if user changes
            fetch(`${API_URL}/users/${user?.primaryEmailAddress?.emailAddress}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data?.role);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch role", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [isLoaded, user]);

    return { role, loading };
};

export default useRole;
