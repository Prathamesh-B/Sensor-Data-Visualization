import { Button, Card, Container, Grid, Slider, Text } from '@mantine/core'
import { Gauge } from "lucide-react"
import { useState } from 'react'
import { phase, current, temp, freq } from '../../data';

const Cp = () => {

  const [vry, setVry] = useState(330)
  const [Vyb, setVyb] = useState(330)
  const [Vbr, setVbr] = useState(330)
  const [Temp, setTemp] = useState(39)
  const [Cr, setCr] = useState(2)
  const [Cy, setCy] = useState(2)
  const [Cb, setCb] = useState(2)
  const [frequency, setFreq] = useState(49)


  const handleClick = ()=>{
    console.log(vry)
    console.log(Vyb)
    console.log(Vbr)
    console.log(Temp)
    console.log(Cr)
    console.log(Cy)
    console.log(Cb)
  }

  return (
    <>
    <div>
      <h1 style={{display: "flex", justifyContent: "center"}}>
        Control Panel
      </h1>
    </div>
    <Container>
        <Grid gutter="lg" mb="lg">
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={vry}
                      onChange={setVry}
                      min={phase[0].min} max={phase[0].max} step={1}
                      marks={phase.slice(1).map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Vry Phase Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={Vyb}
                      onChange={setVyb}
                      min={phase[0].min} max={phase[0].max} step={1}
                      marks={phase.slice(1).map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Vyb Phase Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={Vbr}
                      onChange={setVbr}
                      min={phase[0].min} max={phase[0].max} step={1}
                      marks={phase.slice(1).map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Vbr Phase Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={frequency}
                      onChange={setFreq}
                      min={freq[0].min} max={freq[0].max} step={1}
                      marks={freq.map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Frequency Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={Temp}
                      onChange={setTemp}
                      min={temp[0].value} max={temp[temp.length - 1].value} step={1}
                      marks={temp.map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Temperature Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={Cr}
                      onChange={setCr}
                      min={current[0].value} max={current[current.length - 1].value} step={1}
                      marks={current.map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Current R Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={Cy}
                      onChange={setCy}
                      min={current[0].value} max={current[current.length - 1].value} step={1}
                      marks={current.map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Current Y Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card
            shadow="sm"
            p="lg"
            radius="lg"
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                <Gauge
                  style={{ marginRight: "1rem" }}
                  size={64}
                  strokeWidth={1}
                />
                </div>
                    <div>
                    <Slider
                      color="blue"
                      value={Cb}
                      onChange={setCb}
                      min={current[0].value} max={current[current.length - 1].value} step={1}
                      marks={current.map(item => ({ value: item.value, label: item.label }))}
                    />
                    <br></br>
                        <Text weight={500} size="lg" fw={400} style={{ display: "flex", textAlign: "center" }}>
                            Current B Slider
                        </Text>
                    </div>
            </Card>
          </Grid.Col>
          <Grid.Col offset={3} span={3}>
            <Button onClick={handleClick} variant="filled" color="green" size="xl">Submit</Button>
          </Grid.Col>
          <Grid.Col span={3}>
            <Button variant="outline" color="blue" size="xl">Randomize</Button>
          </Grid.Col>
        </Grid>
        </Container>
    </>
  )
}

export default Cp
