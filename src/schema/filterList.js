import * as yup from "yup";

const schema = yup.object({
  location: yup.object({
    value: yup.string().nullable(),
    label: yup.string().nullable(),
  }).nullable(),
  size: yup.object({
    value: yup.string().nullable(),
    label: yup.string().nullable(),
  }).nullable(),
  price: yup.number().nullable(),
});

export default schema;