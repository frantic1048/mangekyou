import Node from './Node';

function fileNodeInit({name, path, image}) {
  this.data = {
    key: path,
    file: {
      name,
      path,
      image,
    },
  };
  this.output = () => {
    return this.data.file.image;
  };
}

function FileNode(options) {
  return new Node(fileNodeInit, options);
}

export default FileNode;
