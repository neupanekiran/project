import { useState, FormEvent } from 'react';
import { doc, getDoc, collection, query, where, getDocs, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import Logo from '../assets/Logo.png';

// 1. UPDATE: The props interface now requires onLoginSuccess to accept two arguments.
interface LoginScreenProps {
  onLoginSuccess: (storeName: string, email: string) => void;
}

export const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your credentials.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const findUser = async (): Promise<DocumentSnapshot | QueryDocumentSnapshot | null> => {
        // --- Attempt 1: Login via Store ID (Document ID) ---
        const docRef = doc(db, 'users', identifier);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap;
        }

        // --- Attempt 2: Login via Email ---
        const usersRef = collection(db, 'users');
        const emailQuery = query(usersRef, where("email", "==", identifier));
        const emailSnapshot = await getDocs(emailQuery);
        if (!emailSnapshot.empty) {
          return emailSnapshot.docs[0];
        }

        // --- Attempt 3: Login via Store Name ---
        const nameQuery = query(usersRef, where("storeName", "==", identifier));
        const nameSnapshot = await getDocs(nameQuery);
        if (!nameSnapshot.empty) {
          return nameSnapshot.docs[0];
        }

        return null;
      };
      
      const userDoc = await findUser();

      if (userDoc) {
        const userData = userDoc.data();
        if (userData && userData.password === password) {
          // 2. THE FIX: Pass BOTH the storeName and email on successful login.
          onLoginSuccess(userData.storeName, userData.email);
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#000000] text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#1a1a1a] rounded-xl shadow-lg">
        <div className="text-center">
          <img src={Logo} alt="Danfe Tea Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Store Login</h1>
          <p className="text-gray-400">Welcome to Danfe Tea Chatbot</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Store ID / Email / Store Name
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 text-white bg-[#000000] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., your-store-name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-white bg-[#000000] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-bold text-white bg-accent rounded-md hover:bg-accent-dark disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};