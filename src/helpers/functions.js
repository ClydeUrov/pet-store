

export const makeMainLinkName = (item)=>{
    const linkName = `/catalogue/${item.name}-${item.id}`;
    return linkName;
  };

export const makeInnerLinkName = (item)=>{
    const linkName = `${item.name}-${item.id}`;
    return linkName;
  };


  export const makeInnerCategoryId = (categoryWithId) => {
    if (!categoryWithId[3]){
      return null;
    }
    let innerCategoryId = categoryWithId[3].split('-')[1];
    return innerCategoryId;
  };