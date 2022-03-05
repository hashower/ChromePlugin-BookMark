
// 获取书签目录路径
let tmpBreadcrumb:any = [];
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

  return tmpBreadcrumb

};


