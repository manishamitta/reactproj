import axios from "axios";
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";





const baseURL = "servicedest/";
// const app = express();


const instance = axios.create({
  baseURL
});

export const getTableData = async (params = { $top: 100, $skip: 0 }) => {
  const { data } = await instance.get("/complains", {
    params
  });

  return data.d?.results || data.d || data.value;
};

export const getTableCount = async () => {
  const { data } = await instance.get("/complains/$count");
  return data;
};


// export const getItemById = async (s_id) => {
//     try {
//         const url = `https://2ed753fbtrial-dev-cross1-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/class/${s_id}`;
//         const response = await axios.get(url);
//         console.log("API Response:", response.data); // Log the response data
//         return response.data; // Return the data directly
//     } catch (error) {
//         console.error(`Error fetching item with ID ${s_id}:`, error);
//         throw error; // Re-throw to handle it in the component
//     }
// };
export const createItem = async (itemData) => {
  try { 
    const { data } = await instance.post("/complains", itemData);
    return data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error; // Re-throw to handle it in the component
  }
};


export const verifyCaptcha = async (token) => {

   // Replace with your actual secret key
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=6Ldjq04qAAAAAGBSH2Rqul3uKNm_MpAm2XEW6yzk&response=${token}`;

  try {
    const { data } = await axios.post(url);
    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    throw error;
  }
};
// export const verifyCaptcha = async (token) => {
//   const url = `https://www.google.com/recaptcha/api/siteverify?secret=6Ldjq04qAAAAAGBSH2Rqul3uKNm_MpAm2XEW6yzk&response=${token}`;

//   try {
//     // Using fetch with no-cors mode and including credentials
//     const response = await fetch(url, {
//       method: 'POST',
//       mode: 'no-cors', // Set to no-cors
//       credentials: 'include', // Include cookies
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({ response: token }).toString(), // Ensure to pass the token correctly
//     });

//     // Since it's no-cors, you won't be able to access the response data.
//     // The request will be considered successful if response.ok is true.
//     return response.ok; // This will return true if the request was successful
//   } catch (error) {
//     console.error("Error verifying reCAPTCHA:", error);
//     throw error; // Re-throw to handle it in the component
//   }
// };
