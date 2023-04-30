import {readDataLocation} from '@/api';
import { useState, useEffect } from "react";


export default function useLocationData(){
  const [data, setData] = useState();
  
  useEffect(()=>{
    const fetchData = async () => {
      const resLocation = await readDataLocation();
      setData([
        ...resLocation.map(el => ({
          value: `${el.city},${el.province}`,
          label: `${el.city}, ${el.province}`
        }))
      ]);
    }
    fetchData();
  },[]);

  return {
    data
  }
}