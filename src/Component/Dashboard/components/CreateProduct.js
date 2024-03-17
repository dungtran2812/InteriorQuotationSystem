import {
  Box,
  Card,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { axiosClient } from "../../../api/axiosClients";
import { useEffect } from "react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Name of product cannot be empty!"),
  description: Yup.string().required("Description of product cannot be empty!"),
  type: Yup.string("Type of product must be a string").required(
    "Type of product cannot be empty!"
  ),
  height: Yup.number()
    .required("Height cannot be empty!")
    .min(0, "Height of product must be greater than 0!"),
  length: Yup.number()
    .required("Length cannot be empty!")
    .min(0, "Length of product must be greater than 0!"),
  width: Yup.number()
    .required("Width cannot be empty!")
    .min(0, "Width of product must be greater than 0!"),
  price: Yup.number()
    .required("Price cannot be empty!")
    .min(0, "Price of product must be greater than 0!"),
  fileImg: Yup.mixed().required("File image of product is required!")
});

export default function ModalCreateProduct({ open, setOpen, fetchProducts, setIsLoading }) {
  const [imgSrc, setImgSrc] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          initialValues={{
            name: "",
            description: "",
            type: "",
            height: "",
            length: "",
            width: "",
            price: "",
            fileImg: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            //setIsLoading(true)

            try {
              setIsLoading(true)
              console.log("values: ", values);
              const submitValues = new FormData();
              submitValues.append("fileImg", values.fileImg);
              const response = await axiosClient.post(
                `/product/createProduct?name=${values.name}&description=${values.description}&type=${values.type}&width=${values.width}&height=${values.height}&length=${values.length}&price=${values.price}`,
                submitValues,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(response);
              setOpen(false);
              fetchProducts();
              toast.success("Product created successfully !");
            } catch (error) {
              console.error("Error updating product:", error);
              toast.error("Create Product failed !");
            }finally{
              setIsLoading(false)
            }
          }}
        >
          {({ values }) => (
            <Form>
              <DialogTitle id="alert-dialog-title" sx={{textAlign:"center"}}>
                {"CREATE PRODUCT"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      {" "}
                      <Field name={`name`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Product name:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              placeholder="Input name of the product ..."
                              fullWidth
                              autoComplete="off"
                              //   label="Name of the product"
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{}}>
                        {imgSrc && (
                          <Card sx={{ mb: 2 }}>
                            <CardMedia
                              component="img"
                              height="200"
                              image={imgSrc}
                              //sx={{ objectFit: "contain" }}
                              alt="Product Image"
                            />
                          </Card>
                        )}

                        <Field name="fileImg">
                          {({ field, form, meta }) => (
                            <>
                              <Button
                                component="label"
                                color="warning"
                                variant="contained"
                                htmlFor="fileImg"
                              >
                                Select Image of Product
                                <input
                                  hidden
                                  multiple
                                  type="file"
                                  id="fileImg"
                                  accept="image/png, image/jpeg"
                                  onChange={(event) => {
                                    const reader = new FileReader();
                                    const files = event.currentTarget.files;
                                    if (files && files.length !== 0) {
                                      reader.onload = () =>
                                        setImgSrc(reader.result);
                                      reader.readAsDataURL(files[0]);
                                    }
                                    form.setFieldValue(
                                      field.name,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </Button>
                              {meta.touched && !!meta.error && (
                                <div style={{ color: "red", fontSize:"13px", marginLeft:"12px", marginTop:"5px" }}>{meta.error}</div>
                              )}
                            </>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name={`description`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Description:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              minRows={3}
                              multiline
                              fullWidth
                              maxRows={20}
                              autoComplete="off"
                              //   label="Description"
                              placeholder="Description of a product..."
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={4}>
                      <Field name={`height`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Height:
                            </Typography>
                            <TextField
                              {...field}
                              type="number"
                              //   label="Height"
                              autoComplete="off"
                              size="small"
                              placeholder="Input height"
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={4}>
                      <Field name={`length`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Length:
                            </Typography>
                            <TextField
                              {...field}
                              type="number"
                              //   label="Length"
                              autoComplete="off"
                              size="small"
                              placeholder="Input length"
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={4}>
                      <Field name={`width`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Width:
                            </Typography>
                            <TextField
                              {...field}
                              type="number"
                              //   label="Width"
                              size="small"
                              autoComplete="off"
                              placeholder="Input width"
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name={`type`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Type:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              //   label="Type"
                              size="small"
                              autoComplete="off"
                              fullWidth
                              placeholder="Input type of product"
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      <Field name={`price`}>
                        {({ field, meta }) => (
                          <>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "black", mb: 1 }}
                            >
                              Price:
                            </Typography>
                            <TextField
                              {...field}
                              type="number"
                              //   label="Price"
                              autoComplete="off"
                              size="small"
                              fullWidth
                              placeholder="Input price of product"
                              error={meta.touched && !!meta.error}
                              helperText={
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  <Stack direction={"row"} sx={{ mt: 4 }} spacing={3}>
                    <Button
                      fullWidth
                      color="error"
                      onClick={handleClose}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      autoFocus
                      color="info"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Stack>
                </DialogContentText>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
