import React, { useState } from 'react';
import FileTree from './fold'; // Import your FileTree component

const App = () => {
  const [tree, setTree] = useState(null); // State to hold the file tree structure

  // Function to handle file creation
  const handleCreateFile = async (path, content = '') => {
    try {
      const response = await fetch('/files/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content }),
      });

      if (response.ok) {
        const updatedTree = await response.json();
        setTree(updatedTree);
      } else {
        console.error('Error creating file:', await response.text());
      }
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  // Function to handle folder creation
  const handleCreateFolder = async (path) => {
    try {
      const response = await fetch('/files/create-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (response.ok) {
        const updatedTree = await response.json();
        setTree(updatedTree);
      } else {
        console.error('Error creating folder:', await response.text());
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  // Function to handle file deletion
  const handleDeleteFile = async (path) => {
    try {
      const response = await fetch('/files/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (response.ok) {
        const updatedTree = await response.json();
        setTree(updatedTree);
      } else {
        console.error('Error deleting file:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Function to handle folder deletion (recursively delete nested files/folders)
  const handleDeleteFolder = async (path) => {
    try {
      const response = await fetch('/files/delete-folder', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (response.ok) {
        const updatedTree = await response.json();
        setTree(updatedTree);
      } else {
        console.error('Error deleting folder:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleNodeSelect = (selectedPath) => {
    // Handle node selection (e.g., display file content)
  };

  return (
    <div>
      {tree && <FileTree tree={tree} onSelect={handleNodeSelect} onFileCreate={handleCreateFile} onFolderCreate={handleCreateFolder} onFileDelete={handleDeleteFile} onFolderDelete={handleDeleteFolder} />}
    </div>
  );
};

export default App;