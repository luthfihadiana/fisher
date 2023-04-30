import * as yup from "yup";

const schema = yup.object({
  komoditas: yup.string().required("Masukan Nama Komoditas").typeError("Masukan Nama Komoditas"),
  location: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).required("Masukan Lokasi").typeError("Masukan Lokasi"),
  size: yup.object({
    value: yup.string(),
    label: yup.string(),
  }).required("Masukan Ukuran").typeError("Masukan Ukuran"),
  price: yup.number().required("Masukan Harga").typeError("Masukan Harga"),
});

export default schema;