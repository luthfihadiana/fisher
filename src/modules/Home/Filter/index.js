import { useForm } from "react-hook-form";
import cn from 'classnames';
import {Input, Controller, Button} from '@/components';
import {useLocationData, useSizeData} from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import formStyles from '@/styles/form.module.scss';
import schema from '@/schema/filterList';
import styles from './index.module.scss';

export default function Filter({
  onSubmit= ()=>{},
}){
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      location: null,
      size: null,
      price: null,
    }
  });
  const {data:locationData} = useLocationData();
  const {data: sizeData} = useSizeData();

  const clearValue = (name) =>{
    setValue(name, null);
  }

  return(
    <div className={styles.filter}>
      <form className={formStyles.form}>
        <div className={formStyles.formSection}>
          <div className={formStyles.formFieldGroup}>
            <div className={formStyles.formField}>
              <label className={cn(formStyles.formLabel, styles.label)}>
                Lokasi
                <span className={styles.clear} onClick={()=> clearValue("location")}>Clear</span>
              </label>
              <Controller control={control} name="location">
                <Input
                  type="dropdown"
                  options={locationData}
                  placeholder="Pilih Lokasi Komoditas"
                />
              </Controller>
            </div>
            <div className={formStyles.formField}>
              <label className={cn(formStyles.formLabel, styles.label)}>
                Ukuran
                <span className={styles.clear} onClick={()=> clearValue("size")}>Clear</span>
              </label>
              <div className={formStyles.formInputContainer}>
                <Controller control={control} name="size">
                  <Input
                    type="dropdown"
                    className={formStyles.inputDropdown}
                    options={sizeData}
                    placeholder="Pilih Ukuran Komoditas"
                  />
                </Controller>
                <span className={formStyles.formCurrency}>CM</span>
              </div>
            </div>
          </div>
          <div className={formStyles.formFieldGroup}>
            <div className={formStyles.formField}>
              <label className={cn(formStyles.formLabel, styles.label)}>
                Harga
                <span className={styles.clear} onClick={()=> clearValue("price")}>Clear</span>
              </label>
              <div className={formStyles.formInputContainer}>
                <span className={formStyles.formCurrency}>Rp.</span>
                <Controller
                  control={control}
                  name="price"
                >
                  <Input
                    className={formStyles.input}
                    type="number"
                    placeholder="Masukkan harga komoditas ...."
                  />
                </Controller>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonConfirm}>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}