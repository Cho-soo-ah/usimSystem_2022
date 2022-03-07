import { InputLabel, MenuItem, FormControl, Select, Menu } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TableProductInput() {
  const [productArr, setProductArr] = useState([]);
  const [product, setProduct] = useState();
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/products")
      .then((res) => {
        console.log("res.data.content", res.data.content);
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
        variant="standard"
      >
        <InputLabel id="product" sx={{ textIndent: "10px", fontSize: "14px" }}>
          상품
        </InputLabel>
        <Select
          labelId="product"
          id="product"
          value={product}
          label="상품"
          onChange={handleProduct}
          sx={{ textIndent: "10px" }}
        >
          {productArr &&
            productArr.map((e, index) => (
              <MenuItem key={index} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
