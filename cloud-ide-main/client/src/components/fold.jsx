import { useState } from 'react';
const FileTreeNode = ({ fileName, nodes, onSelect, path, hidden }) => {
  const isDir = !!nodes;
  const [isHidden, setIsHidden] = useState(hidden);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <div onClick={(e) => {
        e.stopPropagation();
        if (!isDir) {
          onSelect(path);
        } else {
          toggleHidden();
        }
      }}>
        <p className={isDir ? "" : "file-node"}>{fileName}</p>
        {isDir && (
          <span onClick={toggleHidden}>
            {isHidden ? '▸' : '▾'}
          </span>
        )}
      </div>
      {!isHidden && nodes && fileName !== "node_modules" && (
        <ul>
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={path + "/" + child}
                fileName={child}
                nodes={nodes[child]}
                hidden={hidden} // Pass down the hidden state to child nodes
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const FileTree = ({ tree, onSelect }) => {
  const [hiddenNodes, setHiddenNodes] = useState({});

  const handleNodeHiddenChange = (path, isHidden) => {
    setHiddenNodes((prevHiddenNodes) => ({
      ...prevHiddenNodes,
      [path]: isHidden,
    }));
  };

  return (
    <FileTreeNode
      onSelect={onSelect}
      fileName="/"
      path=""
      nodes={tree}
      hidden={hiddenNodes["/"]}
      onHiddenChange={handleNodeHiddenChange} // Pass down the handler
    />
  );
};

export default FileTree;