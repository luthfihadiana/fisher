import Head from 'next/head'
import {useState, useMemo, useRef} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router'
import Image from 'next/image';
import {useListData} from '@/hooks';
import {PageHeader, Button, Input, LoadingIndicator, Modal} from '@/components';
import { SORT_OPTIONS } from '@/constants';
import Filter from '@/modules/Home/Filter';
import styles from './index.module.scss';
import { sortingListCommodity } from '@/utils';

export default function Home() {
  const router = useRouter()
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const {data: listAllCommodity, loading} = useListData();
  const refFilterModal = useRef(null);

  const commodity = useMemo(()=> {
    const sortField = sort?.value?.split('_')[0];
    let dataCommodity = sortingListCommodity(sortField, [...listAllCommodity], sort?.order);

    if(filters?.price){
      dataCommodity = dataCommodity.filter(
        el =>
          el.price &&
          el.price.includes(filters?.price)
      );
    }

    if(filters?.size){
      dataCommodity = dataCommodity.filter(
        el =>
          el?.size &&
          el?.size === filters?.size
      );
    }

    if(filters?.location){
      const [area_kota,area_provinsi] = filters?.location?.split(",");
      dataCommodity = dataCommodity.filter(
        el =>
          el?.area_kota &&
          el?.area_provinsi && 
          el?.area_kota.toLowerCase() === area_kota.toLowerCase() &&
          el?.area_provinsi.toLowerCase() === area_provinsi.toLowerCase()
      );
    }

    if (searchName === ''){
      const hasNextPage = page < dataCommodity?.length;
      return{
        list: hasNextPage ? dataCommodity?.slice(0, page) :  dataCommodity,
        hasNextPage,
      }
    }

    const filteredComodity = dataCommodity.filter(
      el =>
        el.komoditas &&
        el.komoditas.toLowerCase().includes(searchName.toLowerCase())
    );
    const hasNextPage = page < filteredComodity?.length;
    return{
      list: hasNextPage ? filteredComodity?.slice(0, page) :  filteredComodity,
      hasNextPage,
    }
  },[listAllCommodity, searchName, page, filters, sort]);

  const title = useMemo(() =>  (searchName && searchName !== '' && `Pencarian untuk '${searchName}'`) ||
  "List Komoditas", [searchName]);

  const onSubmitFilter = (data) =>{
    setFilters({
      location: data?.location?.value,
      size: data?.size?.value,
      price: data?.price,
    })
    refFilterModal.current.hideModal();
  }

  const handlerShowFilterModal = () => {
    refFilterModal.current.showModal();
  };

  return (
    <>
      <Head>
        <title>List Komoditas | Fisher!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageHeader
          left={
            <h2>{title}</h2>
          }
          right={
            <div className={styles.action}>
              <Input 
                type="dropdown" 
                className={styles.sort} 
                options={SORT_OPTIONS} 
                value={sort} 
                onChange={(e)=>setSort(e)}
              />
              <Button variant="primary" icons="add" onClick={()=> router.push('/add-commodity')}> 
                Tambah Komoditas
              </Button>
            </div>
          }
        />
        <div className={styles.search}>
          <Input
            type="text"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className={styles.searchInput}
            placeholder="Ketik nama komoditas yang dicari"
          />
          <Button variant="primary" icons="filter_alt" onClick={handlerShowFilterModal}/>
        </div>
        <div
          className={
            cn(styles.listCommodity, {[styles.center]: commodity?.list?.length <= 0 || loading})
          }
        >
          {(loading && <LoadingIndicator />) ||
            (commodity?.list?.length > 0 &&
              commodity?.list?.map((el, idx) => (
                <div className={styles.commodity} key={el.uuid + idx}>
                  <Image
                    width="100"
                    height="100"
                    src="/fish.jpg"
                    className={styles.commodityImage}
                    alt="commodityImage"
                  />
                  <div className={styles.commodityInfo}>
                    <p className={styles.commodityName}>{el.komoditas || ""}</p>
                    <p className={styles.commodityPrice}>
                      {(el.price && `Rp.${el.price}`) || "-"}
                    </p>
                    <p className={styles.commodityPlace}>{`${el.area_kota}, ${el.area_provinsi}`}</p>
                    <p className={styles.commoditySize}>
                      {(el.size && `${el.size} cm`) || "-"}
                    </p>
                  </div>
                </div>
              ))) || (
              <p className={styles.commodityEmpty}>
                Data kosong
              </p>
            )}
        </div>
        {!loading && commodity?.hasNextPage && <div className={styles.loadingMore}>
          <Button variant="primary" onClick={() => setPage(page + 10)}>
            Load More
          </Button>
        </div>}
        <Modal title="Filter" ref={refFilterModal}>
          <Filter onSubmit={onSubmitFilter} />
        </Modal>
      </main>
    </>
  )
}
