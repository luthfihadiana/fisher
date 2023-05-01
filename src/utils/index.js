export const sortingListCommodity = (field=null, array=[], type='asc') => {
  const arr = [...array];
  switch(field){
    case 'price':
    case 'size':
      return arr.sort((a,b)=>{
        if(type ==='asc'){
          return parseInt(a?.[field], 0) - parseInt(b?.[field],0);
        }
        return parseInt(b?.[field],0) - parseInt(a?.[field],0);
      })
    case 'komoditas':
      return arr.sort((a,b)=> {
        const currVal = a?.komoditas?.toLowerCase();
        const nextVal = b?.komoditas?.toLowerCase();
        if(currVal < nextVal) return -1;
        if(currVal > nextVal) return 1;
        return 0;
      });
    case 'location':
      return arr.sort((a,b)=> {
        const currVal = a?.area_kota?.toLowerCase().replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").trim();
        const nextVal = b?.area_kota?.toLowerCase().replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").trim();
        if(currVal < nextVal) return -1;
        if(currVal > nextVal) return 1;
        return 0;
      });
    default:
      return array;
  }
}