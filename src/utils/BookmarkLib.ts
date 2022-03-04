// 获取书签目录路径
let tmpBreadcrumb: chrome.bookmarks.BookmarkTreeNode[] = [];
export const getBookmarkBreadcrumb = (id, cb) => {
  chrome.bookmarks.get(id, bms => {
    tmpBreadcrumb.push(bms[0]);
    if (bms[0].parentId === '0') {
      cb(tmpBreadcrumb);
      tmpBreadcrumb = [];
    } else {
      getBookmarkBreadcrumb(bms[0].parentId, cb);
    }
  });
};


export const getBookMarkMenu = ()=>{
  chrome.bookmarks.getTree((bookmarks)=>{
    console.log(bookmarks);
    
    menuTreeNode(bookmarks)
    
  })
}
const tmp: { id: any; label: any; children: void; }[] = [];
const menuTreeNode = (nodes: { [x: string]: { children: any; }; }) => {

  for (let i in nodes) {
    if (nodes[i].children !== undefined) {
      const tmpBM = {
        id: nodes[i].id,
        parentId: nodes[i].parentId,
        label: nodes[i].id === '0' ? chrome.i18n.getMessage('all_bookmarks') : nodes[i].title,
        cc: menuTreeNode(nodes[i].children),
      };
      tmp.push(tmpBM);
    }
  }

  
};
  console.log(tmp);