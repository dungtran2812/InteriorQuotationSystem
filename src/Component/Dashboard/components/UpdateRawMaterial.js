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
import { useState } from "react";
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name of raw material cannot be empty!"),
    description: Yup.string().required("Description of raw material cannot be empty!"),
    type: Yup.string("Type of raw material must be a string").required(
      "Type of raw material cannot be empty!"
    ),
    pricePerM2: Yup.number()
      .required("Price cannot be empty!")
      .min(0, "Price of raw material must be greater than 0!"),
  });
  
  export default function ModalUpdateRawMaterial({
    rawMaterial,
    open,
    setOpen,
    fetchRawMaterials,
    setIsLoading
  }) {
    const [imgSrc, setImgSrc] = useState();
  
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(() => {
      setImgSrc(rawMaterial.img);
    }, [rawMaterial]);
  
    return (
      <>
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {rawMaterial && (
            <Formik
              initialValues={{
                name: rawMaterial.name,
                description: rawMaterial.description,
                type: rawMaterial.type,
                pricePerM2: rawMaterial.pricePerM2,           
                fileImg: null,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  setIsLoading(true)
                  console.log("values: ", values);
                  const submitValues = new FormData();
                  submitValues.append("fileImg", values.fileImg);
                  const response = await axiosClient.put(
                    `/rawMaterial/updateProduct?rawMaterialId=${rawMaterial.id}&name=${values.name}&description=${values.description}&type=${values.type}&pricePerM2=${values.pricePerM2}`,
                    submitValues,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  console.log(response); 
                  setOpen(false)          
                  fetchRawMaterials();
                  toast.success("Raw Material updated successfully !")
                } catch (error) {
                  console.error("Error updating Raw Material:", error);
                  toast.error("Update failed !");
                }finally{
                  setIsLoading(false)
                }
              }}
            >
              {({ values }) => (
                <Form>
                  <DialogTitle id="alert-dialog-title" sx={{textAlign:"center"}}>
                    {"UPDATE RAW MATERIAL"}
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
                                  placeholder="Input name of the Raw Material ..."
                                  fullWidth
                                  autoComplete="off"
                                  //   label="Name of the rawMaterial"
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
                                    Select Image of Raw Material
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
                                    <div style={{ color: "red" }}>
                                      {meta.error}
                                    </div>
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
                                  placeholder="Description of Raw Material..."
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
                                  placeholder="Input type of Raw Material"
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
                          <Field name={`pricePerM2`}>
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
                                  placeholder="Input price per m² of Raw Material"
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
          )}
        </Dialog>
      </>
    );
  }
  