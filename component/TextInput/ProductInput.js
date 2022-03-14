import { InputLabel, MenuItem, FormControl, Select, Menu } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductInput(props) {
  const [productArr, setProductArr] = useState([]);
  const [product, setProduct] = useState();
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/products")
      .then((res) => {
        setProductArr(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProduct = (e) => {
    setProduct(e.target.value);
  };
  return (
    <>
      <FormControl
        sx={{ width: "100%", margin: "0 16px 0 0" }}
        variant={props.variant}
      >
        <InputLabel id="productInput">상품</InputLabel>
        <Select
          labelId="product"
          id="product"
          label="상품"
          disablePortal
          value={product}
          onChange={handleProduct}
          sx={{ mb: "16px" }}
        >
          {productArr &&
            productArr.map((e, index) => (
              <MenuItem key={index} value={e.id} sx={{ minHeight: "38px" }}>
                {e.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
