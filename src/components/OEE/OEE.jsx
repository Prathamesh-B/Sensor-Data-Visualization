import { Button, Card, Container, Grid, Select, Text } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useState, useEffect } from "react"
import { BarGraph, PieGraph } from "../Chart/Chart";
import { fetchDevicesAndTags } from "../../services/BackendAPIs";

const Oee = () => {
  
  const [productionLineMenu, setProductionLineMenu] = useState("1")
  const [devices, setDevices] = useState([])
  const [topCards, setTopCards] = useState([]);
  const [line, setLine] = useState([]);
  const [customDateRange, setCustomDateRange] = useState({
    start: new Date(),
    end: new Date(),
});

useEffect(() => {
  const fetchData = async () => {
      fetchDevicesAndTags(setLine);
  };

  fetchData();
}, []);


  // useEffect(() =>{
  //     fetchData();
  //   },  [])
  
  // useEffect(() => {
  //   fetchDevicesAndTime();
  // }, [productionLineMenu]);

  // const fetchDevicesAndTime = async () =>{
  //   try{
  //     const lineResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/productionlines/`)

  //     const params = []

  //     if(productionLineMenu){
  //       params.push(`Line = ${productionLineMenu}`)
  //     }
  //     if (!lineResponse.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const lineData = await lineResponse.json();
  //     setDevices(lineData)
  //   }
  //   catch(error){
  //     console.error("Error fetching Devices: ", error);
  //   }
  // }

  const fetchData = async () =>{
    try {
      let startDate = new Date().toISOString();
      let endDate = new Date().toISOString();
      if (!customDateRange || !customDateRange.start || !customDateRange.end) {
        throw new Error("Invalid date range provided");
      }
      if (customDateRange.start && customDateRange.end) {
        startDate =
            customDateRange.start
                .toISOString()
                .split("T")[0] + "T00:00:00Z";
        endDate =
            customDateRange.end
                .toISOString()
                .split("T")[0] + "T23:59:59Z";
      }
      console.log(startDate, endDate);
  
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/machine-performance/?StartDate=${startDate}&EndDate=${endDate}`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      const topCardsData = data.find(item => item.line_id === parseInt(productionLineMenu));
      if (topCardsData) {
        setTopCards({
          downtime: Math.round(topCardsData.downtime / 60),
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const getStatusStyles = (status) => {
    switch (status) {
        case "Running":
            return {
                background: "#9befae",
                borderColor: "#29c64d",
                color: "#218337",
            };
        case "Running Slow":
            return {
                background: "#fbffa7",
                borderColor: "#d5b023",
                color: "#a08108",
            };
        case "Scheduled Down":
            return {
                background: "#c3ebff",
                borderColor: "#005682",
                color: "#005682",
            };
        case "Just Went Down":
            return {
                background: "#ffecdd",
                borderColor: "#fd7e14",
                color: "#fa7200",
            };
        case "Down":
            return {
                background: "#ffd1d6",
                borderColor: "#f10017",
                color: "#ff0018",
            };
        case "No Data":
            return {
                background: "#ececec",
                borderColor: "#6c757d",
                color: "#6c757d",
            };
        case "Not Scheduled":
            return {
                background: "#adb5bd",
                borderColor: "#adb5bd",
                color: "#adb5bd",
            };
        case "Tool Change":
            return {
                background: "#007bff",
                borderColor: "#007bff",
                color: "white",
            };
        case "Andon is Active":
            return {
                background: "#e83e8c",
                borderColor: "#e83e8c",
                color: "white",
            };
        default:
            return {
                background: "transparent",
                borderColor: "#ced4da",
                color: "black",
            };
    }
};

  const lineStatus = devices.find((line) => line.id.toString() === productionLineMenu) ?.status || "No data"

  const statusStyles = getStatusStyles(lineStatus);

  const handleFetchClick = () =>{
    fetchData()
  }


  return (
    <>
      <Container>
        <Grid>
          <Grid.Col span={4}>
            <Select 
              label="Production Line"
              placeholder="Pick a value"
              mx="auto"
              data={line.map((device) => ({
                value: device.id.toString(),
                label: device.name,
            }))}
              value={productionLineMenu}
              onChange={setProductionLineMenu}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePickerInput 
              label="Start Date"
              placeholder="Pick start date and time"
              mx="auto"
              value={customDateRange.start}
              onChange={(date) =>
                  setCustomDateRange({
                    ...customDateRange,
                    start: date,
                  })
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePickerInput 
              label="End Date"
              placeholder="Pick end date and time"
              mx="auto"
              value={customDateRange.end}
              onChange={(date) =>
                setCustomDateRange({
                  ...customDateRange,
                  end: date,
                })
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Button onClick={handleFetchClick}>Apply</Button>
          </Grid.Col>
        </Grid>
      </Container>
      <Grid grow>
        <Grid.Col span={9}>
          <Card
          shadow="sm"
          p="sm"
          radius="md"
          >
            <Text
            style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}
            >Overall Equipment Efficiency</Text>
            <div
              style={{
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center"
              }}
              >
                Current Status:
                <div 
                  style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: statusStyles.color,
                  paddingLeft: "1rem",
                  paddingRight: "6rem"
                }}>
                  {lineStatus}
                </div>
                DownTime (mins): 
                <div 
                  style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "orange",
                  paddingLeft: "1rem"
                }}>
                  {topCards.downtime}
                </div>
            </div>
            <div
            style={{
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center"
            }}
            >
            </div>
            <div
            style={{display: "flex"}}
            >
              <div>
                <PieGraph />
              </div>
              <div>
                <BarGraph />
              </div>
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col span={{base: 12, md:3}}>
          <Card
          shadow="sm"
          p="lg"
          radius="md"
          className="latest-card"
          mt={"lg"}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "1rem" }}>
                <img
                  style={{ width: "3.5rem" }}
                  src="./images/available.png"
                  alt="Availability Icon"
                />
                <Text size="md" fw={400}>
                  Availability
                </Text>
              </div>
              <Text
                style={{ fontSize: "3.7rem" }}
                c="indigo"
                fw={700}
              >
                65%
              </Text>
            </div>
          </Card>
          <Card
          shadow="sm"
          p="lg"
          radius="md"
          className="latest-card"
          mt={"md"}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "1rem" }}>
                <img
                  style={{ width: "3.5rem" }}
                  src="./images/efficiency.png"
                  alt="Efficiency Icon"
                />
                <Text size="md" fw={400}>
                  Efficiency
                </Text>
              </div>
              <Text
                style={{ fontSize: "3.7rem" }}
                c="teal"
                fw={700}
              >
                80%
              </Text>
            </div>
          </Card>
          <Card
          shadow="sm"
          p="lg"
          radius="md"
          className="latest-card"
          mt={"md"}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "1rem" }}>
                <img
                  style={{ width: "3.5rem" }}
                  src="./images/quality.png"
                  alt="Quality Icon"
                />
                <Text size="md" fw={400}>
                  Quality
                </Text>
              </div>
              <Text
                style={{ fontSize: "3.7rem" }}
                c="green"
                fw={700}
              >
                70%
              </Text>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Oee;