import {readDataSize } from '@/api';
import { useState, useEffect } from "react";


export default function useSizeData(){
  const [data, setData] = useState();

  useEffect(()=>{
    const fetchData = async () =>{
      const resSize = await readDataSize();
      setData([...resSize.map(el => ({ value: el.size, label: el.size }))]);
    }
    fetchData();
  },[]);

  return {
    data
  }
}