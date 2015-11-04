import NodeBase from './NodeBase';

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
  return new NodeBase(fileNodeInit, options);
}

export default FileNode;
