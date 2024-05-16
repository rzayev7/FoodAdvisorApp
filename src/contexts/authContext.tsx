import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

type TUser  = {
    username: string;
    email: string;
    avatarImage: string;
    token: string;
    likedRecipes: Meal[];
    blogs: Blog[];
}

type Blog = {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    likes: number;
}

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
};

interface AuthContextType {
  user: null | TUser; 
  setUser: React.Dispatch<React.SetStateAction<null | TUser>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (user: TUser) => void;
  logout: () => void;
  likeRecipe: (meal: Meal) => void;
  unlikeRecipe: (mealId: string) => void;
  changeProfileImage: (imageUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<null | TUser>(null); 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = Cookies.get('userToken');
            if (token) {
                try {
                    const response = await axios.get('https://fooderra-api.vercel.app/api/users/details', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);

                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
            setLoading(false);
        };
        fetchUserDetails();
    }, []);

    const login = (user: TUser) => {
        Cookies.set('userToken', user.token);
        setUser(user);
    };

    const logout = () => {
        Cookies.remove('userToken');
        setUser(null);
    };

    const likeRecipe = async (meal: Meal) => {
        try {
            setLoading(true);
            const response = await axios.patch('https://fooderra-api.vercel.app/api/users/like', {
                meal
            }, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error liking recipe:', error);

        }
    }

    const unlikeRecipe = async (mealId: string) => {
        try {
            const response = await axios.patch('https://fooderra-api.vercel.app/api/users/removelike', {
                mealId
            }, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error unliking recipe:', error);
        }
    }

    const changeProfileImage = async (imageUrl: string) => {
        try {
            setLoading(true);
            const response = await axios.patch('https://fooderra-api.vercel.app/api/users/updateProfileImage', {
                imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error changing profile image:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout, likeRecipe, unlikeRecipe, changeProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}