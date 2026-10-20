
export const useAuth = () => {

    const handleLogin = async (email, password) => {

        try {
            const response = await authService({email, password});
            const token = response.data.token;

            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

            const payload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );

            const user = JSON.parse(payload);

            console.log('User:', user);

        } catch (error) {
            throw error;
        }
    }  
    
    return {
        handleLogin
    }

}