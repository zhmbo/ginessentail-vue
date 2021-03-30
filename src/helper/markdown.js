// 通过·commonmark·获取md文件中所有img节点
// 参考文章：https://leeon.im/javascript-get-all-image-src-from-markdown/

const commonMark = require('commonmark');

const getAllImg = (markdown) => {
  if (!markdown) return;
  const parsed = new commonMark.Parser().parse(markdown);
  const walker = parsed.walker();
  let event;
  // const srcList = [];
  const nodeList = [];
  // eslint-disable-next-line no-cond-assign
  while (event = walker.next()) {
    const { node } = event;
    if (
      node.type === 'image'
      && node.destination
    ) {
      nodeList.push(node);
    }
  }
  // eslint-disable-next-line no-const-assign
  const srcList = nodeList.map((node) => node.destination);
  const uniqueSrcList = [...new Set(srcList)];

  // eslint-disable-next-line consistent-return
  return {
    srcList,
    uniqueSrcList,
    nodeList,
  };
};

export default {
  getAllImg,
};
