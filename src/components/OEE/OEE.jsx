import { Button, Card, Container, Grid, Select, Text } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useState, useEffect } from "react"
import Chart from "../Chart/Chart";
const OEE = () => {
  
  const [productionLineMenu, setProductionLineMenu] = useState("")
  const [devices, setDevices] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [topCards, setTopCards] = useState([]);

  useEffect(() =>{
    fetchData()
  }, [productionLineMenu, startDate, endDate])
  
  useEffect(() => {
    fetchDevicesAndTime();
  }, []);

  const fetchDevicesAndTime = async () =>{
    try{
      const lineResponse = await fetch("http://127.0.0.1:8000/api/productionlines/")

      const params = []

      if(productionLineMenu){
        params.push(`Line = ${productionLineMenu}`)
      }

      if (startDate && endDate) {
        params.push(`StartDate=${startDate.toISOString()}`);
        params.push(`EndDate=${endDate.toISOString()}`);
      }
      if (!lineResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const lineData = await lineResponse.json();
      setDevices(lineData)
    }
    catch(error){
      console.error("Error fetching Devices: ", error);
    }
  }

  const fetchData = async () =>{
    try{
      
      
      const response = await fetch(
        `http://127.0.0.1:8000/api/logs?LineId=${productionLineMenu}&StartDate=${startDate}&EndDate=${endDate}`
      );

      const MPresponse = await fetch(
        `http://127.0.0.1:8000/api/machine-performance/`
      );

      const params = []

      if(productionLineMenu){
        params.push(`Line = ${productionLineMenu}`)
      }

      if (startDate && endDate) {
        params.push(`StartDate=${startDate.toISOString()}`);
        params.push(`EndDate=${endDate.toISOString()}`);
      }

      if(!response.ok || !MPresponse.ok){
        throw new Error("Network response wasn't okie");
      }

      const MPdata = await MPresponse.json();
      const filter = MPdata.filter(
        (data) => data.line_id === +productionLineMenu
      );
      setTopCards(filter[0]);

    }
    catch(error){
      console.error("Error fetching Devices: ", error);
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
              data={devices.map((device) => ({
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
              value={startDate}
              onChange={setStartDate}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePickerInput 
              label="End Date"
              placeholder="Pick end date and time"
              mx="auto"
              value={endDate}
              onChange={setEndDate}
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
            style={{ fontSize: "2rem", textAlign: "center" }}
            >Overall Equipment Efficiency</Text>
            <div
              style={{
                fontWeight: 700,
                display: "flex"
              }}
              >
                <div 
                style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: statusStyles.color,
                paddingLeft: "15px"
              }}>
                  {lineStatus}
                </div>
                <div 
                style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "orange",
                paddingLeft: "15px"
              }}>
                  DT(mins){topCards.downtime}
                </div>
            </div>
            <div
            style={{display: "flex"}}
            >
              <div>
                <label>Chart to show what was downtime and what was active time (PieChart)</label>
                <Chart />
              </div>
              <div>
                <label>Chart to show Availability, efficiency, and quality (Bargraph)</label>
                <Chart />
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
                  src="./available.png"
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
                  src="./efficiency.png"
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
                  src="./quality.png"
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

export default OEE