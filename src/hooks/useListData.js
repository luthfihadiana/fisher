import {useState, useEffect} from 'react';
import { readAllData } from "@/api/list";

export default function useListData(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await readAllData();
      const filtered = data.filter(el => el.uuid);
      setData(filtered);
      setLoading(false);
    };
    fetchData();
  }, []);

  return{
    data,
    loading
  }

}