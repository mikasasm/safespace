// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PhotoIcon } from '@heroicons/react/24/solid';

// export default function Signup() {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         name: '',
//         email: '',
//         gender: '',
//         bio: '',
//         age: ''
//     });

//     const [profilePicture, setProfilePicture] = useState(null);
//     const [error, setError] = useState('');
//     const [missingDetailsError, setMissingDetailsError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleFileChange = (e) => {
//         setProfilePicture(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if all required fields are filled
//         const requiredFields = ['username', 'password', 'name', 'email', 'gender', 'age'];
//         const missingFields = requiredFields.filter(field => !formData[field]);

//         if (missingFields.length > 0) {
//             setMissingDetailsError('Please fill in all required fields.');
//             return;
//         }

//         try {
//             const formDataWithFile = new FormData();
//             for (const key in formData) {
//                 formDataWithFile.append(key, formData[key]);
//             }
//             if (profilePicture) {
//                 formDataWithFile.append('profilePicture', profilePicture);
//             }

//             const response = await fetch('http://localhost:8000/signup', {
//                 method: 'POST',
//                 body: formDataWithFile,
//             });

//             if (response.status === 409) {
//                 const data = await response.json();
//                 setError(data.msg);
//                 return;
//             }

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             console.log('Signup successful:', data);
//             navigate('/login');
//         } catch (error) {
//             console.error('Error signing up:', error);
//         }
//     };

//     const handleCancel = () => {
//         setFormData({
//             username: '',
//             password: '',
//             name: '',
//             email: '',
//             gender: '',
//             bio: '',
//             age: ''
//         });
//         setProfilePicture(null);
//         setError('');
//         setMissingDetailsError('');
//     };

//     const closeModal = () => {
//         setError('');
//         setMissingDetailsError('');
//     };

//     return (
//         <div>
//             <div className="px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-r from-zinc-50 to-red-100">
//                 {(error || missingDetailsError) && (
//                     <div className="fixed inset-0 flex items-center justify-center z-50">
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//                         <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
//                             <div className="bg-red-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
//                                         <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V7a1 1 0 112 0v3a1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                                         <h3 className="text-lg leading-6 font-medium text-ink">Error</h3>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">{error || missingDetailsError}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                                 <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit} className='max-w-3xl mx-auto'>
//                     <div className="space-y-12">
//                         <div className="border-b border-gray-900/10 pb-12">
//                             <h2 className="text-2xl font-bold leading-7 text-ink text-center mb-8">Signup</h2> {/* Center align and increase font size */}

//                             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 col-span-full">
//                                 <div className="col-span-full">
//                                     <label htmlFor="profilePicture" className="block text-sm font-medium leading-6 text-ink">Profile Picture</label>
//                                     <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                                         <div className="text-center">
//                                             <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
//                                             <div className="mt-4 flex text-sm leading-6 text-ink/70">
//                                                 <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2 hover:text-indigo-500">
//                                                     <span>Upload a file</span>
//                                                     <input id="file-upload" name="profilePicture" type="file" onChange={handleFileChange} className="sr-only" />
//                                                 </label>
//                                                 <p className="pl-1">or drag and drop</p>
//                                             </div>
//                                             <p className="text-xs leading-5 text-ink/70">PNG, JPG, GIF up to 10MB</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="sm:col-span-4">
//                                     <label htmlFor="username" className="block text-sm font-medium leading-6 text-ink">
//                                         Username <span className="text-ink/70">*</span>
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-inset focus-within:ring-ink sm:max-w-md">
//                                             <input
//                                                 type="text"
//                                                 name="username"
//                                                 id="username"
//                                                 autoComplete="username"
//                                                 value={formData.username}
//                                                 onChange={handleChange}
//                                                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-ink placeholder:text-ink/50 focus:ring-0 sm:text-sm sm:leading-6"
//                                                 placeholder="janesmith"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="sm:col-span-4">
//                                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-ink">
//                                         Password <span className="text-ink/70">*</span>
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-inset focus-within:ring-ink sm:max-w-md">
//                                             <input
//                                                 type="password"
//                                                 name="password"
//                                                 id="password"
//                                                 autoComplete="current-password"
//                                                 value={formData.password}
//                                                 onChange={handleChange}
//                                                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-ink placeholder:text-ink/50 focus:ring-0 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="col-span-full">
//                                     <label htmlFor="bio" className="block text-sm font-medium leading-6 text-ink">
//                                         About
//                                     </label>
//                                     <div className="mt-2">
//                                         <textarea
//                                             id="bio"
//                                             name="bio"
//                                             rows={3}
//                                             value={formData.bio}
//                                             onChange={handleChange}
//                                             className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                     <p className="mt-3 text-sm leading-6 text-ink/70">Write a few sentences about yourself.</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="border-b border-gray-900/10 pb-12">
//                             <h2 className="text-base font-semibold leading-7 text-ink">Personal Information</h2>
//                             <p className="mt-1 text-sm leading-6 text-ink/70">Use a permanent address where you can receive mail.</p>

//                             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                                 <div className="sm:col-span-3">
//                                     <label htmlFor="name" className="block text-sm font-medium leading-6 text-ink">
//                                         Name <span className="text-ink/70">*</span>
//                                     </label>
//                                     <div className="mt-2">
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             id="name"
//                                             autoComplete="given-name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="sm:col-span-4">
//                                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-ink">
//                                         Email address <span className="text-ink/70">*</span>
//                                     </label>
//                                     <div className="mt-2">
//                                         <input
//                                             id="email"
//                                             name="email"
//                                             type="email"
//                                             autoComplete="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="sm:col-span-3">
//                                     <label htmlFor="gender" className="block text-sm font-medium leading-6 text-ink">
//                                         Gender <span className="text-ink/70">*</span>
//                                     </label>
//                                     <div className="mt-2">
//                                         <select
//                                             id="gender"
//                                             name="gender"
//                                             autoComplete="gender"
//                                             value={formData.gender}
//                                             onChange={handleChange}
//                                             className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 focus:ring-2 focus:ring-inset focus:ring-ink sm:max-w-xs sm:text-sm sm:leading-6"
//                                         >
//                                             <option value="">Select Gender</option>
//                                             <option value="Male">Male</option>
//                                             <option value="Female">Female</option>
//                                             <option value="Non Binary">Non Binary</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="sm:col-span-2 sm:col-start-1">
//                                     <label htmlFor="age" className="block text-sm font-medium leading-6 text-ink">
//                                         Age <span className="text-ink/70">*</span>
//                                     </label>
//                                     <div className="mt-2">
//                                         <input
//                                             type="text"
//                                             name="age"
//                                             id="age"
//                                             autoComplete="age"
//                                             value={formData.age}
//                                             onChange={handleChange}
//                                             className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-12 flex items-center justify-center gap-x-6"> {/* Center align the buttons */}
//                         <button onClick={handleCancel} type="button" className="text-lg font-semibold leading-6 text-ink">
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import C from '../../theme';

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
.serif{font-family:'Fraunces',Georgia,serif}
.sans{font-family:'Inter',system-ui,sans-serif}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeUp .4s ease both}
`;

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        gender: '',
        bio: '',
        age: ''
    });

    const [error, setError] = useState('');
    const [missingDetailsError, setMissingDetailsError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['username', 'password', 'name', 'email', 'gender', 'age'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setMissingDetailsError('Please fill in all required fields.');
            return;
        }

        try {
            const signupData = new FormData();
            for (const key in formData) {
                signupData.append(key, formData[key]);
            }

            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                body: signupData,
            });

            if (response.status === 409) {
                const data = await response.json();
                setError(data.msg);
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: '',
            password: '',
            name: '',
            email: '',
            gender: '',
            bio: '',
            age: ''
        });
        setError('');
        setMissingDetailsError('');
    };

    const closeModal = () => {
        setError('');
        setMissingDetailsError('');
    };

    return (
        <div className="sans flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8" style={{ background: C.page }}>
            <style>{FONTS}</style>
            {(error || missingDetailsError) && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 transition-opacity" style={{ background: 'rgba(51,50,46,.45)' }} aria-hidden="true"></div>
                    <div className="fade rounded-3xl overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full" style={{ background: C.card, border: `1px solid ${C.line}` }}>
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4" style={{ background: C.card }}>
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10" style={{ background: 'rgba(146,129,122,.28)' }}>
                                    <svg className="h-6 w-6" style={{ color: C.ink }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V7a1 1 0 112 0v3a1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="serif text-lg leading-6" style={{ color: C.ink }}>Just a moment</h3>
                                    <div className="mt-2">
                                        <p className="text-sm" style={{ color: C.ink }}>{error || missingDetailsError}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" style={{ background: 'rgba(26,26,18,.05)', borderTop: `1px solid ${C.line}` }}>
                            <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-5 py-2 text-base font-medium text-ink hover:opacity-90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" style={{ background: C.accent }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full mt-16">
                <form onSubmit={handleSubmit} className="fade max-w-3xl mx-auto rounded-3xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: '0 10px 40px rgba(80,70,50,.07)' }}>
                    <div className="px-8 py-8">
                        <h2 className="serif text-3xl mb-1 text-center" style={{ color: C.ink }}>Create your space</h2>
                        <p className="text-sm mb-8 text-center" style={{ color: C.muted }}>A few details, then you're in.</p>
                        <div className="space-y-12">
                            <div className="border-b pb-12" style={{ borderColor: C.line }}>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 col-span-full">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-ink">
                                            Username <span className="text-ink/70">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-xl bg-ink/5 shadow-sm ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-inset focus-within:ring-ink sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    autoComplete="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-ink placeholder:text-ink/50 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="janesmith"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-ink">
                                            Password <span className="text-ink/70">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-xl bg-ink/5 shadow-sm ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-inset focus-within:ring-ink sm:max-w-md">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-ink placeholder:text-ink/50 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="bio" className="block text-sm font-medium leading-6 text-ink">
                                            About
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                rows={3}
                                                value={formData.bio}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-ink/70">Write a few sentences about yourself.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b pb-12" style={{ borderColor: C.line }}>
                                <h2 className="serif text-xl leading-7" style={{ color: C.ink }}>Personal information</h2>
                                <p className="mt-1 text-sm leading-6" style={{ color: C.muted }}>Just enough to make this space yours.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-ink">
                                            Name <span className="text-ink/70">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="given-name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-ink">
                                            Email address <span className="text-ink/70">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-ink">
                                            Gender <span className="text-ink/70">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="gender"
                                                name="gender"
                                                autoComplete="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 focus:ring-2 focus:ring-inset focus:ring-ink sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Non Binary">Non Binary</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="age" className="block text-sm font-medium leading-6 text-ink">
                                            Age <span className="text-ink/70">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="age"
                                                id="age"
                                                autoComplete="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border-0 bg-ink/5 py-2.5 text-ink shadow-sm ring-1 ring-inset ring-ink/15 placeholder:text-ink/50 focus:ring-2 focus:ring-inset focus:ring-ink sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-x-6 py-5" style={{ background: 'rgba(26,26,18,.05)', borderTop: `1px solid ${C.line}` }}>
                        <button onClick={handleCancel} type="button" className="text-base font-medium leading-6" style={{ color: C.muted }}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-2xl px-8 py-3 text-base font-medium text-ink transition-colors hover:opacity-90"
                            style={{ background: C.accent }}>
                            Create account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

