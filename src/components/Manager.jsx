/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff, Save, Copy, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

import { db } from '../firebase.config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const Manager = () => {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'passwords'));
      const passwords = querySnapshot.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id }));
      setPasswordArray(passwords);
    } catch (err) {
      console.error('Error fetching passwords:', err);
    }
  };

  useEffect(() => {
    getPassword();
  }, []);

  const savePassword = async () => {
    if (form.site && form.username && form.password) {
      try {
        await addDoc(collection(db, 'passwords'), form);
        toast.success('Password saved!', { duration: 2000, position: 'top-center' });
        setForm({ site: '', username: '', password: '' });
        getPassword(); 
      } catch (err) {
        console.error('Error saving password:', err);
      }
    }
  };

  const deletePassword = async (id) => {
    const confirmDelete = confirm('Do you really want to delete this password?');
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, 'passwords', id));
      const newArr = passwordArray.filter(p => p.id !== id);
      setPasswordArray(newArr);
      toast.success('Password deleted successfully', {
        duration: 2000,
        position: 'top-center',
      });
    } catch (err) {
      console.error('Error deleting password:', err);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      duration: 2000,
      position: "top-center",
    });
  };

  return (
    <>
      <Toaster />
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
        <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-center sm:text-left">Save Your Passwords</h1>
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <input
              onChange={handleFormChange}
              value={form.site}
              name="site"
              placeholder="Enter Website URL"
              className="rounded-full p-2 px-4 border border-orange-500 h-9 sm:h-10 text-black w-full"
              type="text"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                onChange={handleFormChange}
                name="username"
                value={form.username}
                placeholder="Enter Username"
                className="rounded-full p-2 px-4 border border-orange-500 h-9 sm:h-10 text-black w-full sm:w-1/2"
                type="text"
              />

              <div className="relative w-full sm:w-1/2">
                <input
                  onChange={handleFormChange}
                  name="password"
                  value={form.password}
                  placeholder="Enter Password"
                  className="rounded-full p-2 px-4 border border-orange-500 h-9 sm:h-10 text-black w-full pr-10"
                  type={showPass ? "text" : "password"}
                />
                <button
                  onClick={showPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={16} className="sm:size-18" /> : <Eye size={16} className="sm:size-18" />}
                </button>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <Button
                onClick={savePassword}
                className="gap-1 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-sm sm:text-base py-1 sm:py-2"
                disabled={!form.site || !form.username || !form.password}
              >
                Save Password
                <Save size={14} className="sm:size-16" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 sm:p-6">
          <h2 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Your Passwords</h2>

          {/* For larger screens */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-white border-collapse">
              <thead className="bg-black bg-opacity-60">
                <tr>
                  <th className="text-start p-2 sm:p-3 rounded-tl-lg">Website</th>
                  <th className="text-start p-2 sm:p-3">Username</th>
                  <th className="text-start p-2 sm:p-3">Password</th>
                  <th className="text-center p-2 sm:p-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.length > 0 ? (
                  passwordArray.map((password, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-2 sm:p-3 break-all">
                        <div className='flex gap-2 sm:gap-3 items-center'>
                          <a href={password.site} target='_blank' rel="noopener noreferrer" className="truncate">{password.site}</a>
                          <Copy className='hover:cursor-pointer' size={16} onClick={() => copyText(password.site)} />
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 break-all">
                        <div className='flex gap-2 sm:gap-3 items-center'>
                          <span className="truncate">{password.username}</span>
                          <Copy className='hover:cursor-pointer' size={16} onClick={() => copyText(password.username)} />
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 break-all">
                        <span className="flex items-center gap-2">
                          <span className="truncate">{showPass ? password.password : "••••••••"}</span>
                          <Copy className='hover:cursor-pointer' size={16} onClick={() => copyText(password.password)} />
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        <button
                          onClick={() => deletePassword(password.id)}
                          className="text-red-500 hover:text-red-300"
                          aria-label="Delete password"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-3 sm:p-4 text-center text-gray-400">No passwords saved yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* For mobile screens */}
          <div className="sm:hidden">
            {passwordArray.length > 0 ? (
              <div className="space-y-3">
                {passwordArray.map((password, index) => (
                  <div key={index} className="bg-gray-700 bg-opacity-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Website:</span>
                      <div className="flex items-center gap-2">
                        <a href={password.site} target='_blank' rel="noopener noreferrer" className="text-white truncate max-w-32">{password.site}</a>
                        <Copy className='hover:cursor-pointer' size={14} onClick={() => copyText(password.site)} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Username:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white truncate max-w-32">{password.username}</span>
                        <Copy className='hover:cursor-pointer' size={14} onClick={() => copyText(password.username)} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Password:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{showPass ? password.password : "••••••••"}</span>
                        <Copy className='hover:cursor-pointer' size={14} onClick={() => copyText(password.password)} />
                      </div>
                    </div>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => deletePassword(password.id)}
                        className="text-red-500 hover:text-red-300"
                        aria-label="Delete password"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">No passwords saved yet</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
