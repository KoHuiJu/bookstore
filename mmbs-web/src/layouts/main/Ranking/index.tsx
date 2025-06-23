import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { FormControl, MenuItem, Select } from "@mui/material";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Ranking() {
  const [value, setValue] = React.useState(0);

  const [bestList, setBestList] = useState<any[]>([]);

  useEffect(()=>{
    axios.get(`http://localhost:4080/api/best`)
    .then((response)=>{
      const data = response.data;
      if(data){
        setBestList(data.data);
      }
    })
  }, [])

  return (
    <Card variant="outlined">
      <Box sx={{ width: "100%" }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs>
            <Typography
              fontSize={25}
              textAlign={"center"}
              fontFamily={"logoFont"}
              sx={{ pt:1 }}
            >
              베스트 셀러
            </Typography>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} bestList={bestList}>
          베스트셀러
        </TabPanel>
      </Box>
    </Card>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  bestList: any[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, bestList, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {bestList.map((item, index) => (
            <Box display='flex' p={1} borderBottom={1}>
            <Typography flex={1}>{lankList[index]}</Typography>
            <Link to={`/DtlPage/${item.productSeq}`}>
              <Typography flex={6}>{item.productTitle}</Typography>
            </Link>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const lankList = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
