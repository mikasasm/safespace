import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateJournal = () => {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState('');
  const [coverPicture, setCoverPicture] = useState(null);
  const user = localStorage.getItem('tokenUser');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('article', article);
    formData.append('tags', tags);

    if (coverPicture) {
      formData.append('coverPicture', coverPicture);
    }

    try {
      const response = await fetch(`http://localhost:8000/${user}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user}`
        },
        body: formData
      });

      if (response.ok) {
        const newJournal = await response.json();
        console.log('Journal created:', newJournal);
        // Clear the form
        setTitle('');
        setArticle('');
        setTags('');
        setCoverPicture(null);
        navigate(`/${user}/profile`);
      } else {
        console.error('Failed to create journal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    setCoverPicture(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen mt-32">
        <div className="max-w-md mx-auto bg-cream rounded-lg overflow-hidden shadow-md ring-1 ring-ink/15">
        <div className="px-6 py-4 bg-cream">

            <h2 className="text-2xl font-bold text-ink mb-2">Create Journal</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-ink text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="appearance-none border border-ink/15 rounded w-full py-2 px-3 bg-cream text-ink placeholder:text-ink/50 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-ink text-sm font-bold mb-2" htmlFor="article">
                  Article
                </label>
                <textarea
                  className="appearance-none border border-ink/15 rounded w-full py-2 px-3 bg-cream text-ink placeholder:text-ink/50 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="article"
                  placeholder="Write your journal here..."
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-ink text-sm font-bold mb-2" htmlFor="tags">
                  Tags
                </label>
                <input
                  className="appearance-none border border-ink/15 rounded w-full py-2 px-3 bg-cream text-ink placeholder:text-ink/50 leading-tight focus:outline-none focus:shadow-outline"
                  id="tags"
                  type="text"
                  placeholder="Enter tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-ink text-sm font-bold mb-2" htmlFor="coverPicture">
                  Cover Picture
                </label>
                <input
                  className="appearance-none border border-ink/15 rounded w-full py-2 px-3 bg-cream text-ink placeholder:text-ink/50 leading-tight focus:outline-none focus:shadow-outline"
                  id="coverPicture"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-cream border border-ink/15 hover:bg-ink/5 text-ink font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    setTitle('');
                    setArticle('');
                    setTags('');
                    setCoverPicture(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-sun hover:bg-sun/80 text-ink font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJournal;
